import apiClient from "@/routes/axios-config";
import { useEffect, useRef } from "react";

export function useFetchExhibitions(token: string) {
    const exhibitions = useRef<{ 
        id: number; 
        name: string; 
        category: string; 
        startDateTime: string; 
        endDateTime: string;
    }[]>([]);
    useEffect(() => {
        // Fetch exhibitions data here and set to exhibitions.current
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        apiClient.get('/Exibitions')
        .then(res => { 
            console.log("Exhibitions Data:", res.data);
            exhibitions.current = res.data;
        }).catch(error => {
            console.error("Error fetching exhibitions data:", error);
        });
    }, []);

    return exhibitions.current;
}