import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'



const initialState = {
    hidden: true,
    cartItems: []
};


export const selectCart = state => state.cart;
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
  );

  export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
    (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0
    )
  )

  export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
      (accumalatedQuantity, cartItem) => accumalatedQuantity +  cartItem.quantity * cartItem.price, 0
    )
  )

  export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
  )
export const existingCartItems = (cartItems, cartItemToAdd) => {
    return cartItems.find(
        (cartItem) => cartItem.id === cartItemToAdd.id
        )
    }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCartHidden: (state) => {
            state.hidden = !state.hidden
        },
        addItem: {
            reducer(state, action) {
            state.cartItems.push(action.payload)
            },
            prepare(item) {
                const existingCartItem = initialState.cartItems.find(cartItem => cartItem.id === item.id)
                if (existingCartItem) {
                    return {
                        payload: {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                }
                return {
                    payload: {
                        ...item,
                        quantity: 1
                    }
                }

            }

        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id)
        },
        clearItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id)
            }
    }

})

export const { toggleCartHidden, addItem, removeItem, clearItemFromCart } = cartSlice.actions

export default cartSlice.reducer