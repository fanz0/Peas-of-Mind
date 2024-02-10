import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const API_KEY = "a9ae644839294aaf81ed45567b9dcf3c"

// Action
export const fetchRecipes = createAsyncThunk("fetchRecipes", async () => {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&diet=vegetarian&number=60`)
    return response.json()
})

export const recipeSlice = createSlice ({
    name: "recipe",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecipes.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchRecipes.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchRecipes.rejected, (state, action) => {
            console.log("Error", action.payload)
            state.isError = true
        })
    },
    reducers: {
        updateData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const {updateData} = recipeSlice.actions
export default recipeSlice.reducer