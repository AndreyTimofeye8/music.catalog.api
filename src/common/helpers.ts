import { sortBy } from './enums';

export const createOrderByDirection = (orderBy: string) => {
  const order = orderBy.split('_');
  return {
    [order[0]]: order[1] as sortBy.asc | sortBy.desc,
  };
};
