//Home of all mutations to access in one location
const review_mutations =require('../queries/Reviews/Reviews_Mutations.js');


//Base for the mutations to allow the pool to be passed on construction
//Requires pool
class BaseMutations{

  constructor(pool){
    this.pool=pool;
  }

};


//All Review mutations
//Requires a pool
class Reviews extends BaseMutations{

  //Get Reviews by locationid
  //Requires a single locationid in graphqlID format
  //Returns a list of all review information for that locaiton
  SubmitReview(locationid,userid,stars,comment){
    return review_mutations.SubmitReview(this.pool,locationid,userid,stars,comment)
  }

};



module.exports = {
  Reviews : Reviews,
}
