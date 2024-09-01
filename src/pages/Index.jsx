import HackerNews from '../components/HackerNews';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-300 to-orange-400">
      <div className="container mx-auto p-4">
        <header className="py-8 mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-orange-600 mb-2">Hacker News Top 100</h1>
          <p className="text-xl text-gray-600">Stay updated with the latest tech stories</p>
        </header>
        <HackerNews />
      </div>
    </div>
  );
};

export default Index;