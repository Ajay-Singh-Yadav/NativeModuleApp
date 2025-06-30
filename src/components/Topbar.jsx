import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const TopBar = ({ title, showBack = false }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      <Text style={[styles.title, showBack && { marginLeft: 10 }]}>
        {title}
      </Text>

      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.icon, { marginLeft: 20, marginRight: 15 }]}
        >
          <Icon name="view-list" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="more-vert" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#18232A',
    paddingHorizontal: 5,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    flex: 1,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
});
