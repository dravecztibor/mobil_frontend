import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Image, Button} from 'react-native';
import Ipcim from './Ipcim';

const App = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'etelek');
      const json = await response.json();
      setData(json);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({etelek_id}) => etelek_id}
          renderItem={({item}) => (
            <View>
                <View style={{
                    borderWidth:3, 
                    marginBottom:10, 
                    backgroundColor:"lightgreen",}}>

                    <Text style={{
                        color:"brown", 
                        fontSize:20, textAlign:"center", 
                        marginTop:20, 
                        marginBottom:5, 
                        color:"yellow", 
                        fontWeight:"bold", 
                        fontStyle:"italic"}}>
                        {item.etelek_nev}
                    </Text>

                    <Image source={{uri: Ipcim.Ipcim + `${item.etelek_kep}`}} style={{
                      width:300, 
                      height:300, 
                      alignItems:"center", 
                      marginLeft:30, 
                      marginBottom:20, 
                      marginTop:20,}}
                    />

                </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default App;