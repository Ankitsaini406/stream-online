import { Button } from "@/components/ui/button";

interface CategoryButtonsProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    type: string;
}

const categories: { [key: string]: { key: string; label: string }[] } = {
    movie: [
        { key: "popular", label: "Popular" },
        { key: "top_rated", label: "Top Rated" },
        { key: "upcoming", label: "Upcoming" },
        { key: "trending", label: "Trending" },
    ],
    tv: [
        { key: "popular", label: "Popular" },
        { key: "top_rated", label: "Top Rated" },
        { key: "on_the_air", label: "On The Air" },
        { key: "airing_today", label: "Airing Today" },
    ],
};

export default function CategoryButtons({ selectedCategory, onSelectCategory, type }: CategoryButtonsProps) {
    return (
        <div className="flex gap-4 mt-4 overflow-auto">
            {categories[type]?.map(({ key, label }) => (
                <Button 
                    key={key} 
                    onClick={() => onSelectCategory(key)} 
                    className={selectedCategory === key ? "bg-blue-600" : ""}
                >
                    {label}
                </Button>
            ))}
        </div>
    );
}
