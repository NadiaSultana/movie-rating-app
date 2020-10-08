require("dotenv").config();

const express = require("express");
const db = require('./db');
const app = express();
const cors = require("cors");



app.use(cors());
app.use(express.json());

app.use("/authentication", require("./routes/jwtAuth"));

//Get all movies

app.get("/movies", async (req, res) => {
    try {
        const movieReviewsData = await db.query(
            "select * from movies left join ( select movie_id, count(*), trunc(avg(rating), 1) as average_rating from reviews group by movie_id) reviews on movies.id = reviews.movie_id ;"
        )

        res.status(200).json({
            status:"success",
            results:movieReviewsData.rows.length,
            data:{
                movies: movieReviewsData.rows,
            },

        })
    }catch (e) {
        console.log(e)
    }
})


//Get a movie
app.get("/movies/:id", async(req,res)=>{
    console.log(req.params.id);

    try {
        const movie = await db.query("select * from movies left join ( select movie_id, count(*), trunc(avg(rating), 1) as average_rating from reviews group by movie_id) reviews on movies.id = reviews.movie_id where id=$1", [req.params.id])

        const reviews = await db.query("select * from reviews where movie_id =$1", [req.params.id])


        res.status(200).json({
            status:"success",
            data:{
                movie:movie.rows[0],
                reviews: reviews.rows
            },
        })

    }
    catch(e){
        console.log(e)

    }

})



//Create a movie
app.post("/movies", async(req,res) =>{

    try{
        const results= await db.query
        ("INSERT INTO movies(title, release_date, genre, plot) values ($1, $2, $3, $4) returning * ",
            [req.body.title, req.body.release_date, req.body.genre, req.body.plot]);
        console.log(results);
        res.status(201).json({
            status:"success",
            data:{
                movie: results.rows[0]
            }
        })

    }
    catch(e){
        console.log(e)
    }
})


//Update a movie
app.put("/movies/:id", async(req,res) =>{

    try{
        const results= await db.query
        ("UPDATE movies SET title = $1, release_date=$2, genre=$3, plot=$4 where id=$5 returning * ",
            [req.body.title, req.body.release_date, req.body.genre,req.body.plot, req.params.id]);

        res.status(201).json({
            status:"success",
            data:{
                movie: results.rows[0]
            }
        })

    }
    catch(e){
        console.log(e)
    }
})

//Delete an entry
app.delete("/movies/:id", async(req,res) =>{
    console.log("Received DELETE request: ",req.params)
    try{
        const results= await db.query
        ("DELETE FROM movies where id = $1",
            [req.params.id]);
        res.status(204).json({
            status:"success"
        })

    }
    catch(e){
        console.log(e)
    }
})



//Create a review

app.post("/movies/:id/addReview",
    async (req,res)=>{
        try{
            const newReview= await db.query("INSERT INTO reviews(movie_id,name,review,rating) values($1, $2,$3, $4) returning *",[req.params.id, req.body.name, req.body.review, req.body.rating])
            res.status(201).json({
                status: 'success',
                data:{
                    review:newReview.rows[0],
                }
            })
        }
        catch(e){
            console.log(e)
        }
    })


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server is up and listening on ${port}`);
});
