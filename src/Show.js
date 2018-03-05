import React, { Component } from 'react';
import { parseChain } from './utils';
import { Page, Box, Flex, Header, Spinner } from '@procore/core-react'
import './App.css';

class Show extends Component {
  constructor(props){
    super(props);
    this.state = {
      evoChain: null,
    }
  }

  componentDidMount() {
    const { pokemon } = this.props;

    this.getGeneration(pokemon.id).then(data => {
      this.getEvolution(data.evolution_chain.url).then(evoData => {
        this.setState({ evoChain: parseChain(evoData.chain) });
      })
    })
  }

  async getGeneration(id) {
    const pokemonGeneration = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    return pokemonGeneration.json();
  }

  async getEvolution(url) {
    const evoChain = await fetch(url);
    return evoChain.json();
  }

  render () {
    const { pokemon } = this.props;
    const { evoChain } = this.state;

    return (
      <Page>
        <Page.Main style={{ height: '100vh', 'overflowY': 'scroll' }}>
          <Page.ToolHeader>
            <Flex style={{ alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Header type="h1" className="capitalize">{pokemon.name}</Header>
              <Flex>
                { pokemon.types.map(({type}) => (
                  <Box key={type.name} padding="md" className="capitalize">{type.name}</Box>
                ))}
              </Flex>
            </Flex>
          </Page.ToolHeader>
          <Page.Body style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <Flex>
              <img alt={pokemon.name} src={pokemon.sprites.front_default} />
            </Flex>
            <Flex direction="column" alignItems="center">
              <Header type="h2">Evoultions</Header>
              <Flex>
                { evoChain ? (
                  <RenderEvolution evoChain={evoChain} current={pokemon.name} />
                ) : (
                  <Spinner />
                )}
              </Flex>
            </Flex>
          </Page.Body>
        </Page.Main>
      </Page>
    )
  };
}

const RenderEvolution = ({ evoChain, current }) => (
  evoChain
    .filter(poke => poke !== current)
    .map(poke => (
      <Box key={poke} padding="md" className="capitalize">{poke}</Box>)
    )
)

export default Show;
