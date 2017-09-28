import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const styles = StyleSheet.create({
  repo: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 7,
    padding: 14,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    height: 48,
    textAlign: 'left',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 0.5
  },
  list: {
    marginTop: 12
  }
});

const RepositoriesList = ({ loading, repositories }) => {
  if (loading) {
    return <ActivityIndicator size={'large'} style={{ marginTop: '50%' }} />;
  }
  return (
    <FlatList
      style={styles.list}
      renderItem={({ item }) => <Text style={styles.repo}>{item.name}</Text>}
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

const withInfo = graphql(query, {
  options: ({ login }) => {
    return {
      variables: {
        login
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

const RepositoriesListWithInfo = withInfo(RepositoriesList);

export default RepositoriesListWithInfo;
