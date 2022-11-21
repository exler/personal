import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
    slug: string
    data: {
        title: string
        date: string
        description: string
        image: string
        categories: string[]
    }
}

export const getPost = (slug: string) => {
    const fileContents = fs.readFileSync(path.join('posts', `${slug}.mdx`), "utf8");
    const { data, content } = matter(fileContents);
    return {
        data,
        content,
    } as { data: Post, content: string }
};

export const getPosts = () => {
    const files = fs.readdirSync(path.join("posts"));
    const allPostsData = files.map((fileName) => {
        const slug = fileName.replace(".mdx", "");
        const fileContents = fs.readFileSync(
            path.join('posts', `${slug}.mdx`),
            "utf8"
        );
        const { data } = matter(fileContents);
        return {
            slug,
            data,
        };
    });

    return allPostsData as Post[];
};

