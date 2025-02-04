import React, { useEffect } from 'react'
import { store } from './Redux/store';
import { Provider } from 'react-redux';
import TaskManager from './Components/TaskManager';
import { Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';


const App: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/create-tasks');
    }
  }, [location.pathname, navigate]);
  return (
    <React.Fragment>
      <Provider store={store}>
        <Toaster position='top-center' richColors />
        <TaskManager />
      </Provider>
    </React.Fragment>
  )
}

export default App
