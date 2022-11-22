import fs from 'fs'
import path from 'path'
import RSS from 'rss'
import { getPosts } from './posts'
import { parse } from 'date-fns'

export async function generateRSSFeed() {
    const feedOptions = {
        title: 'Kamil Marut - Blog',
        description: 'Software engineer specializing in development of high-performance and maintainable digital products.',
        site_url: 'https://kamilmarut.com/',
        feed_url: 'https://kamilmarut.com/rss.xml',
        image_url: 'https://kamilmarut.com/thumbnail.png',
        pubDate: new Date(),
        copyright: `All rights reserved ${new Date().getFullYear()}, Kamil Marut`,
    };
    const feed = new RSS(feedOptions);

    const posts = getPosts();
    posts.map((post) => {
        feed.item({
            title: post.data.title,
            description: post.data.description,
            url: `https://kamilmarut.com/blog/${post.slug}`,
            date: parse(post.data.date, 'do MMMM, yyyy', new Date()),
        })
    })

    fs.writeFileSync(path.join('public', 'rss.xml'), feed.xml({ indent: true }));
}
