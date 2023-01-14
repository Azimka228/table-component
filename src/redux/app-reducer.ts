import {AppThunk} from './store';
import {productsAPI} from '../api/api';
import {setProductsDataAC} from './products-reducer';

const initialState = {
  error: null as null | string,
  initialized: false,
};

type InitialStateType = typeof initialState;

export type AppReducerActionsType =
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setInitializedValueAppAC>;

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppReducerActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR':
      return {...state, error: action.error};
    case 'APP/SET-INITIALIZED':
      return {...state, initialized: action.value};
    default:
      return state;
  }
};

// ACTION CREATORS
export const setAppErrorAC = (error: string | null) =>
  ({type: 'APP/SET-ERROR', error} as const);
export const setInitializedValueAppAC = (value: boolean) =>
  ({type: 'APP/SET-INITIALIZED', value} as const);

// THUNK CREATORS
export const initializedAppTC = (): AppThunk => {
  return dispatch => {
    productsAPI
      .getProducts()
      .then(res => {
        dispatch(setProductsDataAC(res.data.products));
      })
      .catch(e => {
        const error = e.message;
        dispatch(setAppErrorAC(error));
      })
      .finally(() => {
        dispatch(setInitializedValueAppAC(true));
      });
  };
};
