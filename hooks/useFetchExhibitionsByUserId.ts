import apiClient from "@/routes/axios-config";
import { useEffect, useRef } from "react";


export function useFetchExhibitionsByUserId(userId: number, token: string) {
    const bookingData = useRef<{ exhibition: any; userName: string; userSurname: string; userEmail: string; numGuests: number }[]>([]);
  useEffect(() => {
        // Example API call using the token for authentication
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        apiClient.get(`/Bookings/user/${userId}`)
        .then(res => { 
            console.log("User Data:", res.data);
            bookingData.current = res.data;
        }).catch(error => {
            console.error("Error fetching user data:", error);
        });
  }, []);

  return bookingData.current;
}