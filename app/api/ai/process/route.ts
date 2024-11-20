import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { query } = await req.json()

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an API assistant. Convert natural language to REST API requests. Return response in JSON format with method, url, headers, and body if applicable.'
        },
        {
          role: 'user',
          content: query
        }
      ],
      model: 'gpt-4-turbo-preview',
      response_format: { type: "json_object" }
    })

    const response = completion.choices[0].message.content

    return NextResponse.json({ 
      success: true,
      data: JSON.parse(response || '{}')
    })
    
  } catch (error) {
    console.error('AI Processing error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process AI request' },
      { status: 500 }
    )
  }
} 