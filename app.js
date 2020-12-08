const express= require('express');
const {graphqlHTTP}=require('express-graphql');
var  bodyParser =require('body-parser');
const { graphqlExpress } = require( 'apollo-server-express');

const schema=require('./schema/schema');
const app=express();



//app.use('/graphql',bodyParser.json(),graphqlExpress({
//schema,
//graphiql:true,
//playground: true,
//introspection: true,

//}));


//App information uses graphiql , use http://localhost:4000/graphql to access
//TODO:Fix apollo
app.use('/graphql',graphqlHTTP({
schema,
graphiql:true

}));


//Starts app on port 4000
//user localhost:4000 to access
app.listen(4000,()=>{
  console.log('now listening for requests on port 4000');
});
