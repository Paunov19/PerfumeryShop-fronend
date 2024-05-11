import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPerfumes } from "../services/PerfumeServiceService";
import PerfumeCard from "./cards/PerfumeCardCard";

const PerfumeContainer = () => {
    const perfumesQuery = useQuery({
        queryKey: ["perfumes"],
        queryFn: getAllPerfumes
    });

    let perfumes = null;

    if (perfumesQuery.data) {
        perfumes = Object.keys(perfumesQuery.data).map((key) => {
            return <PerfumeCard key={key} details={perfumesQuery.data[key]} />;
        });
    }

    return { perfumes };
};

export default PerfumeContainer;
