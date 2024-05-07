import React, { useEffect, useState } from "react";
import { useAppContext } from "@/components/providers/AppProvider";
import { useRouter } from "next/router";

function recipe() {
  const { recipe, setRecipe, user } = useAppContext();

  const router = useRouter()

  useEffect(() => {
    const storedRecipe = localStorage.getItem("recipe");
    if (storedRecipe) {
      setRecipe(JSON.parse(storedRecipe));
    }
  }, []);

  useEffect(() => {
    if (recipe !== null) {
      localStorage.setItem("recipe", JSON.stringify(recipe));
    }
  }, [recipe]);

  // console.log("This is local storage: ", localStorage);

  const [missingIngredients, setMissingIngredients] = useState([]);
  const [missingInput, setMissingInput] = useState("");

  if (recipe == null) return <h1>Loading</h1>;

  const handleRemoveItem = (idx) => {
    const newArr = missingIngredients.filter((_, index) => idx !== index);
    setMissingIngredients(newArr);
  };

  const handleReGenerate = () => {
    const request = {
      recipe,
      missing_ingredients: missingIngredients
    }

    fetch('/generate_recipe',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    .then((r) => r.json())
    .then((response) => setRecipe(response))
  }

  const handleClick = () => {

    
    if ( recipe.user !== undefined && user.id === recipe.user.id && recipe.is_saved){
      console.log("THe user is trying to delete a recipe!")
      fetch(`/recipes/${recipe.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(() => {
        router.push('/profile')
      })
      // end early
      return;
    }

    const copyObj = {...recipe}
    copyObj.is_saved = !copyObj.is_saved

    if (recipe.is_saved) {
      fetch(`/saved_recipes/${recipe.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((r) => {
        if (r.ok) {
          setRecipe(copyObj)
        }
      })
    } else {
      // console.log("This is the recipe id:", recipe.id)

      const reqBody = recipe.id
        ? {
            recipe_id: recipe.id,
            user_id: user.id,
          }
        : recipe;

      const url = recipe.id ? "saved_recipes" : "recipes"

      fetch(`/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      })
      .then((r) => {
        if (r.ok) {
          setRecipe(copyObj)
        }
      })
    }
    // const copyObj = {...recipe}
    // copyObj.is_saved = !copyObj.is_saved
    // setRecipe(copyObj)
  }

  // console.log(recipe)
  // console.log(user)

  return (
    <div className="RecipeList">
      <div className={`${ recipe.image_url ? "relative" : "pt-4"}`}>
        { recipe.image_url &&         <img src={recipe.image_url} className="w-full h-52 object-cover rounded-t-xl" />}
        <div className={`${ recipe.image_url ? "absolute bottom-0" : ""} w-full items-center px-4`}>
          <div className="justify-between w-full flex mb-4">

          <h1 className={`text-2xl font-bold ${ recipe.image_url ? "bg-black bg-opacity-50 px-2 py-1 rounded-lg" : ""}`}>{recipe.title}</h1>
          <button className={`ml-4 px-3 py-0.5 rounded-md text-lg transition duration-300 cursor-pointer font-semibold whitespace-nowrap flex items-center ${ recipe.is_saved ? " bg-yellow-500 hover:bg-yellow-600": "bg-sky-500 hover:bg-sky-600"}`}
          onClick={handleClick}
          >
            <img src="/save.png" className="sm:p-1" width={25} height={25}/>
            <span className="hidden sm:inline">
            
            { recipe.user && recipe.user.id === user.id ? "Published": `${ recipe.is_saved ? "Saved" : "Save" }` }
            </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row px-4">

        <div className="my-4 w-full sm:w-1/2">

        <div>
          <h1 className="mb-2 text-xl font-semibold">Categories</h1>
          <div className="flex flex-wrap gap-2 mb-2">
          { recipe.recipe_categories && recipe.recipe_categories.map((recipe_category, index) => (
            <span key={index} className="rounded-md shadow-md bg-sky-500 bg-opacity-80 p-2 text-center hover:bg-opacity-100 cursor-pointer hover:scale-105 duration-300">{recipe_category.category.name}</span>
          ))}
          </div>
        </div>

          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside">
            {recipe.recipe_ingredients.map((ing, idx) => (
              <li className="mb-2" key={idx}>
                {ing.ingredient.name} - {ing.amount} 
              </li>
            ))}
          </ul>
        </div>

        <div className="my-4 w-full sm:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <ol>
            {recipe.instructions.split(". ").map((ing, idx) => (
              <li className="mb-2" key={idx}>
                {idx + 1}. {ing}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="px-4">
        <label className="font-semibold text-xl">
          Missing Any Ingredients?
        </label>
        <div className="flex my-4">
          <input
            className="w-full rounded shadow-md p-2 text-black"
            value={missingInput}
            onChange={(e) => setMissingInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setMissingIngredients([...missingIngredients, missingInput]);
                setMissingInput("");
              }
            }}
            placeholder="Add Them Here And Re-Generate!"
          />
          <button
            className="Bubble ml-4 p-2"
            onClick={() => {
              setMissingIngredients([...missingIngredients, missingInput]);
              setMissingInput("");
            }}
          >
            <img
              src="/arrow.png"
              width={100}
              height={100}
              className="w-5 "
              alt="Arrow"
            />
          </button>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-2 gap-4 mb-4">
          {missingIngredients.map((ing, idx) => (
            <span
              key={idx}
              className="Bubble"
              onClick={() => handleRemoveItem(idx)}
            >
              {ing}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center px-4 pb-4">
        <button
          className="Bubble text-2xl font-semibold"
          onClick={() => {
            // grab the previous recipe submit the missing items and regenerate
            handleReGenerate()
          }}
        >
          Regenerate
        </button>
      </div>
    </div>
  );
}

export default recipe;
