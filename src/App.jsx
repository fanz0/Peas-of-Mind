import './App.css'
import { Header } from './components/Header'
import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes } from './redux/recipeSlice'
import { Card } from './components/Card'
import { Link } from 'react-router-dom'
import { NewSearch } from './components/NewSearch'
import { deactivate } from './redux/buttonSlice'

function App() {

  const dispatch = useDispatch()
  const stateRecipe = useSelector(state => state.recipe)
  const stateButton = useSelector(state => state.button)
  
  if (stateRecipe.isLoading) {
    return <h1 className="text-center mt-10">Loading...</h1>
  }
  
  
  function handleClick (e) {
    dispatch(fetchRecipes())
    dispatch(deactivate())
  }


  return (
    <>
      <Header />
      <div className="flex flex-col items-center gap-10">
        {stateButton.value == true && <button onClick={handleClick} className="border rounded-lg bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-600 p-2 w-20 mt-10">Inizia</button>}
        {stateButton.value == false && <NewSearch />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10 mb-10 justify-items-center">
        {stateRecipe.data && stateRecipe.data.results.map((item) => (
        <Link to={`/recipe/${item.id}`} key={item.id}>
          <Card 
          id={item.id}
          title={item.title}
          imageSrc={item.image}/>
        </Link>  
        ))}
      </div>
    </>
  )
}

export default App
