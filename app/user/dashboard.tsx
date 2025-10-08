import apiClient from "@/routes/axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";

export default function DashboardScreen() {
  const bookingData = useRef<{ exhibition: any; userName: string; userSurname: string; userEmail: string; numGuests: number }[]>([]);
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | number>(0);
  useEffect(() => {
    const generateUserBookings = async () => {
      try {
        const name = await AsyncStorage.getItem('@name');
        const surname = await AsyncStorage.getItem('@surname');
        const role = await AsyncStorage.getItem('@role');
        const token = await AsyncStorage.getItem('@token');
        const userId = await AsyncStorage.getItem('@userId');
        console.log('User Info:', { name, surname, role, token, userId });
        // Example API call using the token for authentication
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiClient.get(`/Bookings/user/${userId}`);
        bookingData.current = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    setTimeoutId(setTimeout(generateUserBookings, 1000));
  }, [timeoutId, setTimeoutId]);
  const hasBookings = bookingData.current && bookingData.current.length > 0;
  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text>Your Bookings</Text>
      {hasBookings ? (
        bookingData.current.map((booking) => (
          <View key={booking.exhibition.id} className="rounded-lg border-violet-600 shadow-lg py-2">
            <Text className="font-bold">{booking.exhibition.name}</Text>
            <Text>Start: {String(booking.exhibition.startDateTime)}</Text>
            <Text>End: {String(booking.exhibition.endDateTime)}</Text>
            <Text>Number of Guests: {booking.numGuests}</Text>
          </View>
        ))
      ) : (
        <Text className="text-black">No bookings available</Text>
      )}
    </View>
  );
}
