import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import hashtagsData from '../constants/data.json';

const Hashtags = ({ data }: any) => {
  const combinedData = data.map((item: any, index: number) => ({
    image: item,
    hashtag: hashtagsData.hashtags[index]?.hashtag || '',
    taggedPeople: hashtagsData.hashtags[index]?.taggedPeople || '',
  }));

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={combinedData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.hashtagText}>{item.hashtag}</Text>
            <Text style={styles.taggedPeopleText}>{item.taggedPeople}</Text>
          </View>
        </View>
      )}
      contentContainerStyle={styles.scrollContainer}
    />
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    marginRight: 10,
    position: 'relative',
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  textContainer: {
    width: 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    left: 0,
    padding: 5,
  },
  hashtagText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taggedPeopleText: {
    color: 'white',
  },
});

export default Hashtags;