const express = require('express');
const expressGraphql = require('express-graphql').graphqlHTTP;
const {GraphQLSchema, GraphQLObjectType,
    GraphQLList, GraphQLString, 
    GraphQLNonNull, GraphQLInt} = require('graphql');

const User = require('./peopleList')
const app = express();
const port = process.env.PORT || 3000;


const DataType =new GraphQLObjectType({
    name: "Datasets",
    description: "The collection of datasets",
    fields: ()=> ({
        id: {
            type: GraphQLNonNull(GraphQLString)
        },
        fname: {
            type: GraphQLString
        },
        lname: {
            type: GraphQLNonNull(GraphQLString)
        },
        email: {
            type: GraphQLNonNull(GraphQLString)
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'the root query',
    fields: () => ({
        data: {
            type: new GraphQLList(DataType),
            description: "A colection of the datasets",
            resolve: ()=> User.find()
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQuery
})

app.use('/graphql', expressGraphql({
    graphiql: true,
    schema: schema,
}))

app.listen(port, ()=>{
    console.log('server started');
})
