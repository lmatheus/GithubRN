import React from 'react';
import { ActivityIndicator } from 'react-native';
import { List, ListItem, Text } from 'native-base';
import styled from 'styled-components/native';
import { compose, pure } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const StyledActivityIndicator = styled.ActivityIndicator`margin-top: 50%;`;

const RepositoriesList = ({ loading, repositories }) => {
  if (loading) {
    return <StyledActivityIndicator size={'large'} />;
  }
  return (
    <List>
      {repositories.map(({ name, id }) => (
        <ListItem key={id}>
          <Text>{name}</Text>
        </ListItem>
      ))}
    </List>
  );
};

const query = gql`
  query getUserRepositories($login: String!) {
    repositoryOwner(login: $login) {
      repositories(orderBy: { field: CREATED_AT, direction: ASC }, last: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

const data = graphql(query, {
  options: ({ username }) => {
    return {
      variables: {
        login: username
      }
    };
  },
  props: ({ data }) => {
    // loading state
    if (data.loading) {
      return { loading: true };
    }

    // error state
    if (data.error) {
      console.error(data.error);
    }

    // OK state

    return {
      repositories:
        (data.repositoryOwner &&
          data.repositoryOwner.repositories.edges
            .map(({ node }) => ({
              name: node.name,
              id: node.id
            }))
            .reverse()) ||
        []
    };
  }
});

export default compose(pure, data)(RepositoriesList);
