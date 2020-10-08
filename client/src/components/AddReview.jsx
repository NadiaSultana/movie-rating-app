//This file adds your rating and comment in the movie detail page.

//imports
import React, {useState}from 'react';
import MovieFinder from "../apis/MovieFinder";
import {useParams, useLocation, useHistory} from "react-router-dom";


const AddReview= () =>{
    const {id} =useParams();
    const location = useLocation();
    const history= useHistory();
    const [name,setName]=useState('')
    const [reviewText,setReviewText]=useState('')
    const [rating,setRating]=useState('Rating')

    //Function to add review of the user
    const handleSubmitReview = async(e) =>{
        e.preventDefault();
        try{
            const response = await MovieFinder.post(`/${id}/addReview`,{
                name,
                review: reviewText,
                rating,
            });
            history.push("/home")
            history.push(location.pathname);

        }
        catch (e) {
            console.log(e)
        }


    }

    return(

        <div className = "mb-2 mt-5 pl-3 border border-primary px-5 py-3 bg-light">
            <form action="">
                <div className="form-row">
                    <div className ="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} id="name" placeholder="name" className="form-control"/>
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={e=>setRating(e.target.value)} id="rating" className="custom-select">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>

                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmFor="Review">Review</label>
                    <textarea value={reviewText} onChange={(e)=>setReviewText(e.target.value)} id="Review" className="form-control" placeholder="Give your review"></textarea>
                </div>
                <button onClick={handleSubmitReview} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReview;