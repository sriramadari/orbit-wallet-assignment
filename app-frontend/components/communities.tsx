import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import communitiesData from '../constants/data.json';

const Communities = ({ data }: any) => {
  const combinedData = data.map((item: any, index: number) => ({
    image: item,
    name: communitiesData.communities[index]?.name || '',
    postsPerDay: communitiesData.communities[index]?.postsPerDay || '',
    country: communitiesData.communities[index]?.country || '',
  }));

  const renderNameWithBoldCountry = (name: string, country: string) => {
    const parts = name.split(new RegExp(`(${country})`, 'gi'));
    return (
      <Text style={styles.nameText}>
        {parts.map((part, index) =>
          part.toLowerCase() === country.toLowerCase() ? (
            <Text key={index} style={styles.countryText}>
              {part}
            </Text>
          ) : (
            part
          )
        )}
      </Text>
    );
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={combinedData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.postsPerDayText}>{item.postsPerDay}</Text>
          <View style={styles.textContainer}>
            {renderNameWithBoldCountry(item.name, item.country)}
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
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  nameText: {
    color: 'white',
    fontWeight: '200',
    fontSize: 26,
    padding: 2,
  },
  countryText: {
    fontWeight: 'bold',
  },
  postsPerDayText: {
    position: 'absolute',
    top: 4,
    right: 10,
    color: 'white',
    fontWeight:"bold",
    padding: 5,
    fontSize: 12,
  },
});

export default Communities;