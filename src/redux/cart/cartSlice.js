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

export const existingCartItem = (selectCartItems, cartItemToAdd) => {
    console.log(selectCartItems);
    return selectCartItems.find(cartItem => cartItem.id === cartItemToAdd.id)

}

const addToCart = (selectCartItems, cartItemToAdd) => {
    if (existingCartItem(selectCartItems, cartItemToAdd)) {
        return selectCartItems.map(
            cartItem =>
                cartItem.id === cartItemToAdd.id ?
                 cartItem.quantity += 1 : cartItem &&
                console.log(cartItem)
                )

    }
    return [...selectCartItems, { ...cartItemToAdd, quantity: 1 }];
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCartHidden: (state) => {
            state.hidden = !state.hidden
        },
        // addItemToCart: (state, action) => {
        //     state.cartItems = addToCart(state.cartItems, action.payload)
        // },
        addItem: {
            reducer(state, action) {
                const { id } = action.payload;
                const existingCartItem = state.cartItems.find((cartItem) => cartItem.id === id);
                if (existingCartItem) {
                    existingCartItem.quantity += 1;
                } else {
                    state.cartItems.push({...action.payload, quantity: 1})
                }
            },
            prepare(item) {
               return {
                    payload: item,
                    }
                }

            },
        removeItem: (state, action) => {
            const existingCartItem = state.cartItems.find((cartItem) => cartItem.id === action.payload.id)
            if (existingCartItem) {
                existingCartItem.quantity -= 1;
            }
            if (existingCartItem.quantity === 0) {
                state.cartItems = state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id)
            }
        },
        clearItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id)
            }
    }

})

export const { toggleCartHidden, addItem, addItemToCart, removeItem, clearItemFromCart } = cartSlice.actions

export default cartSlice.reducer