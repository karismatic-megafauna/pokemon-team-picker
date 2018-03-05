import React from 'react';
import { Page, Box, Flex, Header } from '@procore/core-react'
import PokeCard from './PokeCard';
import { STATS } from './constants';

const Team = ({ pokemon, removeIcon }) => {
  const statTotals = pokemon.reduce((a, b) => {
    const nestedStats = b.stats.reduce((x, y) => {
      return {
        ...x,
        [y.stat.name]: y.base_stat,
      };
    }, {});

    const mergedObj = {
      speed: a.speed + nestedStats.speed,
      'special-attack': a['special-attack'] + nestedStats['special-attack'],
      'special-defense': a['special-defense'] + nestedStats['special-defense'],
      defense: a.defense + nestedStats.defense,
      attack: a.attack + nestedStats.attack,
      hp: a.hp + nestedStats.hp,
    };

    return mergedObj;
  }, STATS);

  return (
    <Page>
      <Page.Main style={{ height: '100vh', 'overflowY': 'scroll' }}>
        <Page.ToolHeader>
          <Header type="h1">
            Your Team
          </Header>
        </Page.ToolHeader>
        <Page.Body style={{ justifyContent: 'flex-start' }}>
          <Flex style={{ flexWrap: 'wrap' }}>
            {pokemon.map(poke => (
              <PokeCard
                stats={poke.stats}
                key={poke.name}
                name={poke.name}
                id={poke.id}
                sprite={poke.sprites.front_default}
			          renderIcon={removeIcon}
              />
            ))}
          </Flex>
          <Flex direction="column" alignItems="flex-start">
            <Header type="h1">
              Stat Totals
            </Header>
            <Flex alignItems="flex-start">
              { Object.keys(statTotals).map(st => (
                <Box padding="lg" key={st}>
                  <Flex direction="column" alignItems="flex-start">
                    <Box margin="sm none" style={{borderBottom: "1px solid black"}}>
                      <Header type="h2">{st}</Header>
                    </Box>
                    <Box>
                      {statTotals[st]}
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Flex>
        </Page.Body>
      </Page.Main>
    </Page>
  )
};

export default Team;
