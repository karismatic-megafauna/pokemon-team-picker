import React, { Component } from 'react';
import { Page, Box, Card, Flex, Header } from '@procore/core-react'
import metadata from 'pokemon-metadata';
import { Link, Route, Switch } from 'react-router-dom';
import Add from 'react-icons/lib/md/add-circle-outline';
import Remove from 'react-icons/lib/md/remove-circle';
import Filters from '@particles/filters';

const Show = ({ match }) => (
  <div>
    <h2>Pokemon: {match.params.pokemon}</h2>
  </div>
);

const Team = () => (
  <div>
    <h2>Your Team</h2>
  </div>
);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      team: [],
    }
  }
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <Switch>
          <Route path="/team" component={Team} />
          <Route path="/:pokemon" component={Show} />
          <Route exact path="/" render={() => (
            <Page>
              <Page.Sidebar>
                <Box padding="lg sm">
                  <Header type="h2">
                    Sidebar
                    <Box>
                      <Filters />
                    </Box>
      			      </Header>
        		    </Box>
              </Page.Sidebar>
              <Page.Main>
                <Page.ToolHeader>
                  <Flex style={{ justifyContent: 'space-between' }}>
                    <Box padding="md">
          			      Choose your Pokemon
        			      </Box>
                    <Box padding="md">
          			      <div>{this.state.team.length}/6</div>
        			      </Box>
                    <Box padding="md">
          			      <Link to="/team">Your Team</Link>
        			      </Box>
                  </Flex>
      			    </Page.ToolHeader>
      			    <Page.Body>
        			    <Flex padding="md" style={{ 'flexWrap': 'wrap'}}>
			              { Object.keys(metadata).map(el => {
			                const pokemon = metadata[el];
			                const isAlreadyOnTeam = this.state.team.includes(pokemon.id);
			                const canAdd = !isAlreadyOnTeam && this.state.team.length < 6;
			                return (
			                  <Box key={pokemon.name} padding="md">
			                    <Card variant="hoverable" style={{width: '200px'}}>
			                      <Box padding="md">
  			                      <Flex direction="column">
                                <Flex style={{ width: '100%', justifyContent: 'space-between' }}>
  			                          <Link to={`/${pokemon.name}`}>
  			                            {pokemon.name}: {pokemon.id}
  			                          </Link>
  			                          { isAlreadyOnTeam ? (
  			                            <Remove onClick={() => {
  			                              const withoutPokemon = this.state.team.filter(poke => {
  			                                return poke !== pokemon.id;
  			                              })
  			                              this.setState({ team: withoutPokemon });
  			                            }} />
  			                          ) : (
  			                            <Add onClick={() => {
  			                              if(canAdd) {
  			                                this.setState({
  			                                  team: [...this.state.team, pokemon.id],
  			                                });
  			                              }
  			                            }} />
  			                          )}
  			                        </Flex>
  			                        <img alt={pokemon.name} src={pokemon.sprites.front_default} />
  			                      </Flex>
			                      </Box>
			                    </Card>
			                  </Box>
			                )
			              })}
            	    </Flex>
      			    </Page.Body>
        	    </Page.Main>
            </Page>
          )} />
        </Switch>
      </div>
    );
  }
}

export default App;
