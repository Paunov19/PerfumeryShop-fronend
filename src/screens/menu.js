import { Screen } from "../components/Screen";
import React from "react";
import PerfumeCard from "../components/cards/PerfumeCard";
import { GetAllPerfumesQuery } from "../services/PerfumeService";
import menuBackgroundImage from "../assets/img/menu_background.jpg";

export default function MenuScreen() {
    const { data, isLoading, isError } = GetAllPerfumesQuery();

    if (isLoading) {
        return <h1>...Loading</h1>;
    }
    if (isError || !data) {
        return <h1>Perfume not found</h1>;
    }

    const perfumes = Object.keys(data).map((key) => data[key]);

    console.log(perfumes);

    return (
        <Screen>
            <div className="overflow-hidden">
                <div
                    className="min-h-screen flex flex-col items-center justify-center"
                    style={{
                        backgroundImage: `url(${menuBackgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%"
                    }}
                >
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-24">
                            {perfumes.map((perfume) => (
                                <PerfumeCard
                                    key={perfume.id}
                                    details={perfume}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Screen>
    );
}
