const ING = ["Chicken", "Carrots", "Onions", "Garlic", "Potatoes"];
const STY = ["Asian", "Stir Fry", "Savory"];

const RES = {
  title: "Asian Chicken Stir Fry",
  recipe_ingredients: [
    { name: "Chicken", amount: "2 boneless, skinless chicken breasts (about 300g)"},
    { name: "Carrots", amount: "2 medium carrots, sliced thinly"},
    { name: "Onions", amount: "1 small onion, sliced"},
    { name: "Garlic", amount: "2 cloves, minced"},
    { name: "Soy Sauce", amount: "3 tablespoons"},
    { name: "Rice Vinegar", amount: "1 tablespoon"},
    { name: "Sesame Oil", amount: "1 tablespoon"},
    { name: "Cornstarch", amount: "1 teaspoon"},
    { name: "Salt", amount: "1/2 teaspoon"},
    { name: "Pepper", amount: "1/4 teaspoon"},
    { name: "Oil", amount: "2 tablespoons for stir-frying"}
  ],
  instructions: "Cut the chicken breasts into bite-sized pieces and place them in a bowl. Add soy sauce, rice vinegar, sesame oil, cornstarch, salt, and pepper. Mix well to coat the chicken evenly. Let it marinate for about 15 minutes. Heat 1 tablespoon of oil in a large skillet or wok over medium-high heat. Add minced garlic and stir-fry for about 30 seconds until fragrant. Add the marinated chicken to the skillet and spread it out into a single layer. Let it cook undisturbed for about 2-3 minutes until it starts to brown. Then, stir-fry until the chicken is cooked through and golden brown. Remove the chicken from the skillet and set it aside. In the same skillet, add the remaining tablespoon of oil if needed. Add sliced onions and carrots. Stir-fry for about 3-4 minutes until they're tender-crisp. Return the cooked chicken to the skillet and stir everything together until heated through. Serve the Asian chicken stir-fry hot over cooked rice or noodles. Enjoy!"
};

const MIS = [
  "cornstarch",
  "rice vinegar"
]

const USR = {
  username: "forev",
  recipes: [RES]
}

export { ING, STY, RES, MIS, USR}