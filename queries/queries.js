const rm=require( 'ramda');


module.exports = (pool) => ({
  getReviewsByLocation(locationids) {
     return pool.query('Select * from TestReviews where locationid=$1;',[locationids]).then(result=> result.rows)

  },

  GetLocationByID(locationids) {
    return new Promise((resolve,reject)=>{pool.query('Select * from TestLocations where locationid=$1;',[locationids],(errors,results)=>{


        resolve(results.rows)
    })
  })

},
GetAllLocations(){
  return pool.query('Selection * from TestLocations;').then(result=>result.rows)
},


GetUsersByID(userids){
  var queryString = `Select * from TestUsers where userid in  ((${userids.map((v,i) => `${v}`).join('),(')}) ) `
  return new Promise((resolve,reject)=>{pool.query(queryString,(errors,results)=>{
    const groupbyID=rm.groupBy(user=>user.userid, results.rows);
    users=rm.map(userid=>groupbyID[userid],userids);

     resolve(users)


  })
})
},


});
