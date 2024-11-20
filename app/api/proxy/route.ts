import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { url, method, headers, data } = body

    const cleanHeaders = { ...headers }
    delete cleanHeaders['host']
    delete cleanHeaders['origin']

    const response = await fetch(url, {
      method,
      headers: cleanHeaders,
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    })

    const responseData = await response.json()

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: responseData
    })

  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        status: 500,
        statusText: 'Error',
        headers: {},
        data: null
      },
      { status: 500 }
    )
  }
} 