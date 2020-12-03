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

const locations=[
  {locationid:'1',address:'60 Corporate Park\nIrviine,Ca 92606',phone:'(949) 553-1776',details:'Drive Through\nAppointment Only\nReferral Required\nCall for Appointment'},
  {locationid:'2',address:'506 S Oakley\nChicago,IL 60612',phone:'(708) 557-7612',details:'Appointment Only\nReferral Required'},
  {locationid:'3',address:'Walt Disney World\nOrlando,Florida 92606',phone:'(404) 123-4567',details:'Appointment Only\nReferral Required\nCall for Appointment'},





];

const reviews=[
  {commentid:'1',locationid:'1',userid:'1',stars:'3',comment:'Location 1 Review 1 details'},
  {commentid:'2',locationid:'1',userid:'2',stars:'1',comment:'Location 1 Review 2 details'},
  {commentid:'3',locationid:'1',userid:'3',stars:'2',comment:'Location 1 Review 3 details'},
  {commentid:'4',locationid:'1',userid:'4',stars:'5',comment:'Location 1 Review 4 details'},
  {commentid:'5',locationid:'1',userid:'5',stars:'5',comment:'Location 1 Review 5 details'},
  {commentid:'6',locationid:'2',userid:'1',stars:'1',comment:'Location 2 Review 1 details'},
  {commentid:'7',locationid:'2',userid:'2',stars:'2',comment:'Location 2 Review 2 details'},
  {commentid:'8',locationid:'2',userid:'3',stars:'2',comment:'Location 2 Review 3 details'},
  {commentid:'9',locationid:'2',userid:'4',stars:'2',comment:'Location 2 Review 4 details'},
  {commentid:'10',locationid:'2',userid:'5',stars:'1',comment:'Location 2 Review 5 details'},
  {commentid:'11',locationid:'2',userid:'6',stars:'5',comment:'Location 2 Review 6 details'},
  {commentid:'12',locationid:'2',userid:'7',stars:'5',comment:'Location 2 Review 7 details'},
  {commentid:'13',locationid:'3',userid:'1',stars:'4',comment:'Location 3 Review 1 details'},
  {commentid:'14',locationid:'3',userid:'2',stars:'4',comment:'Location 3 Review 2 details'},
  {commentid:'15',locationid:'3',userid:'3',stars:'4',comment:'Location 3 Review 3 details'},
  {commentid:'16',locationid:'3',userid:'4',stars:'3',comment:'Location 3 Review 4 details'},
  {commentid:'17',locationid:'1',userid:'6',stars:'1',comment:'Location 1 Review 6 details'},
  {commentid:'18',locationid:'1',userid:'7',stars:'3',comment:'Location 1 Review 7 details'},




];


const users=[
  {userid:'1',username:'Name1',profilepicture:'https://homepages.cae.wisc.edu/~ece533/images/barbara.png'},
  {userid:'2',username:'Name2',profilepicture:'https://homepages.cae.wisc.edu/~ece533/images/boat.png'},
  {userid:'3',username:'Name3',profilepicture:'https://homepages.cae.wisc.edu/~ece533/images/cat.png'},
  {userid:'4',username:'Name4',profilepicture:'https://homepages.cae.wisc.edu/~ece533/images/fruits.png'},
  {userid:'5',username:'Name5',profilepicture:'https://homepages.cae.wisc.edu/~ece533/images/frymire.png'},
  {userid:'6',username:'Name6',profilepicture:'https://homepages.cae.wisc.edu/~ece533/images/girl.png'},
  {userid:'7',username:'Name7',profilepicture:'https://homepages.cae.wisc.edu/~ece533/images/monarch.png'},


];


const books = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
  {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
  {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
  {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
  {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
  {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
];


const authors =  [
  {name: 'Patrick Rothfuss', age: 44, id:"1"},
  {name: 'Brandon Sanderson', age: 42, id:"2"},
  {name: 'Terry Pratchett', age: 66, id:"3"},
];

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
      type:new GraphQLList(ReviewType),
      resolve(parent,args){
        return _.filter(


          pool.query('Select * from TestReviews',(error,results)=>{

          console.log('\n\n\nRESULTS\n\n\n')
          console.log(parent.locationid)
          console.log(results)
           return results.rows}),{locationid:parent.locationid});

      }
    }
  })
});

const ReviewType=new GraphQLObjectType({
  name:'Review',
  fields:()=>({
    commentid:{type:GraphQLID},
    location:{
      type:  LocationType,

        resolve(parent,args){
          return _.find(new Promise((resolve,reject)=>{pool.query('Select * from TestLocations;',(error,results)=>{return resolve(results.rows)})}),{locationid:parent.locationid});
        }
      },
    user:{
      type:  UserType,
      resolve(parent,args){
        return _.find(new Promise((resolve,reject)=>{pool.query('Select * from TestUsers;',(error,results)=>{return resolve(results.rows)})}),{userid:parent.userid});
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
          console.log(results.rows)
          return resolve(results.rows)
        })
      }
    )
    }
  },
    location:{
      type: LocationType,
      args:{id:{type:GraphQLID}},
      resolve:  (parents,args)=>{
        return new Promise( function(resolve,reject){
          pool.query('Select * from TestLocations where locationid=CAST($1 as integer);',[args.id], function(err,rows){
            console.log('1')
            console.log(JSON.stringify(rows.rows))



                  resolve(JSON.stringify(rows.rows))
          });


        });

      }
    }


}


});

module.exports=new GraphQLSchema({
  query:RootQuery
});
