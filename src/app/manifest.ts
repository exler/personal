import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Kamil Marut",
        short_name: "Kamil Marut",
        start_url: "/",
        theme_color: "#eab308",
        background_color: "#070000",
        display: "standalone",
        icons: [
            { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
            { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
        ]
    };
}
