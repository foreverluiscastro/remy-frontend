import React from 'react'

function About() {
  return (
    <div className="flex flex-col max-w-screen-xl mx-auto px-4">
    <div className="flex md:flex-row flex-col py-4">
      <div className="flex flex-col text-center items-center">
        <img
          src="/remy-form.png"
          width={1000}
          height={1000}
          className="w-11/12"
          alt='remy-form'
        />
        <p className="px-4">
          Enter your ingredients, choose your style, and enter the amount of
          guests and hit the generate button...
        </p>
      </div>
      <div className="flex flex-col text-center items-center">
        <img
          src="/remy-recipe.png"
          width={1000}
          height={1000}
          className=" w-11/12"
          alt='remy-recipe'
        />

        <p className="px-4">
          ...and Remy will be able to generate a recipe you can re-create at home in your own kicthen.
        </p>
      </div>
    </div>
    {/* <div>
      <p>
        Like the recipe but don't have a specific ingredient? Let us know
        and we can generate a substitution.
      </p>
    </div>
    <div>
      <p>
        Did you like a specific recipe? Save it for later and build your
        recipe list!
      </p>
    </div> */}
  </div>
  )
}

export default About