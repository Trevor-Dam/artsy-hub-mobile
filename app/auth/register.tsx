import apiClient from '@/routes/axios-config';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import '../global.css';


export default function RegisterScreen() {
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    

    const registerUser = async () => {
        const request = {
            Name: name,
            Surname: surname,
            Email: email,
            Password: password,
            ConfirmPassword: confirmPassword,
            Role: 'Visitor'
        }
        try {
            const response = await apiClient.post('/Users/Register', request);
            if (response.status === 200 || response.status === 201) {
                console.log('Registration successful', response.data);
                router.push('/auth/login');
            } else {
                console.log('Registration failed with status:', response.status);
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    }

    return (
        <View className="flex-1 items-center justify-center bg-white p-4">
            <View className="p-5 rounded-lg shadow-lg w-1/3">
                <Image className="w-4 h-4 mb-4" source={require('../../resources/logo.png')} />
            </View>
            <View className="p-5 rounded-lg shadow-lg w-fit gap-4">
                <View className="text-black font-medium">
                    <Text>Name:</Text>
                    <TextInput 
                    placeholder="Enter your name" 
                    value={name}
                    onChangeText={setName}
                    className="border border-black p-2 rounded-lg"
                    />
                </View>
                <View className="text-black font-medium">
                    <Text>Surname:</Text>
                    <TextInput
                    placeholder="Enter your surname"
                    value={surname}
                    onChangeText={setSurname}
                    className="border border-black p-2 rounded-lg"
                    />
                </View>
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
                <View className="text-black font-medium">
                    <Text>Confirm Password:</Text>
                    <TextInput
                    placeholder="Confirm your password"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    className="border border-black p-2 rounded-lg"
                    />
                </View>
                <TouchableOpacity
                onPress={registerUser}
                className="items-center p-4 m-4 rounded-xl bg-indigo-600 text-white"
                >
                    <Text>Register</Text>
                </TouchableOpacity>   
            </View>
        </View>
    )
}
    
