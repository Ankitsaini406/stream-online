import { Button } from "@/components/ui/button";

interface CategoryButtonsProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const categories = [
    { key: "popular", label: "Popular" },
    { key: "top_rated", label: "Top Rated" },
    { key: "upcoming", label: "Upcoming" },
    { key: "trending", label: "Trending" },
];

export default function CategoryButtons({ selectedCategory, onSelectCategory }: CategoryButtonsProps) {
    return (
        <div className="flex gap-4 mt-4 overflow-auto">
            {categories.map(({ key, label }) => (
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
