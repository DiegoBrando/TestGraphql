//List databases of query from


const Pool = require('pg').Pool


//Common user to query the main database
const mainpoolcommonquery = new Pool({
  user: 'commonuser',
  host: 'anthonyoakeyfgc.cecxfun782s2.us-east-2.rds.amazonaws.com',
  database: 'STCharacters',
  password: 'password',
  port: 5432,
})


//Common user to mutate the main database
const mainpoolcommonmutate = new Pool({
  user: 'commonuser',
  host: 'anthonyoakeyfgc.cecxfun782s2.us-east-2.rds.amazonaws.com',
  database: 'STCharacters',
  password: 'password',
  port: 5432,
})


exports.mainpoolcommonquery=mainpoolcommonquery;
exports.mainpoolcommonmutate=mainpoolcommonmutate;
