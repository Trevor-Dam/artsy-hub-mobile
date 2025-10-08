import apiClient from "@/routes/axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";

export default function NotificationsScreen() {
    const token = AsyncStorage.getItem('@token');
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const exhibitions = useRef<{ id: number; name: string; category: string; startDateTime: string; endDateTime: string }[]>([]);
    useEffect(() => {
        const fetchExhibitions = async () => {
            try {
                const exhibitionsResponse = await apiClient.get('/Exibitions');
                console.log('All Exhibitions:', exhibitionsResponse.data);
                exhibitions.current = exhibitionsResponse.data;
            } catch (error) {
                console.error('Error fetching exhibitions:', error);
            }
        };
        fetchExhibitions();
    }, []);
    const hasData = exhibitions.current && exhibitions.current.length > 0;
    return (
        <View className="flex-1 items-center justify-center bg-white p-4">
            <Text className="text-black text-lg">All Exhibitions</Text>
            {hasData ? (
                exhibitions.current.map((exhibition) => (
                    <View key={exhibition.id} className="rounded-lg border-violet-600 shadow-lg py-2">
                        <Text className="font-bold">{exhibition.name}</Text>
                        <Text>Category: {exhibition.category}</Text>
                        <Text>Start: {String(exhibition.startDateTime)}</Text>
                        <Text>End: {String(exhibition.endDateTime)}</Text>
                    </View>
                ))
            ) : (
                <Text className="text-black">No exhibitions available</Text>
            )}
        </View>
    )
}