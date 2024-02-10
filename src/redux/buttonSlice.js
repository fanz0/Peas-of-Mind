import { createSlice } from "@reduxjs/toolkit"

export const buttonSlice = createSlice({
    name: "button",
    initialState: {
        value: true
    },
    reducers: {
        deactivate: (state) => {
            state.value = false
        }
    }
})

export const {deactivate} = buttonSlice.actions

export default buttonSlice.reducer