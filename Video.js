import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';
import Ipcim from "./Ipcim"

const Video = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'etelek');
      const json = await response.json();
      setData(json.movies);
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

    <WebView source={{ uri: 'https://www.youtube.com/embed/TTF-vNIxCLs?si=N-Vw92MWqD9iB7gx' }} style={{ flex: 1 }} />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              {item.etelek_id}, {item.etelek_nev}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default Video;