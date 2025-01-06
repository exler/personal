"use client";

import maplibregl, { type ExpressionSpecification } from "maplibre-gl";
import type React from "react";
import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { twMerge } from "tailwind-merge";

type CountryHighlight = {
    countryId: string;
    color: string;
};

type WorldMapProps = {
    apiKey: string; // MapTiler API key
    className?: string;
};

const HOMELAND_COLOR = "#FFA500";
const VISITED_COLOR = "#FFEB3B";

export default function WorldMap({ apiKey, className }: WorldMapProps) {
    // Reference to the HTML element where the map will be mounted
    const mapContainer = useRef<HTMLDivElement>(null);
    // Reference to store the map instance
    const map = useRef<maplibregl.Map | null>(null);

    const highlightedCountries: CountryHighlight[] = [
        { countryId: "PL", color: HOMELAND_COLOR },
        { countryId: "DE", color: VISITED_COLOR },
        { countryId: "FR", color: VISITED_COLOR },
        { countryId: "MC", color: VISITED_COLOR },
        { countryId: "NL", color: VISITED_COLOR },
        { countryId: "BE", color: VISITED_COLOR },
        { countryId: "CZ", color: VISITED_COLOR },
        { countryId: "AT", color: VISITED_COLOR },
        { countryId: "GR", color: VISITED_COLOR },
        { countryId: "IT", color: VISITED_COLOR },
        { countryId: "MT", color: VISITED_COLOR },
        { countryId: "PT", color: VISITED_COLOR },
        { countryId: "TH", color: VISITED_COLOR },
        { countryId: "JP", color: VISITED_COLOR },
        { countryId: "ID", color: VISITED_COLOR },
        { countryId: "EG", color: VISITED_COLOR },
        { countryId: "NO", color: VISITED_COLOR },
        { countryId: "ES", color: VISITED_COLOR },
    ];

    useEffect(() => {
        // The container isn't ready
        if (!mapContainer.current) return;

        // Initialize the map only once
        if (map.current) return;

        // Create new map instance
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/toner-v2/style.json?key=${apiKey}`,
            center: [0, 40], // Center the map
            zoom: 1.2,
            // Disable user zooming with the scroll wheel
            scrollZoom: false,
        });

        // Add navigation controls (zoom in/out)
        // map.current.addControl(new maplibregl.NavigationControl());

        // When the map style loads, add our custom styling
        map.current.on("style.load", () => {
            if (!map.current) return;

            // Add country fills
            map.current.addLayer({
                id: "country-fills",
                type: "fill",
                source: {
                    type: "vector",
                    url: `https://api.maptiler.com/tiles/countries/tiles.json?key=${apiKey}`,
                },
                "source-layer": "administrative",
                filter: [
                    "any",
                    ...highlightedCountries.map(({ countryId }) => ["==", ["get", "iso_a2"], countryId]),
                ] as ExpressionSpecification,
                paint: {
                    "fill-color": [
                        "case",
                        // For each highlighted country, create a condition
                        ...highlightedCountries.flatMap(({ countryId, color }) => [
                            ["==", ["get", "iso_a2"], countryId],

                            color,
                        ]),
                        // Unused default
                        "#FFF",
                    ] as ExpressionSpecification,
                    "fill-opacity": 0.8,
                },
            });

            // Add country borders
            map.current.addLayer({
                id: "country-borders",
                type: "line",
                source: {
                    type: "vector",
                    url: `https://api.maptiler.com/tiles/countries/tiles.json?key=${apiKey}`,
                },
                "source-layer": "administrative",
                paint: {
                    "line-color": "#000000",
                    "line-width": 1,
                },
            });
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [apiKey, highlightedCountries.map, highlightedCountries.flatMap]); // Only re-run if apiKey changes

    return <div ref={mapContainer} className={twMerge("rounded-lg overflow-hidden w-full h-80", className)} />;
}
