import { useState, useEffect } from 'react';

// 参考CoinDesk、CoinTelegraph的实时价格组件
interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
}

export const PriceWidget = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // 使用CoinGecko免费API
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano,solana&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();
        
        const formattedPrices: CryptoPrice[] = [
          {
            symbol: 'BTC',
            price: data.bitcoin.usd,
            change24h: data.bitcoin.usd_24h_change || 0,
            changePercent24h: data.bitcoin.usd_24h_change || 0
          },
          {
            symbol: 'ETH',
            price: data.ethereum.usd,
            change24h: data.ethereum.usd_24h_change || 0,
            changePercent24h: data.ethereum.usd_24h_change || 0
          },
          {
            symbol: 'BNB',
            price: data.binancecoin.usd,
            change24h: data.binancecoin.usd_24h_change || 0,
            changePercent24h: data.binancecoin.usd_24h_change || 0
          },
          {
            symbol: 'ADA',
            price: data.cardano.usd,
            change24h: data.cardano.usd_24h_change || 0,
            changePercent24h: data.cardano.usd_24h_change || 0
          },
          {
            symbol: 'SOL',
            price: data.solana.usd,
            change24h: data.solana.usd_24h_change || 0,
            changePercent24h: data.solana.usd_24h_change || 0
          }
        ];
        
        setPrices(formattedPrices);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch prices:', error);
        setLoading(false);
      }
    };

    fetchPrices();
    // 每30秒更新一次价格
    const interval = setInterval(fetchPrices, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg">📊</span>
          <h3 className="font-semibold text-gray-900">实时行情</h3>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">📊</span>
          <h3 className="font-semibold text-gray-900">实时行情</h3>
        </div>
        <span className="text-xs text-gray-500">30s刷新</span>
      </div>
      
      <div className="space-y-3">
        {prices.map((crypto) => (
          <div key={crypto.symbol} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 text-sm">{crypto.symbol}</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900 text-sm">
                ${crypto.price.toLocaleString(undefined, { 
                  minimumFractionDigits: 2,
                  maximumFractionDigits: crypto.price > 1 ? 2 : 6 
                })}
              </div>
              <div className={`text-xs ${
                crypto.changePercent24h >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {crypto.changePercent24h >= 0 ? '+' : ''}
                {crypto.changePercent24h.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          数据来源：CoinGecko API
        </p>
      </div>
    </div>
  );
};

// 简化版横幅价格组件（类似CoinDesk顶部）
export const PriceBanner = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();
        
        setPrices([
          {
            symbol: 'BTC',
            price: data.bitcoin.usd,
            change24h: data.bitcoin.usd_24h_change || 0,
            changePercent24h: data.bitcoin.usd_24h_change || 0
          },
          {
            symbol: 'ETH',
            price: data.ethereum.usd,
            change24h: data.ethereum.usd_24h_change || 0,
            changePercent24h: data.ethereum.usd_24h_change || 0
          }
        ]);
      } catch (error) {
        console.error('Failed to fetch banner prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // 每分钟更新
    
    return () => clearInterval(interval);
  }, []);

  if (prices.length === 0) return null;

  return (
    <div className="bg-gray-900 text-white py-2 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {prices.map((crypto) => (
            <div key={crypto.symbol} className="flex items-center space-x-2 text-sm">
              <span className="font-medium">{crypto.symbol}</span>
              <span>${crypto.price.toLocaleString()}</span>
              <span className={crypto.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                {crypto.changePercent24h >= 0 ? '+' : ''}
                {crypto.changePercent24h.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
        <div className="hidden md:block text-xs text-gray-400">
          实时更新 • CoinGecko
        </div>
      </div>
    </div>
  );
};