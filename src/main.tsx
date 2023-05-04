import { createRoot } from 'react-dom/client';
import { App } from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(<App />);
