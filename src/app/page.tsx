'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';  // Updated import path
import SearchResults from '@/components/SearchResults';  // Updated import path

// Define the SearchResult type
export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source?: string;
  timestamp?: string;
}

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = (results: SearchResult[]) => {
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">IT Solutions Finder</h1>
          <p className="mt-2 text-gray-600">Find solutions to technical problems quickly</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <SearchBar onSearch={handleSearch} />
          <SearchResults results={searchResults} />
        </div>
      </main>
    </div>
  );
}
