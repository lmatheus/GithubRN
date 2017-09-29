import React from 'react';
import SearchBar from 'react-native-search-bar';
import debounce from 'lodash/debounce';

const SearchBox = ({ text, handleSearch }) => (
  <SearchBar
    placeholder="Input a github username"
    onChangeText={debounce(text => handleSearch(text), 250)}
  />
);

export default SearchBox;
