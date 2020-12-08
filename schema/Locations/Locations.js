//Location Related GraphQLObjectType schemas
const graphql=require('graphql');
const reviewtypes=require('../Reviews/Reviews.js')
const pools=require('../../constants/pools.js')
const queries = require('../../queries/queries.js');

const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList}=graphql;


//Location datatype that includes all details
const LocationType=new GraphQLObjectType({
  name:'Location',
  fields:()=>({
    locationid:{type:GraphQLInt},
    address:{type:GraphQLString},
    phone:{type:GraphQLString},
    details:{type:GraphQLString},

    reviews:{//queries main database with commonuser to get all review information, gets passed a locationid in graphqlID format
      type:  new GraphQLList(reviewtypes.ReviewType),
      resolve(parent,args) {
        return  new queries.Reviews(pools.mainpoolcommonquery).getReviewsByLocation(parent.locationid)
      }
  }

})
});


//Location datatype that includes all details but reviews
const LocationsType=new GraphQLObjectType({
  name:'Locations',
  fields:()=>({
    locationid:{type:GraphQLInt},
    address:{type:GraphQLString},
    phone:{type:GraphQLString},
    details:{type:GraphQLString},

})
});


exports.LocationType=LocationType;
exports.LocationsType=LocationsType;
