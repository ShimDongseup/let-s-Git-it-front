import React from 'react';
import { RWebShare } from 'react-web-share';

const Share = () => {
  return (
    <div>
      <RWebShare
        data={{
          text: 'Like humans, flamingos make friends for life',
          url: 'https://on.natgeo.com/2zHaNup',
          title: 'Flamingos',
        }}
        onClick={() => console.log('shared successfully!')}
      >
        <button>Share 🔗</button>
      </RWebShare>
    </div>
  );
};

export default Share;
