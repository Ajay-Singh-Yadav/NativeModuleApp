import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { NativeModules } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import TopBar from '../components/Topbar';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const categories = [
  { name: 'Downloads', size: '1.3 GB' },
  { name: 'Images', size: '1.4 GB' },
  { name: 'Videos', size: '4.9 GB' },
  { name: 'Audio', size: '0.99 GB' },
  { name: 'Documents', size: '22 MB' },
  { name: 'Apps', size: '48 GB' },
];

const { BiometricModule } = NativeModules;

const { width } = Dimensions.get('window');

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

  // Text Animation

  const boxWidth = width * 0.48;
  const textWidth = boxWidth * 2;

  const offsetX = useSharedValue(boxWidth);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }],
  }));

  useEffect(() => {
    offsetX.value = withRepeat(
      withTiming(-textWidth, {
        duration: 6000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#18232A" />

      <View style={{ marginBottom: 10 }}>
        <TopBar title="All files" />
      </View>

      {/* Categories */}

      <View style={styles.gridContainer}>
        {categories.map((item, index) => (
          <View key={index} style={styles.gridItem}>
            <Text style={styles.gridTitle}>{item.name}</Text>
            <Text style={styles.gridSub}>{item.size}</Text>
          </View>
        ))}
      </View>

      {/* Collections */}
      <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Collections</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.collectionBox}
          onPress={() => {
            navigation.navigate('Drag');
          }}
        >
          <Text style={styles.gridTitle}>★ Starred</Text>
        </TouchableOpacity>
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

        {/* Collection Box */}
        <View style={styles.collectionBox}>
          <Text style={styles.gridTitle}>💾 Other storage</Text>

          <View style={styles.marqueeWrapper}>
            <Animated.Text
              style={[styles.marqueeText, animatedStyle, { width: textWidth }]}
              numberOfLines={1}
            >
              Browse cloud storage and developer files
            </Animated.Text>
          </View>
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
    backgroundColor: '#18232A',
    paddingHorizontal: 16,
    paddingTop: 10,
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
  sectionTitle: {
    color: '#fff',
    marginBottom: 20,
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
    backgroundColor: '#0F1417',
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
    backgroundColor: '#0F1417',
    width: '48%',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#004C6B',
    padding: 16,
    borderRadius: 30,
    elevation: 6,
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  marqueeWrapper: {
    overflow: 'hidden',
    width: '100%', // matches collectionBox width (48%)
    height: 20,
    marginTop: 4,
  },

  marqueeText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default HomeScreen;
