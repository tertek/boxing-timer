import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NowPlayingContextProvider } from 'react-nowplaying';

import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NowPlayingContextProvider>
      <App />
    </NowPlayingContextProvider>
  </StrictMode>
);
