import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@clerk/expo';
import { useRouter } from 'expo-router';

export default function SSOCallback() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/');
    } else if (isLoaded && !isSignedIn) {
      // If we landed here but are not signed in after some time, go back to sign-in
      const timeout = setTimeout(() => {
        router.replace('/(auth)/sign-in');
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isLoaded, isSignedIn]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#0a7ea4" />
    </View>
  );
}
