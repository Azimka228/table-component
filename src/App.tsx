import React, {useEffect} from 'react';
import s from './App.module.css';
import {TableComponent} from './components/table-component';
import {useAppDispatch, UseAppSelector} from './redux/store';
import {initializedAppTC} from './redux/app-reducer';
import {CircularProgress} from '@mui/material';
import {ErrorSnackbar} from './components/errorSnackbar/error-snackbar';
import {ColumnValuesType} from './components/table/tableHeadCustom/table-head-cell';

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

  const columns: Array<ColumnValuesType> = [
    {
      field: 'title',
      headerName: 'Title',
      width: 40,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 140,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 30,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      type: 'number',
      sortable: false,
      width: 30,
    },
  ];

  return (
    <div className={s.App}>
      <ErrorSnackbar />
      <TableComponent originalRows={productsData} columns={columns} />
    </div>
  );
}

export default App;
