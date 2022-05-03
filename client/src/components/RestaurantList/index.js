import axios from "axios";

import { useEffect, useState } from "react";

import Restaurant from "./Restaurant";

export default function RestaurantList() {
  //     getter       setter
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    console.log(1, restaurants);
  }, [restaurants]);

  const getRestaurants = async () => {
    const data = await axios.get("http://localhost:3001/search/all");

    setRestaurants(data.data); // setting the state

    console.log(2, data.data);
  };

  return (
    <>
      {restaurants.map(({ name, cuisine, address }, index) => {
        return (
          <Restaurant
            key={index}
            name={name}
            cuisine={cuisine}
            address={address}
          />
        );
      })}
    </>
  );
}
