import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  Dimensions,
  StatusBar,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';

import Octicons from 'react-native-vector-icons/Octicons';
import TopBar from '../components/Topbar';

import LottieView from 'lottie-react-native';
import { useDraggable } from '../customHooks/useDraggable';
import DraggableImage from '../components/DraggableImage';

const SecureScreen = () => {
  const { gesturehandler, animatedStyle } = useDraggable();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const openGallery = async () => {
    try {
      const selected = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
      });

      const newUris = [];

      for (let img of selected) {
        const fileName = img.path.split('/').pop();
        const newPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        await RNFS.moveFile(img.path, newPath);
        newUris.push(`file://${newPath}`);
      }

      setImages(prev => [...prev, ...newUris]);
    } catch (e) {
      console.log('User cancelled picker or error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#18232A" />
      <TopBar title="Secure Folder" showBack />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Image Grid */}
        <View style={styles.grid}>
          {images.length === 0 ? (
            <View style={styles.lottieContainer}>
              <LottieView
                source={require('../assets/animation/secure.json')}
                autoPlay
                loop
                style={styles.lottie}
              />
              <Text style={styles.noImageTextWord}>There's nothing here.</Text>
            </View>
          ) : (
            images.map((uri, index) => (
              <DraggableImage key={index} ImageUri={uri} />
            ))
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={openGallery}>
        <Octicons name="shield-lock" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18232A',
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 130,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 110,
    height: 110,
    margin: 5,
    borderRadius: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#004C6B',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
  },
  addText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lottieContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  floatingTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  noImageTextWord: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 5,
    fontWeight: '500',
  },
});

export default SecureScreen;
