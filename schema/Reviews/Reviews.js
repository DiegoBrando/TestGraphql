//Review Related GraphQLObjectType schemas


const graphql=require('graphql');
const queries = require('../../queries/queries.js');
const locationstypes=require('../Locations/Locations.js');
const usertypes=require('../Users/Users.js')
const dataloader=require('../../Loaders/Users/Users_Loaders.js');
const pools=require('../../constants/pools.js')

const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList}=graphql;


//Review datatype that includes all details
const ReviewType=new GraphQLObjectType({
  name:'Review',
  fields:()=>({
    commentid:{type:GraphQLID},

    location:{//queries main database with commonuser to get all location information, gets passed a locationid in GraphQLID format, returns all location information
      type: new GraphQLList( locationstypes.LocationType),
      resolve(parent,args){
        return new queries.Locations(pools.mainpoolcommonquery).GetLocationByID(args.id)
    }
      },

    user:{//queries main database with commonuser to get all user information, gets passed a userid in graphqlID format, returns all user information
      type: new  GraphQLList(usertypes.UserType),
      resolve(parent,args){
        return dataloader.getusers.load(parent.userid)
    }
    },

    stars:{type:GraphQLString},
    comment:{type:GraphQLString}

  })
});
exports.ReviewType=ReviewType;
