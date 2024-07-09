import { redisClient } from '@/services/cache';
import { cookies } from 'next/headers'

export async function GET() {
    const res = await fetch('https://dummyjson.com/posts');
    const data = await res.json()
    redisClient.publish("pubsub", "Hello World");
    console.log("Published"); 
    return Response.json({ data })
} 



export async function POST() {
    const cookieStore = cookies()
    let token = Number(cookieStore.get('token')?.value) || 0;
    
    token++;

    return new Response('Hello, Next.js!', {
        status: 200,
        headers: { 'Set-Cookie': `token=${token}` },
      })
} 
