import React   from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default ({movie}) => {
    return(
        <Text style={{marginHorizontal:20}}>
        { movie.Title} - { movie.Year}
      </Text>
    )
}