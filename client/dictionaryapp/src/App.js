import './App.css';
import HomePage from './component/home';
import { SearchProvider } from './searchContext';


function App() {
  return (
    <div className="App">
      <SearchProvider>
        <HomePage />
      </SearchProvider>
    </div>
  );
}

export default App;
