import { useFetchExhibitionsById } from "@/hooks/useFetchExhibitionsById";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";


export default function ExhibitionDetails({params}
    : {
        params: {
            id: number
        }
    }) {
        const { id } = useLocalSearchParams();
        console.log("Exhibition ID:", id);
        let token = '';
        AsyncStorage.getItem('@token', (err, result) => {
            if (!err && result) {
                token = result;
            }
        });
        //
        const exhibition = useFetchExhibitionsById(Number(id), token)
    return (
        <View className='flex-1 p-5 m-5 justify-center items-center bg-white text-black'>
            {exhibition ? (
                
                    <View className="mb-4 border-2 p-4 rounded-lg w-full border-violet-600">
                        <Text className="text-2xl font-bold mb-2">{exhibition.exhibition?.name}</Text>
                        <Text className="text-lg mb-1">Category: {exhibition.exhibition?.category}</Text>
                        <Text className="text-lg mb-1">Start: {exhibition.exhibition?.startDateTime.toString()}</Text>
                        <Text className="text-lg mb-1">End: {exhibition.exhibition?.endDateTime.toString()}</Text>
                        <Text className="text-lg mb-1">Art Pieces on Display:</Text>
                        {exhibition.artPieces && exhibition.artPieces.length > 0 ? (
                            exhibition.artPieces.map((art) => (
                                <View key={art?.ArtPieceId} className="border-b border-gray-300 py-2">
                                    <Text className="text-lg font-semibold">{art?.ArtPieceName}</Text>
                                    <Text className="text-sm">{art?.ArtPieceCategory}</Text>
                                    <Image source={{ uri: art?.ArtUrl }} className="w-full h-48 object-cover rounded-lg" />
                                </View>
                            ))
                        ) : (
                            <Text>No art pieces found.</Text>
                        )}
                        <Link href={{
                            pathname: '/user/exhibitions/new-booking/[id]',
                            params: { id: String(exhibition.exhibition?.id) }
                        }} className="bg-violet-600 p-4 m-4 rounded-lg">
                            <Text className="text-white">
                                Book Now
                            </Text>
                        </Link>
                    </View>
                    
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    )
}