import React from 'react';
import { Box, Card, Flex } from '@procore/core-react'
import { Link } from 'react-router-dom';
import './App.css';

const PokeCard = ({ stats, renderIcon, name, id, sprite, full = false }) => (
	<Box margin="md">
		<Card variant="hoverable" style={{width: '200px'}}>
			<Box padding="md">
  			<Flex direction="column">
          <Flex style={{ width: '100%', justifyContent: 'space-between' }}>
  			    <Link to={`/${name}`} style={{ textDecoration: 'none' }}>
  			      #{id} <span className="capitalize">{name}</span>
  			    </Link>
  			    <div className={full ? 'blocked' : 'hover'}>
  			      {renderIcon(id)}
  			    </div>
  			  </Flex>
  			  <img alt={name} src={sprite} />
  			  <Flex style={{ width: '100%', flexWrap: 'wrap' }}>
  			    {stats.map(s => {
  			      return (
  			        <Flex
  			          key={s.stat.name}
  			          style={{
  			            borderBottom:'1px solid black',
  			            width: '100%',
  			            justifyContent: 'space-between',
  			            padding: '6px 0',
  			          }}
  			        >
  			          <Box>
  			            {s.stat.name}
  			          </Box>
  			          <Box>
  			            {s.base_stat}
  			          </Box>
  			        </Flex>
  			      )
  			    })}
  			  </Flex>
  			</Flex>
			</Box>
		</Card>
	</Box>
);

export default PokeCard;
