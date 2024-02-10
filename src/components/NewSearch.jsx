import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateData } from "../redux/recipeSlice"

export const NewSearch = () => {

    const API_KEY = "a9ae644839294aaf81ed45567b9dcf3c"

    const dispatch = useDispatch()

    const [search, setSearch] = useState("")

    function handleChange (e) {
        setSearch(e.target.value)
    }


    function handleSubmit (e) {
        e.preventDefault()
        fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=${API_KEY}&diet=vegetarian&number=100`)
            .then(response => response.json())
            .then(data => dispatch(updateData(data)))
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row w-[95%] max-w-[700px] h-20 md:h-fit items-center justify-between mt-20 mb-10" action="submit">
                <input onChange={handleChange} type="text" className="text-black font-bold p-1 w-full md:w-[90%] rounded-lg focus:outline-none focus:ring-4 focus:ring-green-700"/>
                <button className="p-1 border rounded-lg bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-600">Cerca</button>
            </form>
        </>
    )
}