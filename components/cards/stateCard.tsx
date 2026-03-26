'use client'
import { useState } from "react";
import { Button } from "../ui/Button";

interface State {
    name: string;
    slug: string;
    description: string;
    image?: string;
}

interface StateCardProps {
    states: State[];
}

const StateCard = ({ states }: StateCardProps) => {
    const [showMore, setShowMore] = useState(false);
    const displayedStates = showMore ? states : states.slice(0, 6);

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {displayedStates.map((state, index) => {
                    // Array of color schemes for state cards
                    const colorSchemes = [
                        { bg: "bg-blue-50", border: "border-blue-100", hoverBorder: "hover:border-blue-300", textColor: "text-blue-600", hoverTextColor: "group-hover:text-blue-600", shadowHover: "hover:shadow-blue-100" },
                        { bg: "bg-green-50", border: "border-green-100", hoverBorder: "hover:border-green-300", textColor: "text-green-600", hoverTextColor: "group-hover:text-green-600", shadowHover: "hover:shadow-green-100" },
                        { bg: "bg-purple-50", border: "border-purple-100", hoverBorder: "hover:border-purple-300", textColor: "text-purple-600", hoverTextColor: "group-hover:text-purple-600", shadowHover: "hover:shadow-purple-100" },
                        { bg: "bg-orange-50", border: "border-orange-100", hoverBorder: "hover:border-orange-300", textColor: "text-orange-600", hoverTextColor: "group-hover:text-orange-600", shadowHover: "hover:shadow-orange-100" },
                        { bg: "bg-pink-50", border: "border-pink-100", hoverBorder: "hover:border-pink-300", textColor: "text-pink-600", hoverTextColor: "group-hover:text-pink-600", shadowHover: "hover:shadow-pink-100" },
                        { bg: "bg-indigo-50", border: "border-indigo-100", hoverBorder: "hover:border-indigo-300", textColor: "text-indigo-600", hoverTextColor: "group-hover:text-indigo-600", shadowHover: "hover:shadow-indigo-100" },
                        { bg: "bg-yellow-50", border: "border-yellow-100", hoverBorder: "hover:border-yellow-300", textColor: "text-yellow-600", hoverTextColor: "group-hover:text-yellow-600", shadowHover: "hover:shadow-yellow-100" },
                        { bg: "bg-red-50", border: "border-red-100", hoverBorder: "hover:border-red-300", textColor: "text-red-600", hoverTextColor: "group-hover:text-red-600", shadowHover: "hover:shadow-red-100" },
                        { bg: "bg-teal-50", border: "border-teal-100", hoverBorder: "hover:border-teal-300", textColor: "text-teal-600", hoverTextColor: "group-hover:text-teal-600", shadowHover: "hover:shadow-teal-100" },
                        { bg: "bg-cyan-50", border: "border-cyan-100", hoverBorder: "hover:border-cyan-300", textColor: "text-cyan-600", hoverTextColor: "group-hover:text-cyan-600", shadowHover: "hover:shadow-cyan-100" }
                    ];

                    const colors = colorSchemes[index % colorSchemes.length];

                    return (
                        <div
                            key={state.slug || index}
                            className={`group relative ${colors.bg} border ${colors.border} rounded-3xl overflow-hidden shadow-sm ${colors.shadowHover} ${colors.hoverBorder} transition-all duration-500 hover:shadow-lg`}
                        >
                            <div className="p-4 lg:p-6">
                                <h3 className={`text-xl font-black text-black mb-2 flex items-center justify-between ${colors.hoverTextColor} transition-colors`}>
                                    {state.name}
                                </h3>

                                <div
                                    className="text-sm text-black/60 leading-relaxed line-clamp-3 mb-4"
                                    dangerouslySetInnerHTML={{ __html: state.description }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center mt-6">
                <Button
                    onClick={handleShowMore}
                    variant="outline"
                    className="px-8 w-full md:w-fit"
                >
                    {showMore ? "Show top States" : "Show All States"}
                </Button>
            </div>
        </>
    );
};

export default StateCard;