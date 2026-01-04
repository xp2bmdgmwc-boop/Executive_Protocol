import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import MasterPage from './MasterPage';

const App: React.FC = () => {
  return (
    <>
      <MasterPage />
      <Analytics />
    </>
  );
};

export default App;