const graphql=require('graphql');
const _=require('lodash');
const Pool = require('pg').Pool
const cors = require('cors')
const pg = require('pg')

const pool = new Pool({
  user: 'commonuser',
  host: 'anthonyoakeyfgc.cecxfun782s2.us-east-2.rds.amazonaws.com',
  database: 'STCharacters',
  password: 'password',
  port: 5432,
})


const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList}=graphql;




const UserType=new GraphQLObjectType({
  name:'User',
  fields:()=>({
    userid:{type:GraphQLID},
    username:{type:GraphQLString},
    profilepicture:{type:GraphQLString}
  })
});


const LocationType=new GraphQLObjectType({
  name:'Location',
  fields:()=>({
    locationid:{type:GraphQLInt},
    address:{type:GraphQLString},
    phone:{type:GraphQLString},
    details:{type:GraphQLString},
    reviews:{
      type:  new GraphQLList(ReviewType),
      resolve(parent,args){
        return new Promise((resolve,reject)=>{pool.query('Select * from TestReviews where locationid=$1;',[parent.locationid],(errors,results)=>{
          console.log('TEST2')
          console.log(results)
           resolve(results.rows)
        })
      }
    )
    }
  }

})
});

const ReviewType=new GraphQLObjectType({
  name:'Review',
  fields:()=>({
    commentid:{type:GraphQLID},
    location:{
      type: new GraphQLList( LocationType),

      resolve(parent,args){
        return new Promise((resolve,reject)=>{pool.query('Select * from TestLocations where locationid=$1;',[parent.locationid],(errors,results)=>{
          console.log('TEST3')
          console.log(results)
           resolve(results.rows)
        })
      }
    )
    }
      },
    user:{
      type: new  GraphQLList(UserType),
      resolve(parent,args){
        return new Promise((resolve,reject)=>{pool.query('Select * from TestUsers where userid=$1;',[parent.userid],(errors,results)=>{
          console.log('TEST4')
          console.log(results)
           resolve(results.rows)
        })
      }
    )
    }
    },
    stars:{type:GraphQLString},
    comment:{type:GraphQLString}

  })
});









const RootQuery= new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    locations:{
      type:new GraphQLList(LocationType),
      resolve(parent,args){
        return new Promise((resolve,reject)=>{pool.query('Select * from TestLocations;',(errors,results)=>{
          console.log('TEST')
          console.log(results)
           resolve(results.rows)
        })
      }
    )
    }
  },
    location:{
      type: new GraphQLList(LocationType),
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        return new Promise((resolve,reject)=>{pool.query('Select * from TestLocations where locationid=$1;',[args.id],(errors,results)=>{
          console.log('TEST')
          console.log(results)
           resolve(results.rows)
        })
      }
    )
    }
    }


}


});

module.exports=new GraphQLSchema({
  query:RootQuery
});
