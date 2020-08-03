import React from "react";
import { Card, CardContent, CardActionArea } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const MovieCardSkeleton = () => {
    const styles = {
        backgroundColor: "whitesmoke",
        width: "270px",
        margin: "10px",
        height: "auto",
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
    };
    return (
        <Card style={styles} raised>
            <Skeleton animation="wave" variant="rect" width="270px" height="405px" />
            <CardContent style={{display: "flex", alignItems: "center", flexDirection:"column"}}>
                <Skeleton animation="wave" width="150px" />
                <Skeleton animation="wave" width="80px" />
            </CardContent>
            <CardActionArea style={{ display: "flex", alignContent: "center", width: "100%", marginBottom: "20px" }}>
                <Skeleton animation="wave" variant="rect" width="100px" height="40px" />
            </CardActionArea>
        </Card>
    );
};

export default MovieCardSkeleton;
