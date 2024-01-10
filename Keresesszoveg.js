import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TextInput, Button,} from 'react-native';
import Ipcim from './Ipcim';
import { TouchableOpacity } from 'react-native-gesture-handler';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + "etelek");
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

  const keresfuggveny = async () => {
    //alert(text)
    var adatok = {
        "bevitel1":text
    }
    try {
        const response = await fetch(Ipcim.Ipcim + 'keresetelszoveg', 
        {
            method: "POST",
            body: JSON.stringify(adatok),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }
        );
        const json = await response.json();
        setData(json);
      } 
    catch (error) {
        console.error(error);
      } 
    finally {
        setLoading(false);
      }


  }

  return (
    <View style={{flex: 1, padding: 24}}>

    <TextInput
        style={{height: 40}}
        placeholder="Keresés..."
        onChangeText={newText => setText(newText)}
        defaultValue={text}
    />

    <Button title='keresés' onPress={() => keresfuggveny()}/>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              {item.etelek_nev},
            </Text>
          )}    
        />
      )}
    </View>
  );
};

export default App;