import React, {useEffect} from 'react';
import s from './App.module.css';
import {TableComponent} from './components/table-component';
import {useAppDispatch, UseAppSelector} from './redux/store';
import {initializedAppTC} from './redux/app-reducer';
import {CircularProgress} from '@mui/material';

function App() {
  const isInitialized = UseAppSelector(state => state.app.initialized);
  const productsData = UseAppSelector(state => state.products);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializedAppTC());
  }, []);

  if (!isInitialized) {
    return (
      <div className={s.CircularProgress}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={s.App}>
      <TableComponent originalRows={productsData} />
    </div>
  );
}

export default App;
