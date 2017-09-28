import React from 'react';
import { AppRegistry, NavigatorIOS } from 'react-native';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';
import App from './app/App';

const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql'
});

const TOKEN = null;

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }

      // Send the login token in the Authorization header
      req.options.headers.authorization = `Bearer ${TOKEN}`;
      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface
});

const GithubRN = () => (
  <ApolloProvider client={client}>
    <NavigatorIOS
      initialRoute={{
        component: App,
        title: 'Top 10 Repos'
      }}
      style={{ flex: 1 }}
    />
  </ApolloProvider>
);

AppRegistry.registerComponent('GithubRN', () => GithubRN);
