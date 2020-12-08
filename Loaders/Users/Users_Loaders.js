//List of loaders for Users' data in order to lower the count of queries to the database, solving N+1 Problem
const pools=require('../../constants/pools.js');
const DataLoader=require('dataloader')
const user_queries=require('../../queries/Users/Users_Queries.js');


//queries all users passed to it in 1 query
//Requires at least 1 userid in graphqlID format
const getusers=new DataLoader(user_queries(pools.mainpoolcommonquery).GetUsersByID);


exports.getusers=getusers;
