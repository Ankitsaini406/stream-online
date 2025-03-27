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
        <div className="flex gap-3 mt-4 overflow-auto">
            {categories[type]?.map(({ key, label }) => (
                <Button
                    key={key}
                    onClick={() => onSelectCategory(key)}
                    className={`px-5 py-2 rounded-lg transition-all 
                        ${
                            selectedCategory === key
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "bg-secondary text-secondary-foreground hover:bg-accent"
                        }`}
                >
                    {label}
                </Button>
            ))}
        </div>
    );
}
