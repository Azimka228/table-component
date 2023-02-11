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
      sortable: true,
      width: 10,
    },
    {
      field: 'description',
      headerName: 'Description',
      sortable: true,
      width: 10,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      type: 'string',
      sortable: false,
      width: 30,
    },
    {
      field: 'price',
      headerName: 'Price',
      sortable: false,
      width: 10,
    },
  ];


  return (
    <div className={s.App}>
      <ErrorSnackbar />
      <TableComponent
        initialRows={productsData}
        columns={columns}
        rowsPerPageOptions={[3, 7, 10]}
        searchBy={'title'}
      />
    </div>
  );
}

export default App;
