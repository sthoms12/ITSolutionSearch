export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TAVILY_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        search_depth: "comprehensive",
        include_answer: true,
        include_domains: [
          "stackoverflow.com",
          "github.com",
          "docs.microsoft.com"
        ]
      }),
    });

    if (!response.ok) {
      throw new Error('Search failed');
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Search error:', error);
    return Response.json({ error: 'Search failed' }, { status: 500 });
  }
}
