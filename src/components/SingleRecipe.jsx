import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import uniqid from "uniqid"

export const SingleRecipe = () => {
    const {recipeID} = useParams()
    const recipe = useSelector(state => state.recipe.data.results.filter(value => value.id == recipeID)[0])
    const API_KEY = "a9ae644839294aaf81ed45567b9dcf3c"

    const [active, setActive] = useState(true)
    const [ingredients, setIngredients] = useState([])
    const [nutrients, setNutrients] = useState([])
    const [instructions, setInstructions] = useState()

    if (!recipe) {
        return <h1 className="mt-20 text-center">Ops! Sembra che la ricetta non esista...</h1>
    }


    function handleClick () {
        fetch(`https://api.spoonacular.com/recipes/${recipeID}/ingredientWidget.json?apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => setIngredients(data.ingredients))
        
        fetch(`https://api.spoonacular.com/recipes/${recipeID}/nutritionWidget.json?apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => setNutrients(data))
        
            fetch(`https://api.spoonacular.com/recipes/${recipeID}/analyzedInstructions?apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => setInstructions(data.map(item => item.steps)[0]))
        setActive(false)
    }


    return(
        <div className="flex flex-col items-center my-10">
            <div className="shadow-lg shadow-green-500 rounded-lg p-5 flex flex-col gap-10 items-center w-[90%] max-w-[1000px]">
                <h1 className="text-center font-bold">{recipe.title}</h1>
                <img className="rounded-xl" src={recipe.image} alt={`${recipe.title}-image`} />
                {active == true && <button onClick={handleClick} className="border rounded-lg bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-600 p-2 uppercase">Scopri di più</button>}
                {active == false && <div className="grid grid-cols1 sm:grid-cols-3 justify-items-center gap-10 w-full">
                    
                    <div className="w-[90%] flex flex-col items-center gap-5 bg-green-700/10 p-5 rounded-lg">
                        <h2 className="text-center font-mono bg-green-500/30 w-full">Ingredienti</h2>
                        <ul className="list-disc flex flex-col gap-7 items-center">
                        {ingredients.map((item, index) => (
                                    <li className="flex flex-col items-center justify-around" key={index}>
                                        <h3 className="text-center">{item.name} {item.amount.metric.value}{item.amount.metric.unit}</h3>
                                        <img className="w-20 rounded-lg mt-5" src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`} alt={`${item.name}-image`}/>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div className="w-[90%] flex flex-col items-center gap-5 bg-green-700/10 p-5 rounded-lg">
                        <h2 className="text-center font-mono bg-green-500/30 w-full">Macro Nutrienti</h2>
                        <ul className="list-disc flex flex-col gap-20">
                            {nutrients && <>
                            <li key={uniqid()}>
                                <h3 className="font-bold">Calorie</h3>
                                <p>{nutrients.calories} kcal</p>
                            </li>
                            <li key={uniqid()}>
                                <h3 className="font-bold">Grassi</h3>
                                <p>{nutrients.fat}</p>
                            </li>
                            <li key={uniqid()}>
                                <h3 className="font-bold">Carboidrati</h3>
                                <p>{nutrients.carbs}</p>
                            </li>
                            <li key={uniqid()}>
                                <h3 className="font-bold">Proteine</h3>
                                <p>{nutrients.protein}</p>
                            </li>
                                </>}
                        </ul>
                    </div>

                    <div className="w-[90%] flex flex-col items-center gap-5 bg-green-700/10 p-5 rounded-lg">
                        <h2 className="text-center font-mono bg-green-500/30 w-full">Ricetta</h2>
                        <ol className="list-decimal flex flex-col gap-3">
                            {instructions==undefined && <p>Ops, questa ricetta non è presente nel database!</p>}
                            {instructions && instructions.map((item, index) => (
                                <li key={index}>
                                    <p>{item.step}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>}
            </div>
        </div>
    )
}