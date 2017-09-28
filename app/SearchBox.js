import React, { Component } from 'react';
import SearchBar from 'react-native-search-bar';
import debounce from 'lodash/debounce';

const SearchBox = ({ text, handleSearch }) => (
  <SearchBar
    placeholder="Input a github username"
    onChangeText={text => handleSearch(text)}
  />
);

export default SearchBox;
