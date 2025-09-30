import { GetServerSideProps } from 'next';

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# 主要 sitemap
Sitemap: https://yourdomain.com/sitemap.xml

# 禁止抓取的目录
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# SEO 友好的抓取延迟
Crawl-delay: 1`;
}

function RobotsTxt() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robotsTxt = generateRobotsTxt();

  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
};

export default RobotsTxt;