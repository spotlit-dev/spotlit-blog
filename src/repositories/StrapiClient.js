import { inspect } from 'util';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';
import loggerLink from 'apollo-link-logger';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_STRAPI_ENDPOINT,
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

export default new ApolloClient({
  link: ApolloLink.from([, /*loggerLink*/ errorLink, httpLink]),
  cache: new InMemoryCache(),
});
