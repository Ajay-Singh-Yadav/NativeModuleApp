import React, { useState } from 'react';
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
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

const SecureScreen = () => {
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {images.map((uri, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedImage(uri)}>
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={openGallery}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>

      {/* Fullscreen Image Modal */}
      <Modal visible={!!selectedImage} transparent={true} animationType="fade">
        <View style={styles.fullscreenContainer}>
          <TouchableOpacity
            style={styles.closeArea}
            onPress={() => setSelectedImage(null)}
          />
          <Image
            source={{ uri: selectedImage }}
            style={styles.fullscreenImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.closeArea}
            onPress={() => setSelectedImage(null)}
          />
        </View>
      </Modal>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  addText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SecureScreen;
