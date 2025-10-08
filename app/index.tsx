import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import './global.css';


export default function HomeScreen() {
  return (
    <View className='flex-1 items-center justify-center bg-white p-4'>
      <Image className='mb-4 w-4 h-4' source={require('../resources/logo.png')} />
      <TouchableOpacity className='bg-indigo-500 p-4 rounded-xl m-4' onPress={() => {
        router.push('/auth/login');
      }}>
        <Text className='text-white'>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
