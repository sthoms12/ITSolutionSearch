'use client';

import { Code, Clock, ThumbsUp } from 'lucide-react';

type SearchResult = {
  title: string;
  url: string;
  snippet: string;
  published_date?: string;
  source?: string;
};

export default function SearchResults({ results }: { results: SearchResult[] }) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {result.title}
              </h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                {result.published_date && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(result.published_date).toLocaleDateString()}
                  </span>
                )}
                {result.source && <span>{result.source}</span>}
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{result.snippet}</p>

          <div className="flex items-center gap-4">
            <a 
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              View Full Solution
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}