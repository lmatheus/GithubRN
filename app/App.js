import React, { PureComponent } from 'react';
import { compose, withState, pure } from 'recompose';
import { View } from 'react-native';
import styled from 'styled-components/native';
import RepositoriesList from './RepositoriesList';
import SearchBox from './SearchBox';

const AppContainer = styled.View`
  padding-top: 65px;
  background: white;
`;

const App = ({ username, handleSearch }) => (
  <AppContainer>
    <SearchBox handleSearch={handleSearch} />
    <RepositoriesList username={username} />
  </AppContainer>
);

const AppWithState = withState('username', 'handleSearch', '');
export default compose(AppWithState, pure)(App);
