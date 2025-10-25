import apiClient from "@/routes/axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function NotificationsScreen() {
    const token = AsyncStorage.getItem('@token');
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const [exhibitions, setExhibitions] = React.useState<{ id: number; name: string; category: string; startDateTime: string; endDateTime: string }[]>([]);
    useEffect(() => {
        const fetchExhibitions = async () => {
            try {
                const exhibitionsResponse = await apiClient.get('/Exibitions');
                console.log('All Exhibitions:', exhibitionsResponse.data);
                setExhibitions(exhibitionsResponse.data);
            } catch (error) {
                console.error('Error fetching exhibitions:', error);
            }
        };
        fetchExhibitions();
    }, []);
    const hasData = exhibitions && exhibitions.length > 0;
    return (
        <View className="flex-1 items-center justify-center bg-white p-4">
            <Text className="text-black text-lg">All Exhibitions</Text>
            {hasData ? (
                exhibitions.map((exhibition) => (
                    <TouchableOpacity key={exhibition.id} 
                    className="rounded-lg border-violet-600 shadow-lg py-2"
                    onPress={() => {
                        router.navigate({
                            pathname: '/user/exhibitions/[id]',
                            params: { id: String(exhibition.id) }
                        })
                    }}>
                        <Text className="font-bold">{exhibition.name}</Text>
                        <Text>Category: {exhibition.category}</Text>
                        <Text>Start: {String(exhibition.startDateTime.toString())}</Text>
                        <Text>End: {String(exhibition.endDateTime.toString())}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text className="text-black">No exhibitions available</Text>
            )}
        </View>
    )
}