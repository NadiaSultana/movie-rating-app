import React, {useState, useEffect} from 'react';

import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import MovieDetailPage from "./routes/MovieDetailPage";
import {MoviesContextProvider} from "./context/MoviesContext";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import { IndexRoute } from 'react-router';

import { toast } from "react-toastify";

toast.configure();

const App =() =>{
    const checkAuthenticated = async () => {
        try {
            const res = await fetch("http://localhost:5000/authentication/verify", {
                method: "POST",
                headers: { jwt_token: localStorage.token }
            });

            const parseRes = await res.json();

            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        } catch (err) {
            console.error(err.message);
        }
    };




    useEffect(() => {
        checkAuthenticated();
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };


    return  (
       <MoviesContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route
                            exact path="/" render={props =>
                                !isAuthenticated ? (
                                    <Landing {...props} />
                                ) : (
                                    <Redirect to="/" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/login"
                            render={props =>
                                !isAuthenticated ? (
                                    <Login {...props} setAuth={setAuth} />
                                ) : (
                                    <Redirect to="/home" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/register"
                            render={props =>
                                !isAuthenticated ? (
                                    <Register {...props} setAuth={setAuth} />
                                ) : (
                                    <Redirect to="/home" />
                                )
                            }
                        />

                        <Route exact path = "/home" component={Home} />
                        <Route exact path = "/movies/:id/update" component={UpdatePage} />
                        <Route exact path = "/movies/:id" component={MovieDetailPage} />


                    </Switch>


                </Router>

            </div>

       </MoviesContextProvider>
    )
}

export default App;
