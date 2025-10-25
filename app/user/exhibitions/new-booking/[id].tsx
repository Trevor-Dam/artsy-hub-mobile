import { useFetchExhibitions } from "@/hooks/useFetchExhibitions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type Guest = { name: string; surname: string; email: string };

export default function AddBookingScreen({ params }
    : { params: { 
        id: number 
    } 
}
) {
    const { id } = useLocalSearchParams();
    let token = '';
    let userId = 0;
    
    const [numGuests, setNumGuests] = React.useState<string>('0');
    const [exhibitionId, setExhibitionId] = React.useState<number>(0);
    const [guestName, setGuestName] = React.useState<string>('');
    const [guestSurname, setGuestSurname] = React.useState<string>('');
    const [guestEmail, setGuestEmail] = React.useState<string>('');
    let guests: Guest[] = [];

    async function createBooking() {
        const userID = await AsyncStorage.getItem('@userId');
        const token = await AsyncStorage.getItem('@token');
        if (!userID || !token) {
            console.error('User ID or token not found in AsyncStorage');
            return;
        }
        const bookingData = {
            userId: Number(userID),
            noOfGuests: Number(numGuests),
            exhibitionId: Number(id),
            isConfirmed: false,
            isDeleted: false,
            bookingId: 0
        };
        const guestData: {
            Name: string;
            Surname: string;
            Email: string;
            UserId: number;
            BookingId: number;
        }[] = [];
        try {
        const bookingResponse = await fetch('/Bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookingData)
        });
            const createdBooking = await bookingResponse.json();
            if (guests.length > 0) {
                guests.forEach(guest => {
                    guestData.push({
                        Name: guest.name,
                        Surname: guest.surname,
                        Email: guest.email,
                        UserId: userId,
                        BookingId: createdBooking.id
                    });
                });
                const guestResponse = await fetch(`/Guests`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(guestData)
                });
                    console.log('Guests added successfully:', await guestResponse.json());
                    // Optionally navigate to another screen or show success message
                    router.navigate('/user/exhibitions/index');
                }
             else {
                router.navigate('/user/exhibitions/index'); // Navigate if no guests to add
            }
    } catch (error) {
        console.error('Error creating booking:', error);
    }
}

    const exhibitions = useFetchExhibitions(token);
  return (
    <View className="flex-1 items-center justify-center bg-white p-4 text-black">
        <Text>Add Booking Screen</Text>
        <View>
            <Text>Number of Guests:</Text>
            <TextInput inputMode="numeric" placeholder="Enter number of guests" 
            value={numGuests}
            onChangeText={setNumGuests} 
            />
            {Number(numGuests) > 0 && (
                <View >
                    <Text>Guest Details:</Text>
                    <Text>Guest Name:</Text>
                    <TextInput placeholder="Enter guest name" 
                    value={guestName}
                    onChangeText={setGuestName}
                    />
                    <Text>Guest Surname:</Text>
                    <TextInput placeholder="Enter guest surname" 
                    value={guestSurname}
                    onChangeText={setGuestSurname}
                    />
                    <Text>Guest Email:</Text>
                    <TextInput inputMode="email" placeholder="Enter guest email" 
                    value={guestEmail}
                    onChangeText={setGuestEmail}
                    />
                    <TouchableOpacity className="mt-2 p-2 bg-violet-600 rounded-lg text-white"
                    onPress={() => {
                        if (guestName && guestSurname && guestEmail) {
                            guests.push({ name: guestName, surname: guestSurname, email: guestEmail });
                        }
                    }}>
                        <Text>Add Guest</Text>
                        </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity className="mt-4 p-2 bg-violet-600 rounded-lg text-white" 
            onPress={createBooking}>
                <Text>Add Booking</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}