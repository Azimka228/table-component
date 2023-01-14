import {ProductType} from '../api/api';

const initialState: Array<ProductType> = [
  {
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: [''],
  },
];

type InitialStateType = typeof initialState;

export type ProductsReducerActionsType = ReturnType<typeof setProductsDataAC>;

export const productsReducer = (
  state: InitialStateType = initialState,
  action: ProductsReducerActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'PRODUCT/SET-PRODUCTS-DATA':
      return action.data;
    default:
      return state;
  }
};

// ACTION CREATORS
export const setProductsDataAC = (data: Array<ProductType>) =>
  ({type: 'PRODUCT/SET-PRODUCTS-DATA', data} as const);
