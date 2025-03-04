import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

export type PostMetadata = {
    title: string;
    keywords: string[];
    date: Date | null;
};

async function getPostDataFromFile(fileContent: string): Promise<{ content: string; metadata: PostMetadata }> {
    // Use gray-matter to parse the frontmatter and separate the content from it
    const { content, data } = matter(fileContent);

    // Use remark to convert markdown into HTML
    const processedContent = await unified().use(remarkParse).use(remarkHtml).process(content);

    return {
        content: processedContent.toString(),
        metadata: {
            title: data.title || "No title",
            keywords: data.keywords || [],
            date: data.date ? new Date(data.date) : null,
        },
    };
}

export async function getPosts() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const postsDirectory = path.join(__dirname, "../content");
    const fileNames = fs
        .readdirSync(postsDirectory, { withFileTypes: true })
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name);

    const posts = await Promise.all(
        fileNames.map(async (fileName) => {
            // Remove ".md" from file name to get the slug
            const slug = fileName.replace(/\.md$/, "");

            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");

            const { metadata } = await getPostDataFromFile(fileContents);
            return { slug, ...metadata };
        }),
    );

    // Sort posts by date
    return posts.sort((a, b) => {
        if (a.date && b.date) {
            return a.date < b.date ? 1 : -1;
        }

        return a.date ? -1 : b.date ? 1 : 0;
    });
}

export async function getPostBySlug(slug: string) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const postsDirectory = path.join(__dirname, "../content");
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { content, metadata } = await getPostDataFromFile(fileContents);

    return {
        content,
        metadata: { slug, ...metadata },
    };
}
