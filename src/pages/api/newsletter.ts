import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    // 根据配置选择邮件服务提供商
    const provider = process.env.EMAIL_PROVIDER || 'mailchimp'; // 默认使用 Mailchimp
    
    if (provider === 'mailchimp') {
      await subscribeToMailchimp(email);
    } else if (provider === 'beehiiv') {
      await subscribeToBeehiiv(email);
    } else if (provider === 'local') {
      await saveToLocalDatabase(email);
    }

    return res.status(200).json({ 
      message: 'Successfully subscribed!',
      email: email 
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ 
      message: 'Subscription failed. Please try again.' 
    });
  }
}

// Mailchimp 集成
async function subscribeToMailchimp(email: string) {
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX || 'us1';

  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) {
    throw new Error('Mailchimp configuration missing');
  }

  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
      tags: ['crypto-ai-platform', 'website-signup']
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Mailchimp error: ${error.detail || 'Unknown error'}`);
  }

  return response.json();
}

// Beehiiv 集成
async function subscribeToBeehiiv(email: string) {
  const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
  const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
    throw new Error('Beehiiv configuration missing');
  }

  const url = `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      reactivate_existing: false,
      send_welcome_email: true,
      utm_source: 'website',
      utm_medium: 'newsletter_signup'
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Beehiiv error: ${error.message || 'Unknown error'}`);
  }

  return response.json();
}

// 本地数据库存储（用于开发或简单场景）
async function saveToLocalDatabase(email: string) {
  // 这里可以集成到 Supabase、PlanetScale 或其他数据库
  // 当前为演示目的，使用简单的文件存储
  
  const fs = require('fs').promises;
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'data', 'subscribers.json');
    
    // 确保目录存在
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    
    let subscribers = [];
    try {
      const data = await fs.readFile(filePath, 'utf8');
      subscribers = JSON.parse(data);
    } catch (error) {
      // 文件不存在，创建新数组
      subscribers = [];
    }
    
    // 检查邮箱是否已存在
    const existingSubscriber = subscribers.find((sub: any) => sub.email === email);
    if (existingSubscriber) {
      throw new Error('Email already subscribed');
    }
    
    // 添加新订阅者
    subscribers.push({
      email: email,
      subscribed_at: new Date().toISOString(),
      source: 'website',
      status: 'active'
    });
    
    await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2));
    
    return { success: true, email: email };
  } catch (error) {
    throw new Error(`Local storage error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Supabase 集成示例（如果使用 Supabase）
async function subscribeToSupabase(email: string) {
  const { createClient } = require('@supabase/supabase-js');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase configuration missing');
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([
      {
        email: email,
        subscribed_at: new Date().toISOString(),
        source: 'website',
        status: 'active'
      }
    ]);
  
  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }
  
  return data;
}