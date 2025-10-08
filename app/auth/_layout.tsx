import { Stack } from 'expo-router';
import React from 'react';
import '../global.css';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name='user/dashboard' options={{ headerShown: false }} />
    </Stack>
  );
}