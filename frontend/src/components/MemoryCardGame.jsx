import React from 'react';
import Layout from './Layout';

const MemoryCardGame = () => {
  return (
    <Layout>
      <div className="h-full w-full">
        <iframe
          src="https://financial-game.vercel.app/memory-game/memory-game.html"
          className="h-full w-full"
          title="Memory Card Game"
          frameBorder="0"
        />
      </div>
    </Layout>
  );
}

export default MemoryCardGame;
