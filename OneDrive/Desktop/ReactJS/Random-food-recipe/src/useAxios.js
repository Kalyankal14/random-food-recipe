import axios from "axios";
import { useState } from "react";

const useAxios = () => {
  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setRes(response.data.meals[0]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return {
    res,
    loading,
    error,
    fetchData,
  };
};

export default useAxios;
