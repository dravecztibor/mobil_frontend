import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Proba = ({route, navigation}) => {
  

  return (
    <View style={styles.container}>
        <Text>Próba</Text>
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Proba;
