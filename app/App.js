import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import RepositoriesList from './RepositoriesList';
import SearchBox from './SearchBox';

class App extends Component {
  state = {
    login: ''
  };

  _handleSearch = ({ text }) => {
    this.setState({ login: text });
  };

  render() {
    const { login } = this.state;
    return (
      <View style={styles.app}>
        <SearchBox handleSearch={this._handleSearch} />
        <RepositoriesList login={login} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: 'white'
  }
});

export default App;
