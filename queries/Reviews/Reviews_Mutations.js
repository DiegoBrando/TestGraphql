//List of mutations for Review Information


//Requires a pool, a single locationid in a graphqlID format, a single userid in graphqlID format, a single stars in GraphQLID format, and a single comment in GraphQLString format
// Auto generates an reviewid in graphqlid format
//Returns all Review information for the submitted review
exports.SubmitReview=(pool,locationid,userid,stars,comment)=> {
   return pool.query("INSERT INTO TestReviews(locationid,userid,stars,comment) Values($1,$2,$3,$4) Returning *;",[locationid,userid,stars,comment]).then(result=> result.rows)
 };


// TODO: Update Review

 // TODO: Remove Review
