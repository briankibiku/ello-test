import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000', // Update this URI if your GraphQL server runs on a different address
    cache: new InMemoryCache(),
});

export default client;
