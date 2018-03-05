export const parseChain = (chain) => {
  let name = [chain.species.name];

  if (chain.evolves_to.length !== 0) {
    return name.concat(parseChain(chain.evolves_to[0]));
  }

  return name;
}

