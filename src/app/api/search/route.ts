export async function POST(request: Request) {
  if (!process.env.TAVILY_API_KEY) {
    return Response.json(
      { error: 'Tavily API key not configured' },
      { status: 500 }
    );
  }

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
      throw new Error(`Tavily API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Tavily API response:', data); // Debug log
    return Response.json(data);
  } catch (error) {
    console.error('Search error:', error);
    return Response.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}