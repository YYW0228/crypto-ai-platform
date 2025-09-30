import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Crypto x AI 学习平台</title>
        <meta name="description" content="学习量化交易、AI Agent 开发和 Web3 技术，摆脱信息茧房" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            欢迎来到 Crypto x AI 学习平台
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            学习量化交易、AI Agent 开发和 Web3 技术，摆脱信息茧房
          </p>
          <div className="space-x-4">
            <Link href="/posts/2025-09-30-five-lessons" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              阅读首篇文章
            </Link>
            <Link href="#about" className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
              了解更多
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">量化交易</h3>
            <p className="text-gray-600">学习算法交易策略，利用 AI 优化投资决策</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Agent</h3>
            <p className="text-gray-600">构建智能代理，自动化复杂的业务流程</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Web3 技术</h3>
            <p className="text-gray-600">掌握区块链开发，拥抱去中心化未来</p>
          </div>
        </div>
      </Layout>
    </>
  );
}
