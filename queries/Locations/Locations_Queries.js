//List of queries for Location Information


//Requires a pool and a single locationid in graphqlID format
//Returns all information for the locationid location
exports.GetLocationByID=(pool,locationid)=> {
  return pool.query('Select * from TestLocations where locationid=$1;',[locationid]).then(result=>result.rows)
};


//Requires a pool
//Returns all information for all locations
exports.GetAllLocations=(pool)=>{
    return pool.query('Select * from TestLocations;').then(result=>result.rows)
};
