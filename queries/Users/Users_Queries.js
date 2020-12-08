//List of queries for User Information
const rm=require( 'ramda');


//Requires a pool
module.exports = (pool) => ({


//Requires a list of userids in GraphQLID format, use with the getusers loader
//Returns all User data for all userids passed to it
GetUsersByID(userids){

  var queryString = `Select * from TestUsers where userid in  ((${userids.map((v,i) => `${v}`).join('),(')}) ) `//needed to do to actually insert variables into query

  return new Promise((resolve,reject)=>{
    pool.query(queryString,(errors,results)=>{
    const groupbyID=rm.groupBy(user=>user.userid, results.rows);//grouping data by userid in order for graphql to use the data
    users=rm.map(userid=>groupbyID[userid],userids);
     resolve(users)
   })
 })

},


});
