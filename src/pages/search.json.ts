import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');

  const index = posts.map(post => ({
    slug: post.slug,
	url: `/zynith/blog/${post.id.replace(/\.(md|mdx)$/, '')}`,
    title: post.data.title,
    description: post.data.description ?? '',
    tags: post.data.tags ?? [],
    body: post.body.replace(/[#*`\[\]()!>_~]/g, ' ').slice(0, 800),
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}

