import { useFetchExhibitionsByUserId } from "@/hooks/useFetchExhibitionsByUserId";
import apiClient from "@/routes/axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View } from "react-native";

export default function DashboardScreen() {
  let token = '';
  let userId = 0;
  AsyncStorage.getItem('@token').then(t => {token = t || '';
  });
  AsyncStorage.getItem('@userId').then(id => {userId = Number(id) || 0;
  });
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const bookingData = useFetchExhibitionsByUserId(userId, token);
  const hasBookings = bookingData && bookingData.length > 0;
  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text>Your Bookings</Text>
      {hasBookings ? (
        bookingData.map((booking) => (
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
