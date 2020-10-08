//This is the Update page structure when the user wants to update the movie information

import React from 'react';
import UpdateMovie from "../components/UpdateMovie";

const UpdatePage = () =>{
    return(
        <div>
            <h1 className={ "text-center px-5 py-3"}>Update Movie</h1>
            <UpdateMovie/>
        </div>

    )

}

export default UpdatePage;