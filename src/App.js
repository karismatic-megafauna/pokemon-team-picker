import React, { Component } from 'react';
import { Page, Box, Flex, Header, Button } from '@procore/core-react'
import metadata from 'pokemon-metadata';
import { Link, Route, Switch } from 'react-router-dom';
import Add from 'react-icons/lib/md/add-circle-outline';
import Remove from 'react-icons/lib/md/remove-circle';
import Select from 'react-select';
import Show from './Show';
import Team from './Team';
import PokeCard from './PokeCard';
import { SORT_OPTIONS, FILTER_OPTIONS } from './constants';

import 'react-select/dist/react-select.css';





class App extends Component {
  constructor(props){
    super(props);
    const data = Object.keys(metadata).map(data => metadata[data]);
    this.state = {
      originalData: data,
      data,
      team: [],
      sortValues: [],
      filterValues: [],
    }
  }

  handleSortChange = (sortValues) => {
    this.setState({ sortValues });
  }

	dynamicSort = (property) => {
    return (obj1, obj2) => {
			const first = obj1.stats.find(s => s.stat.name === property)
			const second = obj2.stats.find(s => s.stat.name === property)

			return second.base_stat - first.base_stat;
    }
	}

	dynamicSortMultiple = ([...props]) => {
  	return (obj1, obj2) => {
    	var i = 0;
			var result = 0;
			var numberOfProperties = props.length;

    	while(result === 0 && i < numberOfProperties) {
      	result = this.dynamicSort(props[i])(obj1, obj2);
      	i++;
    	}
    	return result;
  	}
	}

  handleSortBlur = () => {
    const { data, sortValues } = this.state;

    const sortByValues = sortValues.map(val => val.value);

    const sortedData = data.sort(this.dynamicSortMultiple([...sortByValues]));

    this.setState({ data: sortedData });
  }

  handleFilterBlur = () => {
    const { originalData, filterValues } = this.state;
    if (!filterValues.length) {
      this.setState({ data: originalData });
    } else {
      const filteredData = originalData.filter(pokemon => {
        let isType = false;
        pokemon.types.forEach(t => {
          filterValues.forEach(typeFilter => {
            if (t.type.name === typeFilter.value) {
              isType = true;
              return;
            }
          });
        });
        return isType;
      });
      this.setState({ data: filteredData });
    }
  }

  handleFilterChange = (filterValues) => {
    this.setState({ filterValues });
  }

  handleRemoveFromTeam = (id) => {
  	const withoutPokemon = this.state.team.filter(poke => {
  		return poke !== id;
  	})
  	this.setState({ team: withoutPokemon });
  };

  render() {
    const { data, filterValues, sortValues, team, originalData } = this.state;
		const teamFull = team.length === 6;
    return (
      <div style={{ height: '100vh' }}>
        <Switch>
          <Route path="/team" component={() => {
            const myPokemon = originalData.filter(origPoke => team.includes(origPoke.id))
			      const handleRemoveIcon = (pokeId) => (
			        <Remove onClick={() => { this.handleRemoveFromTeam(pokeId); }} />
			      );

            return (
						  <Team pokemon={myPokemon} removeIcon={handleRemoveIcon} />
						)
					}} />
        <Route path="/:pokemon" render={({ match }) => {
          const currentPokemon = originalData.find(el => el.name === match.params.pokemon);
          return <Show pokemon={currentPokemon} />
        }} />
          <Route exact path="/" render={() => (
            <Page>
              <Page.Main style={{ height: '100vh', 'overflowY': 'scroll' }}>
                <Page.ToolHeader>
          			  <Header type="h1">
          			    <Flex style={{ justifyContent: 'space-between' }}>
          			      <div> Choose your Pokemon </div>
          			      <div style={{ color: teamFull ? 'green' : 'black' }}>
          			        {team.length}/6
          			      </div>
          			    </Flex>
          			  </Header>
      			    </Page.ToolHeader>
      			    <Page.Filters >
                  <Flex>
                    <Box paddingRight="sm">
                      <Flex direction="column" alignItems="flex-start">
                        <Box paddingBottom="sm">
                          <Header type="h3">
                            Sort By Stat
      			              </Header>
      			            </Box>
                        <Select
                          style={{ width: '300px'}}
                          multi
                          closeOnSelect={false}
                          onChange={this.handleSortChange}
                          onBlur={this.handleSortBlur}
                          value={sortValues}
                          options={SORT_OPTIONS}
                        />
                      </Flex>
      			        </Box>
                    <Box paddingRight="sm">
                      <Flex direction="column" alignItems="flex-start">
                        <Box paddingBottom="sm">
                          <Header type="h3">
                            Filter By Type
      			              </Header>
                        </Box>
                        <Select
                          style={{ width: '300px'}}
                          multi
                          closeOnSelect={false}
                          onBlur={this.handleFilterBlur}
                          onChange={this.handleFilterChange}
                          value={filterValues}
                          options={FILTER_OPTIONS}
                        />
                      </Flex>
                    </Box>
                  </Flex>
      			    </Page.Filters>
      			    <Page.Body>
        			    <div style={{ width: '100%', 'overflowY': 'scroll' }}>
        			      <Flex style={{ 'flexWrap': 'wrap' }}>
			                { data.filter(pokemon => !team.includes(pokemon.id))
			                  .map(pokemon => {
			                    const isAlreadyOnTeam = team.includes(pokemon.id);
			                    const canAdd = !isAlreadyOnTeam && team.length < 6;
			                    const handleAdd = () => {
  			                    if(canAdd) {
  			                      this.setState({
  			                        team: [...team, pokemon.id],
  			                      });
  			                    }
  			                  };

  			                  const getIcon = (id) => (
  			                    <Add
  			                      style={{ fillOpacity: teamFull ? '.2' : '1' }}
  			                      onClick={() => {
  			                        handleAdd(id);
  			                      }}
                            />
  			                  )

			                    return (
			                      <PokeCard
			                        full={teamFull}
			                        stats={pokemon.stats}
			                        key={pokemon.name}
			                        renderIcon={(pokeId) => {
			                          return getIcon(pokeId);
			                        }}
			                        name={pokemon.name}
			                        id={pokemon.id}
			                        sprite={pokemon.sprites.front_default}
			                      />
			                    )
			                  })}
            	        </Flex>
            	      </div>
      			      </Page.Body>
        	      </Page.Main>
                <Page.Sidebar style={{ position: 'relative', height: '100vh' }}>
            	    <div style={{ height: '100%', 'overflowY': 'scroll'}}>
            	      <Flex style={{ justifyContent: 'space-between' }}>
          			      <Box padding="md md sm md" style={{ width: '100%'}}>
          			        <Link to="/team" >
          			          <Button style={{ width: '100%'}}>
          			            View Team
          			          </Button>
          			        </Link>
          			      </Box>
            	      </Flex>
            	      <Flex direction="column">
            	        { team.map(pokeId => {
            	          const currentPoke = originalData.find(poke => poke.id === pokeId);
            	          return (
            	            <PokeCard
            	              stats={currentPoke.stats}
            	              key={currentPoke.name}
            	              name={currentPoke.name}
            	              id={currentPoke.id}
            	              sprite={currentPoke.sprites.front_shiny}
			                      renderIcon={(pokeId) => (
  			                      <Remove onClick={() => {
  			                        this.handleRemoveFromTeam(pokeId);
  			                      }} />
  			                    )}
            	            />
            	          )
            	        })}
            	      </Flex>
            	    </div>
              </Page.Sidebar>
            </Page>
          )} />
        </Switch>
      </div>
    );
  }
}

export default App;
