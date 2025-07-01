import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { NativeModules } from 'react-native';
import { requestPermission } from '../helper/PermissionHelper';

import TopBar from '../components/Topbar';

const { GalleryModule } = NativeModules;

const AudioFilesScreen = () => {
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    loadAudioFiles();
  }, []);

  const loadAudioFiles = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return alert('Permission denied');
    const fetchedAudios = await GalleryModule.getAudioFiles();
    setAudios(fetchedAudios);
  };

  const renderAudioItem = ({ item }) => (
    <View style={styles.audioItem}>
      <Text style={styles.audioName} numberOfLines={1}>
        🎵 {item.name || 'Unknown'}
      </Text>
      <Text style={styles.audioSize}>
        {(item.size / (1024 * 1024)).toFixed(2)} MB
      </Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <TopBar title="Audio Files" showBack />
      <FlatList
        data={audios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderAudioItem}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={
          <Text style={{ color: '#fff' }}>No Audio Found</Text>
        }
      />
    </View>
  );
};

export default AudioFilesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18232A',
  },
  audioItem: {
    backgroundColor: '#1e2b36',
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
  },
  audioName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  audioSize: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
});
