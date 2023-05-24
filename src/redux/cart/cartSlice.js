import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    hidden: true,
    cartItems: []
};


const existingCartItems = (cartItems, cartItemToAdd) => {
    return cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
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
            prepare(cartItems, item) {
                const existingCartItem = existingCartItems(cartItems, item)
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