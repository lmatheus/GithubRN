import React from 'react';
import styled from 'styled-components/native';
import { compose, pure } from 'recompose';
import { FlatList, Text, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const StyledActivityIndicator = styled.ActivityIndicator`margin-top: 50%;`;

const Repo = styled.Text`
  flex: 1;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
  padding: 14px;
  background: white;
  border: 1px solid lightgray;
  height: 48px;
  shadow-color: #000;
  shadow-offset: 1px 2px;
  shadow-radius: 4px;
  shadow-opacity: 0.5;
`;

const StyledRepositoryList = styled.FlatList`
  margin-top: 7px;
  height: 100%;
`;

const RepositoriesList = ({ loading, repositories }) => {
  if (loading) {
    return <StyledActivityIndicator size={'large'} />;
  }
  return (
    <StyledRepositoryList
      renderItem={({ item }) => <Repo>{item.name}</Repo>}
      keyExtractor={({ id }) => id}
      data={repositories}
    />
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
        data.repositoryOwner &&
        data.repositoryOwner.repositories.edges
          .map(({ node }) => ({
            name: node.name,
            id: node.id
          }))
          .reverse()
    };
  }
});

export default compose(pure, data)(RepositoriesList);
