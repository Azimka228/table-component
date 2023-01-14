import {AppThunk} from './store';
import {productsAPI} from '../api/api';
import {setProductsDataAC} from './products-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  initialized: false,
};

type InitialStateType = typeof initialState;

export type AppReducerActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setInitializedValueAppAC>;

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppReducerActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status};
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
export const setAppStatusAC = (status: RequestStatusType) =>
  ({type: 'APP/SET-STATUS', status} as const);
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
        console.log(e);
      })
      .finally(() => {
        dispatch(setInitializedValueAppAC(true));
      });
  };
};
