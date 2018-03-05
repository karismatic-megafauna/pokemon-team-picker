export const STATS = {
  speed: 0,
  'special-defense': 0,
  'special-attack': 0,
  defense: 0,
  attack: 0,
  hp: 0,
};

export const SORT_OPTIONS = [
  { value: 'speed', label: 'Speed'},
  { value: 'attack', label: 'Attack'},
  { value: 'special-attack', label: 'Special Attack'},
  { value: 'defense', label: 'Defense'},
  { value: 'special-defense', label: 'Special Defense'},
  { value: 'hp', label: 'Hp'},
];

export const FILTER_OPTIONS = [
  { value: 'bug', label: 'Bug'},
  { value: 'dragon', label: 'Dragon'},
  { value: 'ice', label: 'Ice'},
  { value: 'fighting', label: 'Fighting'},
  { value: 'fire', label: 'Fire'},
  { value: 'flying', label: 'Flying'},
  { value: 'grass', label: 'Grass'},
  { value: 'ghost', label: 'Ghost'},
  { value: 'ground', label: 'Ground'},
  { value: 'electric', label: 'Electric'},
  { value: 'normal', label: 'Normal'},
  { value: 'poison', label: 'Poison'},
  { value: 'psychic', label: 'Psychic'},
  { value: 'rock', label: 'Rock'},
  { value: 'water', label: 'Water'},
];

export const mockResponse = {
  "chain": {
    "evolution_details": [],
    "evolves_to": [
      {
        "evolution_details": [
          {
            "min_level": 16,
            "min_beauty": null,
            "time_of_day": "",
            "gender": null,
            "relative_physical_stats": null,
            "needs_overworld_rain": false,
            "turn_upside_down": false,
            "item": null,
            "trigger": {
              "url": "https://pokeapi.co/api/v2/evolution-trigger/1/",
              "name": "level-up"
            },
            "known_move_type": null,
            "min_affection": null,
            "party_type": null,
            "trade_species": null,
            "party_species": null,
            "min_happiness": null,
            "held_item": null,
            "known_move": null,
            "location": null
          }
        ],
        "evolves_to": [
          {
            "evolution_details": [
              {
                "min_level": 32,
                "min_beauty": null,
                "time_of_day": "",
                "gender": null,
                "relative_physical_stats": null,
                "needs_overworld_rain": false,
                "turn_upside_down": false,
                "item": null,
                "trigger": {
                  "url": "https://pokeapi.co/api/v2/evolution-trigger/1/",
                  "name": "level-up"
                },
                "known_move_type": null,
                "min_affection": null,
                "party_type": null,
                "trade_species": null,
                "party_species": null,
                "min_happiness": null,
                "held_item": null,
                "known_move": null,
                "location": null
              }
            ],
            "evolves_to": [],
            "is_baby": false,
            "species": {
              "url": "https://pokeapi.co/api/v2/pokemon-species/3/",
              "name": "venusaur"
            }
          }
        ],
        "is_baby": false,
        "species": {
          "url": "https://pokeapi.co/api/v2/pokemon-species/2/",
          "name": "ivysaur"
        }
      }
    ],
    "is_baby": false,
    "species": {
      "url": "https://pokeapi.co/api/v2/pokemon-species/1/",
      "name": "bulbasaur"
    }
  }
}
