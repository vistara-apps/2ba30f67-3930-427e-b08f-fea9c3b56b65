import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { buttonIndex } = body.untrustedData;

    // Handle different frame actions
    switch (buttonIndex) {
      case 1: // Start Remixing
        return new NextResponse(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/og/upload" />
              <meta property="fc:frame:button:1" content="Upload Audio" />
              <meta property="fc:frame:button:2" content="Browse Library" />
              <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/frame/upload" />
            </head>
            <body>
              <p>Upload your audio file to start remixing!</p>
            </body>
          </html>
        `, {
          headers: {
            'Content-Type': 'text/html',
          },
        });

      default:
        return new NextResponse(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/og" />
              <meta property="fc:frame:button:1" content="Start Remixing" />
              <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/frame" />
            </head>
            <body>
              <p>Welcome to Stemsync Studio!</p>
            </body>
          </html>
        `, {
          headers: {
            'Content-Type': 'text/html',
          },
        });
    }
  } catch (error) {
    console.error('Frame error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/og" />
        <meta property="fc:frame:button:1" content="Start Remixing" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/frame" />
      </head>
      <body>
        <p>Welcome to Stemsync Studio!</p>
      </body>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
