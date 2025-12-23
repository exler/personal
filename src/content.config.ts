import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writing = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content" }),
    schema: z.object({
        title: z.string(),
        date: z.date().optional(),
        keywords: z.array(z.string()).optional(),
    }),
});

export const collections = { writing };
