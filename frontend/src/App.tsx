import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.page'));

function App() {
  const fallbackComponent = () => <div>Loading...</div>;

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Suspense fallback={fallbackComponent}>
            <HomePage />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
