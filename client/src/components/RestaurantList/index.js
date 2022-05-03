import axios from "axios";

import { useEffect, useState } from "react";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    const data = await axios.get("http://localhost:3001/search/all");

    setRestaurants(data.data);
    console.log(data.data);
  };

  return <></>;
}
