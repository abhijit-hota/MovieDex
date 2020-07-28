import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import imdb from "../Stylesheets/imdb2.png";
import tomatometer from "../Stylesheets/Tomatometer.png";
import metacritic from "../Stylesheets/Metascore.png";

const Ratings = (props) => {
    const [ratings, setRatings] = useState([]);
    const logos = { imdb, tomatometer, metacritic };

    useEffect(() => {
        if (props.ratings) {
            const newArray = [...props.ratings];
            const modded = newArray.map((rating) => {
                switch (rating.Source[0]) {
                    case "I":
                        rating.Source = "IMDb";
                        break;
                    case "R":
                        rating.Source = "Tomatometer";
                        break;
                    default:
                        break;
                }
                return rating;
            });
            setRatings(modded);
        }
    }, [props.ratings]);

    return (
        <Grid container spacing={3} justify="flex-start" alignItems="center">
            {ratings
                ? ratings.map((rating) => {
                      return (
                          <Grid item key={rating.Source} lg={3} xs={3} sm={3} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                              <div
                                  style={{
                                      position: "absolute",
                                      textAlign: "center",
                                      width: "80px",
                                      height: "80px",
                                      lineHeight: "80px",
                                  }}>
                                  {rating.Value}
                              </div>

                              <CircularProgress
                                  variant="static"
                                  value={
                                      rating.Source[0] !== "I"
                                          ? parseFloat(rating.Value)
                                          : parseFloat(rating.Value) * 10
                                  }
                                  size={80}
                                  thickness={5}
                              />
                              <img
                                  style={ {width: `${rating.Source[0] === 'I' ? '50px' : '80px' }`, marginTop: "5px" }}
                                  src={logos[rating.Source.toLowerCase()]}
                                  alt={`${rating.Source} logo`}
                              />
                          </Grid>
                      );
                  })
                : "loading"}
        </Grid>
    );
};

export default Ratings;
