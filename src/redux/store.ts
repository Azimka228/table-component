import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer, AppReducerActionsType} from './app-reducer';
import {productsReducer, ProductsReducerActionsType} from './products-reducer';

const rootReducer = combineReducers({
  app: appReducer,
  products: productsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const UseAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

export const useAppDispatch: () => ThunkDispatch<
  AppRootStateType,
  any,
  AnyAction
> = useDispatch;
export type AppActionsType = AppReducerActionsType | ProductsReducerActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>;
