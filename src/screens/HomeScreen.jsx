import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';

//icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const recentItems = [
  { id: '1', name: 'Screenshot', image: require('../assets/images/pic1.jpeg') },
  { id: '2', name: 'Screenshot', image: require('../assets/images/pic2.jpeg') },
  { id: '3', name: 'Screenshot', image: require('../assets/images/pic1.jpeg') },
  { id: '4', name: 'Pandit', image: require('../assets/images/pic2.jpeg') },
];

const categories = [
  { name: 'Downloads', size: '1.3 GB' },
  { name: 'Images', size: '1.4 GB' },
  { name: 'Videos', size: '4.9 GB' },
  { name: 'Audio', size: '0.99 GB' },
  { name: 'Documents', size: '22 MB' },
  { name: 'Apps', size: '48 GB' },
];

const { BiometricModule } = NativeModules;

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSafeFolderPress = async () => {
    try {
      const result = await BiometricModule.authenticate(
        'Authenticate to access Safe Folder',
      );

      if (result === 'SUCCESS') {
        navigation.navigate('Secure');
      } else {
        // Alert.alert('Failed', 'Authentication unsuccessful.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#aaa" />
        <TextInput
          placeholder='Search "invoice"'
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.gridContainer}>
        {categories.map((item, index) => (
          <View key={index} style={styles.gridItem}>
            <Text style={styles.gridTitle}>{item.name}</Text>
            <Text style={styles.gridSub}>{item.size}</Text>
          </View>
        ))}
      </View>

      {/* Collections */}
      <Text style={styles.sectionTitle}>Collections</Text>
      <View style={styles.row}>
        <View style={styles.collectionBox}>
          <Text style={styles.gridTitle}>★ Starred</Text>
        </View>
        <TouchableOpacity
          style={styles.collectionBox}
          onPress={handleSafeFolderPress}
        >
          <Text style={styles.gridTitle}>🔒 Safe folder</Text>
        </TouchableOpacity>
      </View>

      {/* Storage */}
      <Text style={styles.sectionTitle}>All storage</Text>
      <View style={styles.row}>
        <View style={styles.collectionBox}>
          <Text style={styles.gridTitle}>📱 Internal storage</Text>
          <Text style={styles.gridSub}>55 GB free</Text>
        </View>
        <View style={styles.collectionBox}>
          <Text style={styles.gridTitle}>💾 Other storage</Text>
          <Text style={styles.gridSub}>Browse cloud</Text>
        </View>
      </View>

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="share-social-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1f1f1f',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    color: '#fff',
    marginLeft: 10,
    flex: 1,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  recentList: {
    borderWidth: 1,
  },
  recentItem: {
    marginRight: 12,
    alignItems: 'center',
  },
  recentImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  recentText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    backgroundColor: '#1f1f1f',
    width: '47%',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  gridTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  gridSub: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collectionBox: {
    backgroundColor: '#1f1f1f',
    width: '48%',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#0a5fd7',
    padding: 16,
    borderRadius: 30,
    elevation: 6,
  },
});

export default HomeScreen;
