const express= require('express');
const {graphqlHTTP}=require('express-graphql');
var  bodyParser =require('body-parser');
const { graphqlExpress } = require( 'apollo-server-express');

const schema=require('./schema/schema');
const app=express();



app.use('/graphql',bodyParser.json(),graphqlExpress({
schema,
graphiql:true

}));

app.listen(4000,()=>{
  console.log('now listening for requests on port 4000');
});
