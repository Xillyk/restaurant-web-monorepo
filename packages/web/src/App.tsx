import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useRestaurant } from "./contexts/RestaurantContext";

const restaurantIds = ["567051", "227018"];

const App = () => {
  const navigate = useNavigate();
  const { setRestaurantInfo } = useRestaurant();

  useEffect(() => {
    setRestaurantInfo(undefined);
  }, [setRestaurantInfo]);

  return (
    <>
      <p>restaurants list</p>

      {restaurantIds.map((id) => (
        <div
          key={id}
          className="size-100"
          onClick={() => navigate(`/restaurant/${id}`)}
        >
          <span>{id}</span>
        </div>
      ))}
    </>
  );
};

export default App;
