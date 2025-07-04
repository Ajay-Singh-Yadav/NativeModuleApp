import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import TopBar from '../components/Topbar';

import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewImageScreen = () => {
  const { uri } = useRoute().params;

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="View Image" showBack />

      <View style={styles.ImageContainter}>
        <Image source={{ uri }} style={[styles.image]} />
      </View>

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="pencil-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ViewImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18232A',
  },
  ImageContainter: {
    flex: 1,

    marginBottom: 100,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#004C6B',
    padding: 16,
    borderRadius: 30,
    elevation: 6,
  },
});
