'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }: { onSearch: (results: any[]) => void }) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      onSearch(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to perform search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            className="w-full pl-12 pr-24 py-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors"
            placeholder="Describe your technical issue or paste an error message..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 text-sm">
          <select className="px-3 py-2 border rounded-md text-gray-600 bg-white">
            <option value="">All Sources</option>
            <option value="stackoverflow">Stack Overflow</option>
            <option value="github">GitHub</option>
            <option value="docs">Documentation</option>
          </select>

          <select className="px-3 py-2 border rounded-md text-gray-600 bg-white">
            <option value="">Any Time</option>
            <option value="day">Last 24 Hours</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>

          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span>Include Code Examples</span>
          </label>
        </div>
      </form>
    </div>
  );
}