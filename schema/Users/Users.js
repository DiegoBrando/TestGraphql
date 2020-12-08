//User Related GraphQLObjectType schemas
const graphql=require('graphql');

const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList}=graphql;


//User datatype that includes all details
const UserType=new GraphQLObjectType({
  name:'User',
  fields:()=>({
    userid:{type:GraphQLID},
    username:{type:GraphQLString},
    profilepicture:{type:GraphQLString}
  })
});


exports.UserType=UserType;
