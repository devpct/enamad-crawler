import Business from '../../models/businessModel';

export const graphQlResolvers = {
  businesses: async () => {
    const businesses = await Business.find({});
    return businesses;
  },
};
