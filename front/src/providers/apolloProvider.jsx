import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { env } from "../utils/env";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: env.VITE_GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers,
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const AppApolloProvider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
