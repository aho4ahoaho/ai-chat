import React from 'react';
import { createRoot } from 'react-dom/client';
import { Main } from './app/main';


const container = document.querySelector('#root');
if (container) {
    const root = createRoot(container);

    root.render(<Main />);
} else {
    throw new Error('Root element not found');
}