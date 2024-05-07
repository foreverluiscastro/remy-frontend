import { Page } from "@/components/core/Page";
import { useAppContext } from "@/components/providers/AppProvider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function profile() {
  const { user, setUser, setRecipe, showFeed, setShowFeed } = useAppContext();
  const router = useRouter();

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch(`/recipes?query=${showFeed}`)
      .then((r) => r.json())
      .then((recipes) => {
        setRecipes(recipes);

        const categories = ["All"];
        for (const recipe of recipes) {
          for (const recipe_cat of recipe.recipe_categories) {
            // console.log(recipe_cat.category.name)
            if (!categories.includes(recipe_cat.category.name)) {
              categories.push(recipe_cat.category.name);
            }
          }
        }
        // const categories = recipes.map((recipe) => {
        //   return recipe.recipe_categories.map((recipe_category) => {
        //     return recipe_category.category.name
        //   })
        // })
        // console.log("These are the categories: ", categories )
        setCategories(categories);
      });
  }, [showFeed, selectedCategory]);

  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setUser(null);
      router.push("/");
    });
  }

  function handleClick(e) {
    setShowFeed(e.target.value);
  }

  // console.log(`This is the ${showFeed}: `, recipes);

  const filteredList = recipes
    .filter((recipe) => {
      return recipe.title.toLowerCase().includes(search.toLowerCase());
    })
    .filter((recipe) => {
      if (selectedCategory === "All") return true;
      const catArr = recipe.recipe_categories.map(
        (rec_cat) => rec_cat.category.name
      );
      return catArr.includes(selectedCategory);
    });

  // console.log(filteredList);

  return (
    <Page>
      {/* outer container */}
      <div className="bg-sky-200 bg-opacity-80 shadow-md rounded-xl h-full py-8">
        {/* outer side margin container */}
        <div className="px-4 w-full flex flex-grow flex-col items-center">
          {/* profile header */}
          <div className="flex justify-between mb-4 w-full">
            <h1 className="font-bold text-2xl">@{user.username}</h1>
            <button className="Button flex items-center" onClick={handleLogOut}>
              <img src="/logout.png" width={25} height={25} className="p-1" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          {/* Switch between fetaured and personal recipes */}
          <div className="rounded bg-gray-500 w-full shadow-md flex mb-4">
            <button
              value="featured_recipes"
              className={`${
                showFeed === "featured_recipes" ? "bg-sky-400" : ""
              } w-1/3 p-2 rounded duration-300 text-lg`}
              onClick={handleClick}
            >
              Featured Recipes
            </button>
            <button
              value="my_recipes"
              className={`${
                showFeed === "my_recipes" ? "bg-sky-400" : ""
              } w-1/3 p-2 rounded duration-300 text-lg`}
              onClick={handleClick}
            >
              My Recipes
            </button>
            <button
              value="saved_recipes"
              className={`${
                showFeed === "saved_recipes" ? "bg-sky-400" : ""
              } w-1/3 p-2 rounded duration-300 text-lg`}
              onClick={handleClick}
            >
              Saved Recipes
            </button>
          </div>

          <div className="flex flex-col sm:flex-row w-full justify-between">
            <div className="flex">
              <label className="p-2 text-xl">Category:</label>
              <select
                className="Input border border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {/* <option>All</option> */}
                {categories.map((cat) => (
                  <option value={cat} key={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex">
              <label className="p-2 text-xl">Search:</label>
              <input
                value={search}
                className="Input"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Recipe List */}
          <div className="w-full mb-4 flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              {filteredList.map((recipe, index) => (
                <span
                  key={index}
                  className="Bubble"
                  onClick={() => {
                    router.push("/recipe");
                    setRecipe(recipe);
                  }}
                >
                  {recipe.image_url && (
                    <img
                      src={recipe.image_url}
                      className="object-cover h-48 w-full rounded"
                    />
                  )}
                  <h1>{recipe.title}</h1>
                  <p>by: @{recipe.user.username}</p>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default profile;
