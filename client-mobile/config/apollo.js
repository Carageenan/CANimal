import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://canimal-orchestrator.herokuapp.com",
  cache: new InMemoryCache(),
});

export default client;
