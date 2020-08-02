import React from "react";
import { Select } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const Paginate = ({ total_results, total_pages, page, handleChange }) => {
    return (
        <>
            <h3>{`Showing 20 of ${total_results}`}</h3>
            <Pagination count={total_pages} page={page} onChange={handleChange} />
        </>
    );
};

export default Paginate;
