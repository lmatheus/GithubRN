import React from 'react';
import { AppRegistry, NavigatorIOS, View, Text } from 'react-native';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';
import styled from 'styled-components/native';
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

const TokenMessage = styled.View`
  margin-top: 50px;
  padding: 0 25px;
  background: white;
`;

const GithubRN = () => {
  if (TOKEN) {
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
  } else {
    return (
      <TokenMessage>
        <Text>
          Please set the your Github Private Token on index.ios.js line 14
        </Text>
      </TokenMessage>
    );
  }
};

AppRegistry.registerComponent('GithubRN', () => GithubRN);
