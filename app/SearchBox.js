import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, TextInput } from 'react-native';
import SearchBar from 'react-native-search-bar';
import debounce from 'lodash/debounce';

class SearchBox extends Component {
  state = {
    text: ''
  };

  _handleKeypress = debounce(({ text }) => {
    const { handleSearch } = this.props;
    this.setState({ text });
    handleSearch({ text });
  }, 250);

  render() {
    const { text } = this.state;
    return (
      <SearchBar
        ref="searchBar"
        placeholder="Input a github username"
        onChangeText={text => this._handleKeypress({ text })}
      />
    );
  }
}

export default SearchBox;
