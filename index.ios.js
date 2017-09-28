import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';
import App from './app/App';

const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql'
});

const TOKEN = 'e2b304160dee781dd8fae6eac8334eed2f422d5a';

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

class GithubRN extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('GithubRN', () => GithubRN);
