import {
  Button,
  Card,
  Chip,
  List,
  ListItem,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import useAxios from "./useAxios";
import { useEffect } from "react";
import Skeleton from "./Skeleton";
function App() {
  const { fetchData, loading, res } = useAxios();
  const { strInstructions, strMeal, strMealThumb, strYoutube } = res;
  console.log(res);
  const ytUrl = strYoutube?.replace("watch?v=", "embed/");

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Skeleton />;
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
    <List key={idx}>
      <ListItem>
        {item.ingredient}
        <ListItemSuffix>
          <Chip
            value={item.measure}
            variant="ghost"
            size="sm"
            className="rounded-full"
          />
        </ListItemSuffix>
      </ListItem>
    </List>
  );

  return (
    <div className="h-full mx-36">
      <div className="flex items-center justify-center mt-6 ">
        <Button onClick={() => fetchData()}>Random Recipe</Button>
      </div>
      <p className="mx-16 mt-8 text-2xl font-extrabold underline text-sky-950">
        {strMeal}
      </p>
      <div className="flex w-full mt-2 gap-36">
        <img
          className="object-cover object-center mx-16 mt-4 rounded-lg w-96 h-96"
          src={strMealThumb}
          alt="nature"
        />

        <Card className="w-96">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mt-2 text-center"
          >
            Ingredients
          </Typography>

          {ingredients.map((item, index) => ingList(item, index))}
        </Card>
      </div>
      <p className="mx-16 mt-4 text-2xl font-semibold">Instructions:</p>
      <p className="mx-16 mt-4 text-lg">{strInstructions}</p>

      <div className="mt-6 aspect-w-16 aspect-h-9">
        <iframe
          className="rounded-lg"
          title="recipe"
          src={ytUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default App;

{
  /* 
<p className="text-2xl underline "> {strMeal} </p>
<Card className="flex-row w-full h-full">
  <CardHeader
    shadow={false}
    floated={false}
    className="w-2/5 m-0 rounded-r-none shrink-0"
  >
    <img
      className="object-cover object-center w-full h-full mt-6 rounded-lg"
      src={strMealThumb}
      alt="nature"
    />
  </CardHeader>
  <CardBody>
    <Typography variant="h4" color="blue-gray" className="mb-2">
      Ingredients
    </Typography>
    {ingredients.map((item, index) => ingList(item, index))}
  </CardBody>
</Card>

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
</div> */
}
