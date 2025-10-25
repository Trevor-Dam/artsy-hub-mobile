import { Stack } from "expo-router";

export default function UserExhibitionsLayout() {
    return (
        <Stack>
            <Stack.Screen name="user/exhibitions/index" options={{ title: 'Browse Exhibitions' }} />
            <Stack.Screen name="user/exhibitions/new-booking/[id]" options={{ title: 'New Booking' }} />
            <Stack.Screen name="user/exhibitions/[id]" options={{ title: 'Exhibition Details' }} />
        </Stack>
    )
}