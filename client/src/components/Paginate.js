import React from "react";
import { Pagination } from "@material-ui/lab";

const Paginate = ({ present_results, total_results, total_pages, page, handleChange }) => {
    return (
        <div style={{marginTop:'15px'}}>
            <h3>{`Showing ${present_results} of ${total_results} results`}</h3>
            <Pagination count={total_pages} page={page} onChange={handleChange} />
        </div>
    );
};

export default Paginate;
