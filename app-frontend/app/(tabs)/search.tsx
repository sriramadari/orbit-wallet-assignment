import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, StyleSheet, View, Text, Dimensions, ImageBackground, Image } from 'react-native';
import HorizontalList from '../../components/HorizontalList';
import axios from 'axios';

const { width } = Dimensions.get('window');

const search = () => {
  const [hashtags, setHashtags] = useState<String[]>([]);
  const [communities, setCommunities] = useState<String[]>([]);
  const [nomads, setNomads] = useState<String[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const urls1: String[] = Array.from({ length: 10 }, (_, i) => `https://picsum.photos/200?random=${i}`);
      const urls2: String[] = Array.from({ length: 10 }, (_, i) => `https://picsum.photos/200?random=${i + 10}`);
      const urls3: String[] = Array.from({ length: 10 }, (_, i) => `https://picsum.photos/200?random=${i + 20}`);
      setHashtags(urls1);
      setCommunities(urls2);
      setNomads(urls3);
    };
    fetchImages();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.headerText}>
          Discover the world
        </Text>
      </View>
      <TextInput style={styles.searchBar} placeholder="Search" />
      <ImageBackground source={{ uri: 'https://picsum.photos/600/200' }} style={styles.topSearchImage}>
        <Text style={styles.topSearchText}>#Top Search of the Day</Text>
      </ImageBackground>
      <HorizontalList title="Trending Hashtags" type="hashtags" data={hashtags} />
      <HorizontalList title="Top Community" type="communities" data={communities} />
      <HorizontalList title="Top Nomads" type="nomads" data={nomads} circular />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#e6f0f0',
    paddingHorizontal: 22,
  },
  searchBar: {
    height: 40,
    backgroundColor: "white",
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#197d7b',
  },
  topSearchImage: {
    width:"100%",
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 20,
    borderRadius: 15, 
    overflow: 'hidden', 
  },
  topSearchText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
  },
});

export default search;