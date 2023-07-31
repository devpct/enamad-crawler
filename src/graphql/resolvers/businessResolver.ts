import Business from '../../models/businessModel'

export const graphQlResolvers = {
  businesses: () => {
    return Business.find({}).exec()
  },
}
