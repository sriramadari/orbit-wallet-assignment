import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import nomadsData from '../constants/data.json';


const Nomads = ({ data }: any) => {
  const combinedData = data.map((item: any, index: number) => ({
    image: item,
    username: nomadsData.nomads[index]?.username || '',
    followers: nomadsData.nomads[index]?.followers || '',
  }));
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={combinedData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.circularImage} />
          <Text style={styles.imageText}>{"@"}{item.username}</Text>
          <Text style={styles.followersText}>{item.followers}{" followers"}</Text>
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
    marginRight: 8,
    flexDirection:"column",
    alignItems: 'center',
  },
  circularImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageText: {
    fontSize:12,
    color: '#197d7b',
    fontWeight: 'bold',
    padding: 1,
  },
  followersText: {
    fontSize:11,
    color: '#197d7b',
    fontWeight: 'semibold',
    padding: 1,
  },
});

export default Nomads;