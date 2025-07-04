import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { NativeModules } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { requestPermission } from '../helper/PermissionHelper';

import TopBar from '../components/Topbar';
import { useNavigation } from '@react-navigation/native';

const { GalleryModule } = NativeModules;

const ImagesScreen = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return alert('Permission denied');
    const fetchedImages = await GalleryModule.getImages();
    setImages(fetchedImages);
  };

  const renderImage = ({ item }) => {
    return isGridView ? (
      <View style={styles.gridItem}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewImage', { uri: item.uri })}
        >
          <Image
            source={{ uri: item.uri }}
            style={styles.gridImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.listItem}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewImage', { uri: item.uri })}
          style={styles.imageListButton}
        >
          <Image
            source={{ uri: item.uri }}
            style={styles.listThumbnail}
            resizeMode="cover"
          />
          <View style={styles.listInfo}>
            <Text style={styles.fileName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.fileSize}>
              {(item.size / (1024 * 1024)).toFixed(2)} MB
            </Text>
          </View>
        </TouchableOpacity>
        <Icon name="more-vert" size={24} color="#fff" />
      </View>
    );
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <View style={styles.container}>
      <TopBar title="Images" toggleView={toggleView} isGridView={isGridView} />

      {images.length === 0 ? (
        <Text style={{ color: '#fff' }}>No Media Found</Text>
      ) : (
        <FlatList
          key={isGridView ? 'grid' : 'list'}
          numColumns={isGridView ? 3 : 1}
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.gallery}
        />
      )}
    </View>
  );
};

export default ImagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18232A',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    borderRadius: 8,
  },

  tabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#555',
    borderRadius: 8,
  },
  gallery: {
    paddingHorizontal: 5,
  },
  gridImage: {
    width: 160,
    height: 130,
    borderRadius: 8,
  },
  listImage: {
    width: '95%',
    height: 200,
    margin: 8,
    alignSelf: 'center',
    borderRadius: 10,
  },
  videoList: {
    padding: 10,
  },
  videoBox: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  videoUriText: {
    color: '#00bcd4',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  uri: {
    color: '#ccc',
    fontSize: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e2b36',
    marginHorizontal: 8,
    marginVertical: 6,
    borderRadius: 10,
    padding: 10,
  },
  listThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  listInfo: {
    flex: 1,
  },
  fileName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  fileSize: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  imageListButton: {
    flexDirection: 'row',
    marginRight: 10,
    width: 420,
  },
  gridItem: {
    width: 160,
    height: 130,
    marginTop: 13,
    borderRadius: 8,
    marginHorizontal: 4,
    marginLeft: 2.5,
  },
});
