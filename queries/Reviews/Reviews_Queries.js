//List of queries for Review Information


//Requires a pool and a single locationid in a graphqlID format
//Returns all Review information for all reviews for the locationid location
exports.getReviewsByLocation=(pool,locationid)=> {
   return pool.query('Select * from TestReviews where locationid=$1;',[locationid]).then(result=> result.rows)
 };


// TODO: Return review by reviewid 
