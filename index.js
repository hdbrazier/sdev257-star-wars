import { registerRootComponent } from 'expo';
import App from './App';

// Register for native environments (Expo Go/dev client)
registerRootComponent(App);

// Also default-export for Snack/Web's loader
export default App;
