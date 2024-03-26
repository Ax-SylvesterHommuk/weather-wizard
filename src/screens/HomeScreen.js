// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import LocationCard from '../components/LocationCard';

const locations = [
  'Võru',
  'Tartu',
  'Tallinn',
  'Pärnu',
  'Narva',
  'Viljandi',
  'Haapsalu',
  'Kuressaare',
  'Rakvere',
  'Paide',
  'Valga',
];

const HomeScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const renderLocationCard = ({ item }) => {
    return (
      <LocationCard
        location={item}
        onPress={() => setSelectedLocation(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Select a Location</Text>
      </View>
      <FlatList
        data={locations}
        renderItem={renderLocationCard}
        keyExtractor={(item) => item}
        style={styles.flatList} // Added style prop for FlatList
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titleContainer: {
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
  },
  flatList: {
    flex: 1, // Take up remaining space
  },
  selectedLocationContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
  },
  selectedLocationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default HomeScreen;
