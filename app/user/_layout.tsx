 
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

export default function UserLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="user/dashboard" options={{
                title: 'Your Bookings',
                headerShown: false,
                tabBarLabel: 'Your Bookings',
                tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
            }} />
            <Tabs.Screen name="user/notifications" options={{
                title: 'Browse Exhibitions',
                headerShown: false,
                tabBarLabel: 'Browse Exhibitions',
                tabBarIcon: ({ color, size }) => <Ionicons name="notifications" size={size} color={color} />    
            }} />
            <Tabs.Screen name="auth/login" options={{
                title: 'Logout',
                headerShown: false,
                tabBarLabel: 'Logout',
                tabBarIcon: ({ color, size }) => <Ionicons name="log-out" size={size} color={color} />
            }} />
        </Tabs>
    )
}