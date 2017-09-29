import React, { PureComponent } from 'react';
import { compose, withState, pure } from 'recompose';
import { View } from 'react-native';
import styled from 'styled-components/native';
import RepositoriesList from './RepositoriesList';
import SearchBox from './SearchBox';
import Header from './Header';

const AppContainer = styled.View`background: white;`;

const App = ({ username, handleSearch }) => (
  <AppContainer>
    <Header />
    <SearchBox handleSearch={handleSearch} />
    <RepositoriesList username={username} />
  </AppContainer>
);

const AppWithState = withState('username', 'handleSearch', '');
export default compose(AppWithState, pure)(App);
