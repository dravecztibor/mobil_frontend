import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Button, Image} from 'react-native';
import Ipcim from "./Ipcim"
import { TouchableOpacity } from 'react-native-gesture-handler';

const Kozosscreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'etelek');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
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
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
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

                <Button
                    onPress={() => navigation.navigate("Részletek", {atkuld1:item.etelek_id, atkuld2:item.etelek_nev, atkuld3:item.etelek_hozzavalok, atkuld4:item.etelek_allergenek, atkuld5:item.etelek_elkeszites})}
                    title="Részletek"
                />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Kozosscreen;