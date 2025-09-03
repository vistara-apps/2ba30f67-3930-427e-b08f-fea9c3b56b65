import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';

export async function GET(request: NextRequest) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1f3a, #2d1b69)',
            fontSize: 32,
            fontWeight: 600,
            color: 'white',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #3b82f6, #f97316)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              🎵
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold' }}>
                Stemsync Studio
              </div>
              <div
                style={{
                  fontSize: '24px',
                  color: '#a1a1aa',
                  fontWeight: 400,
                }}
              >
                Remix the world, one stem at a time
              </div>
            </div>
          </div>
          
          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '30px',
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '6px',
                  height: `${Math.random() * 60 + 20}px`,
                  background: 'linear-gradient(to top, #3b82f6, #f97316)',
                  borderRadius: '3px',
                }}
              />
            ))}
          </div>
          
          <div
            style={{
              fontSize: '20px',
              color: '#d1d5db',
              textAlign: 'center',
              maxWidth: '600px',
            }}
          >
            AI-powered stem separation and intuitive mixing tools for creators
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
