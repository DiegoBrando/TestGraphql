//Main Schema of the grapqhl
const graphql=require('graphql');
const queries = require('../queries/queries.js');
const mutations=require('../queries/mutations.js');
const locationstypes=require('./Locations/Locations.js');
const reviewtypes=require('./Reviews/Reviews.js');
const pools=require('../constants/pools.js');



const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList}=graphql;


//All queries
const RootQuery= new GraphQLObjectType({
  name:'RootQueryType',
  fields:{


    //Requires no inputs
    //Returns all location information minus reviews
    locations:{
      type:new GraphQLList(locationstypes.LocationsType),
      resolve(parent,args){
        return new queries.Locations(pools.mainpoolcommonquery).GetAllLocations()
    }
  },


    //Requires an id in graphqlID format that maps to locationid
    //Returns all information for a location
    location:{
      type: new GraphQLList(locationstypes.LocationType),
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        return new queries.Locations(pools.mainpoolcommonquery).GetLocationByID(args.id)
    }
    }


}
});


//All mutations
const Mutation= new GraphQLObjectType({
  name:'Mutation',
  fields:{


    //Requires a locationid in graphqlID format, comment in GraphQLString format, stars in GraphQLID format, and userid in graphqlID format. Returns all information of the submitted review
    //Returns all information for the submitted review
    SubmitReview:{
      type: new GraphQLList(reviewtypes.ReviewType),
      args:{
        locationid:{type:GraphQLID},
        comment:{type:GraphQLString},
        stars:{type:GraphQLInt},
        userid:{type:GraphQLID}
      },
      resolve(parent,args){
        return new mutations.Reviews(pools.mainpoolcommonmutate).SubmitReview(args.locationid,args.userid,args.stars,args.comment)
    }
    }
  }
})

module.exports=new GraphQLSchema({
  query:RootQuery,
  mutation:Mutation
});
