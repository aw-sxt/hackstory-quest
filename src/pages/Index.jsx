import HackerNews from '../components/HackerNews';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Top 100 Hacker News Stories</h1>
        <HackerNews />
      </div>
    </div>
  );
};

export default Index;
