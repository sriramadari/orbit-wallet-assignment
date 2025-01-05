import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Hashtags from './hashtags';
import Communities from './communities';
import Nomads from './nomads';

const HorizontalList = ({ title, data, type }: any) => {
  const renderList = () => {
    switch (type) {
      case 'hashtags':
        return <Hashtags data={data} />;
      case 'communities':
        return <Communities data={data} />;
      case 'nomads':
        return <Nomads data={data} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>
      {renderList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#197d7b",
  },
  seeAll: {
    fontSize: 12,
    fontWeight: 'semibold',
    marginBottom: 10,
    color: "#197d7b",
  },
});

export default HorizontalList;