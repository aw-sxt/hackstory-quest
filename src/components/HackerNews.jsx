import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, ThumbsUp, Search } from 'lucide-react';

const fetchHNStories = async (searchTerm = '') => {
  const response = await fetch(`https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=100&query=${searchTerm}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const HackerNews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['hnStories', searchTerm],
    queryFn: () => fetchHNStories(searchTerm),
  });

  if (error) return <div className="text-red-500 text-center py-4">An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border-2 border-blue-300 rounded-full focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, index) => (
            <Card key={index} className="w-full h-40 animate-pulse bg-blue-100 rounded-lg shadow-md" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.hits.map((story) => (
            <Card key={story.objectID} className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2">{story.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-3 flex items-center">
                  <ThumbsUp className="mr-2 text-blue-500" size={16} />
                  {story.points} upvotes
                </p>
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 flex items-center font-medium"
                >
                  Read more <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HackerNews;