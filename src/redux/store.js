import { configureStore } from "@reduxjs/toolkit"
import recipeReducer from "./recipeSlice"
import buttonReducer from "./buttonSlice"

export default configureStore ({
    reducer: {
        recipe: recipeReducer,
        button: buttonReducer,
    }
})