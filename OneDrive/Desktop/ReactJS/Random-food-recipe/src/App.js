import { Button } from "@material-tailwind/react";
import useAxios from "./useAxios";
import { useEffect } from "react";
function App() {
  const { fetchData, loading, res } = useAxios();
  const { strInstructions, strMeal, strMealThumb, strYoutube } = res;
  console.log(res);
  const ytUrl = strYoutube?.replace("watch?v=", "embed/");

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  let ingredients = [];
  Object.keys(res).forEach((item, idx) => {
    if (res[`strIngredient${idx}`]) {
      ingredients.push({
        ingredient: res[`strIngredient${idx}`],
        measure: res[`strMeasure${idx}`],
      });
    }
  });

  const ingList = (item, idx) => (
    <div className="flex text-sm" key={idx}>
      <li>{item.ingredient} - </li>
      <span className="italic text-gray-500">{item.measure} </span>
    </div>
  );

  return (
    <>
      <div className="text-center">
        <Button onClick={() => fetchData()}>Random Recipe</Button>
      </div>

      <p className=" text-2xl underline"> {strMeal} </p>

      <img
        className="mt-6 w-96 rounded-lg object-cover object-center"
        src={strMealThumb}
        alt="nature"
      />

      <div className=" my-6">
        <h3 className=" text-4xl font-bold mb-2">Ingredients</h3>
        {ingredients.map((item, index) => ingList(item, index))}
      </div>
      <p className="underline">Instructions:</p>
      <p>{strInstructions}</p>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          title="recipe"
          src={ytUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}

export default App;
