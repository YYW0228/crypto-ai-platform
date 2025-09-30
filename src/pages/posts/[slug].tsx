import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';

export default function Post({ content, frontMatter }: { content: string; frontMatter: any }) {
  return (
    <>
      <Head>
        <title>{`${frontMatter.title} | Crypto x AI 学习平台`}</title>
        <meta name="description" content={frontMatter.title} />
      </Head>
      <Layout>
        <article className="max-w-4xl mx-auto py-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{frontMatter.title}</h1>
          <p className="text-gray-500 mb-8 text-lg">{frontMatter.date}</p>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown 
              components={{
                ol: ({children}) => <ol className="list-decimal list-inside space-y-3 text-gray-700">{children}</ol>,
                ul: ({children}) => <ul className="list-disc list-inside space-y-3 text-gray-700">{children}</ul>,
                li: ({children}) => <li className="leading-relaxed">{children}</li>
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </article>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), 'content/posts');
  const filenames = fs.readdirSync(postsDir);
  const paths = filenames.map((name) => ({
    params: { slug: name.replace(/\.md$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'content/posts', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  // 确保日期是字符串格式，以避免序列化错误
  const serializedData = {
    ...data,
    date: data.date ? new Date(data.date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : data.date
  };
  
  return { props: { content, frontMatter: serializedData } };
}
