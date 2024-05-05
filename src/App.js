import './App.css';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
    {/* <Provider> */}
      <AppRoutes />
    {/* </Provider> */}
  </BrowserRouter>
  );
}

export default App;
