import React from 'react';
import { Button, View, Alert } from 'react-native';
import { NativeModules } from 'react-native';

const { BiometricModule } = NativeModules;

export default function HomeScreen() {
  const handleBiometricAuth = async () => {
    try {
      const result = await BiometricModule.authenticate(
        'Login using biometrics',
      );
      Alert.alert('Success', result); // result is "SUCCESS"
    } catch (error) {
      Alert.alert('Authentication failed');
    }
  };

  return (
    <View style={{ marginTop: 100, padding: 20 }}>
      <Button
        title="Authenticate with Biometrics"
        onPress={handleBiometricAuth}
      />
    </View>
  );
}
