import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    site: "https://kamilmarut.com",
    integrations: [tailwind()],
    prefetch: true
});
