const graphql=require('graphql');
const _=require('lodash');
const Pool = require('pg').Pool
const cors = require('cors')
const pg = require('pg')
const db = require('../queries/queries.js');
const DataLoader=require('dataloader')
const pool = new Pool({
  user: 'commonuser',
  host: 'anthonyoakeyfgc.cecxfun782s2.us-east-2.rds.amazonaws.com',
  database: 'STCharacters',
  password: 'password',
  port: 5432,
})
//https://gist.github.com/JoeKarlsson/ca1d2f3e95fa2412feb418aedfbf9844

const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList}=graphql;

const getusers=new DataLoader(db(pool).GetUsersByID);


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
      resolve(parent,args) {
        return  db(pool).getReviewsByLocation(parent.locationid)
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
        return db(pool).GetLocationByID(parent.locationid)
    }
      },
    user:{
      type: new  GraphQLList(UserType),
      resolve(parent,args){
        return getusers.load(parent.userid)
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
        return db(pool).GetAllLocations()
    }
  },
    location:{
      type: new GraphQLList(LocationType),
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        return db(pool).GetLocationByID(args.id)
    }
    }


}


});

const Mutation= new GraphQLObjectType({
  name:'Mutation',
  fields:{
    AddReview:{
      type: new GraphQLList(ReviewType),
      args:{
        locationid:{type:GraphQLString},
        comment:{type:GraphQLString},
        stars:{type:GraphQLString},
        userid:{type:GraphQLString}
      },
      resolve(parent,args){
        return new Promise((resolve,reject)=>{pool.query("INSERT INTO TestReviews(locationid,userid,stars,comment) Values($1,$2,$3,$4) Returning *;",[args.locationid,args.userid,args.stars,args.comment],(errors,results)=>{
          console.log(args.results)


          resolve(results.rows)
        })
      }
    )
    }
    }
  }
})

module.exports=new GraphQLSchema({
  query:RootQuery,
  mutation:Mutation
});
