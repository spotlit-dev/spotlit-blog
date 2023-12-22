import { inspect } from 'util';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';
import loggerLink from 'apollo-link-logger';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SPOTLIT_ENDPOINT,
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        inspect(
          {
            graphQLError: {
              message,
              locations,
              path,
            },
          },
          { depth: null }
        )
      )
    );
  if (networkError) {
    console.log(inspect({ networkError }, { depth: null }));
  }

  console.log(inspect({ operation }, { depth: 4 }));
});

const authLink = setContext(async (_, { headers }) => {
  const accessToken = process.env.SPOTLIT_GRAPHQL_TOKEN;
  console.log({ accessToken, headers });

  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

export default new ApolloClient({
  link: ApolloLink.from([/*loggerLink,*/ errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
