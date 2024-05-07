import React, { useState } from "react";
import { ING, STY, RES  } from "../data";
import { useAppContext } from "../providers/AppProvider";
import { useRouter } from "next/router";

export default function RecipeForm() {
  const {setRecipe} = useAppContext();
  const router = useRouter();

  const [ingredients, setIngredients] = useState([]);
  const [styles, setStyles] = useState([]);

  const [ingredientInput, setIngredientInput] = useState("");
  const [styleInput, setStyleInput] = useState("");
  const [guests, setGuests] = useState(1);

  const [isLoading, setIsLoading] = useState(false)

  const handleAddItem = (item, setter, inputSetter) => {
    setter((prevItems) => [...prevItems, item]);
    inputSetter("");
  };

  const handleRemoveItem = (index, setter) => {
    setter((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleGenerateRecipe = () => {
    console.log("This is the request body: ", { ingredients, styles });
    setIsLoading(true)
    fetch("/generate_recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients, styles, guests }),
    })
      .then((r) => r.json())
      .then((recipe) => {
        setIsLoading(false)
        setRecipe(recipe);
        router.push("/recipe")
      });
    // setRecipe(RES)
  };

  return (
    <div className="flex flex-col bg-sky-200 bg-opacity-80 shadow-md rounded-xl h-full py-8 ">
      <div className="flex flex-col px-8 w-full text-left">
        <h1 className="font-semibold text-2xl mb-4">Generate a recipe!</h1>
        <p className="text-xl mb-4 bg-sky-700 bg-opacity-80 rounded-lg p-4">Add any ingredients you have available as well as the style you're looking for and Remy will generate a great recipe!</p>
        <div className="flex flex-col w-full">
          <label className="mb-2 font-semibold text-xl">Ingredients</label>
          <div className="mb-4 flex">
            <input
              className="rounded shadow-md p-2 text-black w-1/2 border border-gray-300 focus:outline-none focus:border-blue-500"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddItem(
                    ingredientInput,
                    setIngredients,
                    setIngredientInput
                  );
                }
              }}
              placeholder="Add an ingredient!"
            />
            <button
              className="Bubble ml-4 p-2"
              onClick={() =>
                handleAddItem(ingredientInput, setIngredients, setStyleInput)
              }
            >
              <img
                src="/arrow.png"
                width={100}
                height={100}
                className="w-5 "
                alt="arrow"
              />
            </button>
          </div>
          <div className="grid sm:grid-cols-5 grid-cols-2 gap-4 mb-4">
            {ingredients.map((ing, idx) => (
              <span key={idx} className="Bubble" onClick={() => handleRemoveItem(idx, setIngredients)}>
                {ing}
              </span>
            ))}
          </div>
          <label className="mb-2 font-semibold text-xl">Styles</label>
          <div className="mb-4 flex">
          <input
            className=" rounded shadow-md p-2 text-black w-1/2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={styleInput}
            onChange={(e) => setStyleInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem(
                  styleInput,
                  setStyles,
                  setStyleInput
                );
              }
            }}
            placeholder="Add A Style!"
          />
            <button
              className="Bubble ml-4 p-2"
              onClick={() =>
                handleAddItem(styleInput, setStyles, setStyleInput)
              }
            >
              <img
                src="/arrow.png"
                width={100}
                height={100}
                className="w-5 "
                alt="arrow"
              />
            </button>
          </div>
          <div className="grid sm:grid-cols-5 grid-cols-2 gap-4 mb-4">
            {styles.map((sty, idx) => (
              <span key={idx} className="Bubble" onClick={() => handleRemoveItem(idx, setStyles)}   
              >
                {sty}
              </span>
            ))}
          </div>
          <label className="mb-2 font-semibold text-xl">Guests</label>
          <input
            className=" rounded mb-8 shadow-md p-2 text-black w-1/5 border border-gray-300 focus:outline-none focus:border-blue-500"
            type="number"
            value={guests}
            onChange={(e)=> {
              if (e.target.value >= 1) {setGuests(e.target.value)}
            }}
          />
        </div>
          <button className="Bubble text-2xl font-semibold" onClick={handleGenerateRecipe}>{isLoading ? "Loading..." : "Generate"}</button>

      </div>
    </div>
  );
}
