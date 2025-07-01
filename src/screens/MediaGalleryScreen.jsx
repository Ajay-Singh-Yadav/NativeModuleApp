// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   PermissionsAndroid,
//   Platform,
//   ScrollView,
// } from 'react-native';

// import { NativeModules } from 'react-native';
// const { GalleryModule } = NativeModules;

// const requestPermission = async () => {
//   if (Platform.OS === 'android') {
//     const granted = await PermissionsAndroid.requestMultiple([
//       PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//       PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
//       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//     ]);
//     return (
//       granted['android.permission.READ_MEDIA_IMAGES'] ===
//         PermissionsAndroid.RESULTS.GRANTED ||
//       granted['android.permission.READ_EXTERNAL_STORAGE'] ===
//         PermissionsAndroid.RESULTS.GRANTED
//     );
//   }
//   return true;
// };

// const MediaGalleryScreen = () => {
//   const [images, setImages] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [activeTab, setActiveTab] = useState('images');

//   useEffect(() => {
//     loadMedia();
//   }, []);

//   const loadMedia = async () => {
//     const hasPermission = await requestPermission();
//     if (!hasPermission) return alert('Permission denied');

//     const fetchedImages = await GalleryModule.getImages();
//     const fetchedVideos = await GalleryModule.getVideos();

//     setImages(fetchedImages);
//     setVideos(fetchedVideos);
//   };

//   const renderImage = ({ item }) => (
//     <Image source={{ uri: item }} style={styles.mediaItem} resizeMode="cover" />
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.tabBar}>
//         <TouchableOpacity
//           onPress={() => setActiveTab('images')}
//           style={[styles.tabButton, activeTab === 'images' && styles.activeTab]}
//         >
//           <Text style={styles.tabText}>Images</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => setActiveTab('videos')}
//           style={[styles.tabButton, activeTab === 'videos' && styles.activeTab]}
//         >
//           <Text style={styles.tabText}>Videos</Text>
//         </TouchableOpacity>
//       </View>

//       {activeTab === 'images' ? (
//         <FlatList
//           data={images}
//           renderItem={renderImage}

//           keyExtractor={(item, index) => index.toString()}
//           numColumns={3}
//           contentContainerStyle={styles.gallery}
//         />
//       ) : (
//         <FlatList
//           data={videos}
//           renderItem={({ item }) => (
//             <View style={styles.videoBox}>
//               <Text style={styles.videoUriText}>🎥 Video URI:</Text>
//               <Text style={styles.uri}>{item}</Text>
//             </View>
//           )}
//           keyExtractor={(item, index) => index.toString()}
//           contentContainerStyle={styles.videoList}
//         />
//       )}
//     </View>
//   );
// };

// export default MediaGalleryScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#111',
//     paddingTop: 50,
//   },
//   tabBar: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   tabButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#333',
//     marginHorizontal: 5,
//     borderRadius: 8,
//   },
//   activeTab: {
//     backgroundColor: '#00bcd4',
//   },
//   tabText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   gallery: {
//     paddingHorizontal: 5,
//   },
//   mediaItem: {
//     width: '32%',
//     height: 120,
//     margin: 4,
//     borderRadius: 8,
//   },
//   videoList: {
//     padding: 10,
//   },
//   videoBox: {
//     backgroundColor: '#222',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   videoUriText: {
//     color: '#00bcd4',
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   uri: {
//     color: '#ccc',
//     fontSize: 12,
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import { NativeModules } from 'react-native';
const { GalleryModule } = NativeModules;

const requestPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
    return (
      granted['android.permission.READ_MEDIA_IMAGES'] ===
        PermissionsAndroid.RESULTS.GRANTED ||
      granted['android.permission.READ_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED
    );
  }
  return true;
};

const MediaGalleryScreen = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('images');
  const [isGridView, setIsGridView] = useState(true); // 👈 toggle list/grid

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return alert('Permission denied');

    const fetchedImages = await GalleryModule.getImages();
    const fetchedVideos = await GalleryModule.getVideos();

    setImages(fetchedImages);
    setVideos(fetchedVideos);
  };

  const renderImage = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={isGridView ? styles.gridImage : styles.listImage}
      resizeMode="cover"
    />
  );

  const renderVideo = ({ item }) => (
    <View style={styles.videoBox}>
      <Text style={styles.videoUriText}>🎥 Video URI:</Text>
      <Text style={styles.uri}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setActiveTab('images')}
          style={[styles.tabButton, activeTab === 'images' && styles.activeTab]}
        >
          <Text style={styles.tabText}>Images</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('videos')}
          style={[styles.tabButton, activeTab === 'videos' && styles.activeTab]}
        >
          <Text style={styles.tabText}>Videos</Text>
        </TouchableOpacity>
        {activeTab === 'images' && (
          <TouchableOpacity
            onPress={() => setIsGridView(!isGridView)}
            style={[styles.toggleBtn]}
          >
            <Text style={{ color: '#fff' }}>
              {isGridView ? 'List View' : 'Grid View'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Media Display */}
      {activeTab === 'images' ? (
        <FlatList
          key={isGridView ? 'grid' : 'list'} // 👈 FIX for warning
          numColumns={isGridView ? 3 : 1}
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.gallery}
        />
      ) : (
        <FlatList
          data={videos}
          renderItem={renderVideo}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.videoList}
        />
      )}
    </View>
  );
};

export default MediaGalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 50,
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
  activeTab: {
    backgroundColor: '#00bcd4',
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
    width: '32%',
    height: 120,
    margin: 4,
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
});
