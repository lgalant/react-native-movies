import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight } from 'react-native';
import Movie from './components/Movie'



export default function App() {

  const [movies, setMovies] = useState([])
  const [filtro, setFiltro] = useState("")
  const [pagina, setPagina] = useState(1)

  useEffect(()=> {
    buscaPelis()
  },[])
  
  useEffect(()=> {
    buscaPelis()
  },[pagina, filtro])

  function buscaPelis() {
    const f = fetch("https://www.omdbapi.com/?s="+filtro+"&apikey=2b23ac0e&page=" + pagina);
    return f
      .then(res => res.json())
      .then(json_extraido => {
        console.log("json.search", json_extraido.Search);
        setMovies(json_extraido.Search);
      })
      .catch(error => console.log("Fallo:" + error));
  }

  const cambiaFiltro = (filtro) => {
    setFiltro(filtro)
    setPagina(1)
  }

  const cambiarPagina = (pagina) => {
    if (pagina > 0)
      setPagina(pagina)

  }
  return (
    <View style={styles.container}>
      <Text>Filtrar titulo</Text>
      <View style={{flexDirection:'row'}}>
      <TextInput
        placeholder="Filtro"
        value={filtro}
        style = {{borderWidth:1, borderColor:'blue', marginHorizontal:10}}
        onChangeText={(text) => cambiaFiltro(text)}
      />
      <Button
        title = "Traer pelicula"
        onPress ={()=> buscaPelis()}
      />
      </View>
      <View style={{flex:1, marginTop:50, justifyContent:'center', alignItems:'center'}}>
          {movies && movies.map(movie => (
            <Movie movie={movie}/>
             ))}
      </View>


        <View style={{flexDirection:"row", marginBottom:100}}>
      <TouchableHighlight  style = {{backgroundColor:'red'}}  onPress ={()=> cambiarPagina(pagina+1)}>
            <Text> Siguiente</Text>
      </TouchableHighlight>
 

      <Text> Pagina {pagina} </Text>

    <Button
        title = "Anterior"
        onPress ={()=> cambiarPagina(pagina-1)}
      />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:100
  },
});
