import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import ShirtCard from "../../../../components/ShirtCard/ShirtCard";
import userApi from "../../../../api/userApi";
import "./index.scss";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async function () {
      let response = await userApi.getFavorites();
      setFavorites(response.favorites);
    })();
    return () => {
      // cleanup
    };
  }, []);

  const handleDeleteFromFavorites = (idShirt) => {
    (async function () {
      let response = await userApi.deleteFromFavorite({ idShirt });
      console.log(response);
      if (response.success) {
        setFavorites(response.favorites);
      }
    })();
  };

  const renderShirts = () => {
    if (favorites.length) {
      return favorites.map((shirt) => (
        <Grid item key={shirt._id} lg={3} md={3} xs={12}>
          <ShirtCard
            shirt={shirt.shirt}
            handleDeleteFromFavorites={handleDeleteFromFavorites}
          />
        </Grid>
      ));
    } else {
      return (
        <h3 className="notification">
          Chưa có sản phẩm trong danh sách yêu thích.
        </h3>
      );
    }
  };

  return (
    <div className="Favorites">
      <div className="content">
        <Grid container spacing={3}>
          {renderShirts()}
        </Grid>
      </div>
    </div>
  );
}
