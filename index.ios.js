import React, { Component } from 'react';
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

const TOKEN = 'ea8a79ffd2dba39f4d1b38efdbdff380bd755b7c';

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
        <NavigatorIOS
          initialRoute={{
            component: App,
            title: 'Top 10 Repos'
          }}
          style={{ flex: 1 }}
        />
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('GithubRN', () => GithubRN);
