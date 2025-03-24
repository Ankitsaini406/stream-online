"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Category {
    id: number;
    name: string;
}

interface CategoryListProps {
    name: string;
    onCategoryChange: (genreId: string | null) => void;
}

export default function CategoryList({ name }: CategoryListProps) {
    const [genres, setGenres] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const response = await axios.get(`https://api.themoviedb.org/3/genre/${name}/list?api_key=${apiKey}&language=en-US`);
                setGenres(response.data.genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        
        fetchGenres();
    }, [name]);

    const handleGenreChange = (value: string) => {
        setSelectedCategory(value);
    };

    return (
        <Select onValueChange={handleGenreChange} defaultValue={selectedCategory || undefined}>
            <SelectTrigger className="w-[250px] bg-gray-800 text-white border-gray-600">
                <SelectValue placeholder="Select Genre" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white border-gray-600">
                {genres.map((genre) => (
                    <SelectItem key={genre.id} value={String(genre.id)}>
                        {genre.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
