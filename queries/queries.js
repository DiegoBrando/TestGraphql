//Home of all queries to access in one location
const review_queries =require('../queries/Reviews/Reviews_Queries.js');
const location_queries=require('../queries/Locations/Locations_Queries.js')
const user_queries=require('../queries/Users/Users_Queries.js')


//Base for the queries to allow the pool to be passed on construction
//Requires pool
class BaseQueries{

  constructor(pool){
    this.pool=pool;
  }

};


//All Review queries
//Requires a pool
class Reviews extends BaseQueries{

  //Get Reviews by locationid
  //Requires a single locationid in graphqlID format
  //Returns a list of all review information for that locaiton
  getReviewsByLocation(locationid){
    return review_queries.getReviewsByLocation(this.pool,locationid)
  }

};

//All User queries
//Requires a pool
class Users extends BaseQueries{

  //Gets Users by their userid
  //Requires a userid in graphqlID format
  //Uses dataloader so it will be able to condense multiple ids into a single query
  //Returns all information on the Users
  GetUsersByID(userid){
    return user_queries.GetUsersByID(this.pool,userid)
  }


};


//All Location queries
//Requires a pool
class Locations extends BaseQueries{

  //Gets all Locations
  //Requires no inputs
  //Returns all information for all Locations
GetAllLocations(){
  return location_queries.GetAllLocations(this.pool)
}


//Gets Location by their locationid
//Requires a single locationid in graphqlID format
//Returns all information for that location
GetLocationByID(locationid){
  return location_queries.GetLocationByID(this.pool,locationid)
}


};


module.exports = {
  Reviews : Reviews,
  Users : Users,
  Locations:Locations
}
