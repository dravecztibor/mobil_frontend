import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Ipcim from './Ipcim';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedEteltipusok, setSelectedEteltipusok] = useState();

  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'eteltipusok');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const kattintas=()=>{
    //alert(selectedEteltipusok)
  }


  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>

      <Picker
        selectedValue={selectedEteltipusok}
        onValueChange={(itemValue, itemIndex) =>
        setSelectedEteltipusok(itemValue)
      }>
      {data.map((item)=>{
        return(
          <Picker.Item label={item.eteltipusok_nev} value={item.eteltipusok_id} />
        
	    )}
	    )}


      </Picker>


      <Button
        onPress={() => kattintas()}
        title="Teszt"
      />
      

    </View>
  );
};

export default App;