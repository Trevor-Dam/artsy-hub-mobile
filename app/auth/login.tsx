import apiClient from "@/routes/axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import '../global.css';


export default function LoginScreen() {
    //const user = useUserContext();
    AsyncStorage.clear();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");

    //const apiLocalUrl = process.env.LOCAL_API_URL;

    const loginVisitor = async () => {
        const request = {
                    Email: email,
                    Password: password
                }
        try {
            const response = await apiClient.post('/Users/Login', request);
            const userData = response.data;
            if (response.status === 200 || response.status === 201) {
                
                await AsyncStorage.setItem('@name', userData.name);
                await AsyncStorage.setItem('@surname', userData.surname);
                await AsyncStorage.setItem('@role', userData.role);
                await AsyncStorage.setItem('@token', userData.token);
                await AsyncStorage.setItem('@userId', userData.id.toString());
                console.log('Login successful:', userData);
                //user.setUser(userData);
                router.push('./user/');
            } else {
                setMessage('Invalid email or password');
                console.log('Login failed with status:', response.status);
            }
        } catch (error) {
            setMessage('An error occurred during login');
            console.error('Login error:', error);
        }
    }
    return (
        <View className="flex-1 items-center justify-center bg-white p-4">
            <View className="p-5 rounded-lg shadow-lg w-1/3">
                <Image className="w-4 h-4 mb-4" source={require('../../resources/logo.png')} />
            </View>
            <View className="p-5 rounded-lg shadow-lg">
                <View className="text-black font-medium">
                    <Text>Email:</Text>
                    <TextInput 
                    placeholder="Enter your email" 
                    inputMode="email"
                    value={email}
                    onChangeText={setEmail}
                    className="border border-black p-2 rounded-lg"
                    />
                </View>
                <View className="text-black font-medium">
                    <Text>Password:</Text>
                    <TextInput 
                    placeholder="Enter your password" 
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}

                    className="border border-black p-2 rounded-lg"
                    />
                </View>
                <TouchableOpacity 
                onPress={loginVisitor}
                className="items-center p-4 m-4 rounded-xl bg-indigo-600 text-white"
                >
                    <Text >Login</Text>
                </TouchableOpacity> 
                <Text className="text-red-500">{message}</Text>
                <View className="justify-start items-center">
                    <Text className="text-black">Do not have an account? </Text>
                    <Link href="/auth/register">Register</Link>
                </View>
            </View>
        </View>
    );
}
