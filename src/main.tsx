import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CREDITS_VIDEO, INTRO_VIDEO } from './media.ts';
import { preloadVideos } from './preload.ts';

void preloadVideos([INTRO_VIDEO, CREDITS_VIDEO]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<App />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
