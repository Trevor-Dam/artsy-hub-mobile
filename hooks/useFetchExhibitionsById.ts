import apiClient from "@/routes/axios-config";
import { useEffect, useRef } from "react";

type ArtPieces = {
    ArtPieceId: number;
    ExhibitionId: number;
    Status: string;
    IsSetup: boolean;
    IsRemoved: boolean;

    ExhibitionName: string;
    ExhibitionStartTime: Date;
    ExhibitionEndTime: Date;
    ArtistId: number;   
    ArtPieceCategory: string;
    ArtPieceName: string;
    ArtistName: string;
    ArtistSurname: string;
    ArtUrl: string;
}

export function useFetchExhibitionsById(exhibitionId: number, token: string) {
    const exhibition = useRef<{ 
        id: number; 
        name: string; 
        category: string; 
        startDateTime: Date; 
        endDateTime: Date;
    } | null>(null);

    const artPieces = useRef<ArtPieces[]>([]);
    
    useEffect(() => {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        apiClient.get(`/Exibitions/${exhibitionId}`)
            .then(res => {
                console.log("Exhibition Data:", res.data);
                exhibition.current = res.data;
            }).catch(error => {
                console.error("Error fetching exhibition data:", error);
            });

        apiClient.get(`/Displays/${exhibitionId}`)
            .then(res => {
                console.log("Art Pieces Data:", res.data);
                artPieces.current = res.data;
            }).catch(error => {
                console.error("Error fetching art pieces data:", error);
            });
    }, []);

    return { exhibition: exhibition.current, artPieces: artPieces.current };
}