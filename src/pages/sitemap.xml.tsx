import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function generateSiteMap(posts: any[]) {
  const baseUrl = 'https://yourdomain.com';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- 首页 -->
     <url>
       <loc>${baseUrl}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     
     <!-- 文章页面 -->
     ${posts
       .map((post) => {
         return `
       <url>
           <loc>${baseUrl}/posts/${post.slug}</loc>
           <lastmod>${new Date(post.date).toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.80</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // 获取所有文章
  const postsDir = path.join(process.cwd(), 'content/posts');
  const filenames = fs.readdirSync(postsDir);
  
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    return {
      slug: filename.replace(/\.md$/, ''),
      date: data.date ? data.date.toString() : new Date().toISOString(),
    };
  });

  // 生成 sitemap
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;