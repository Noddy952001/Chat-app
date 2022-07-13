import React , {useContext} from "react";
import { AuthContext } from "../context/auth";
import {useNavigate ,Outlet, Route} from "react-router-dom"

export const PrivateRoute = ({component : Component , ...rest}) => {

    const navigate = useNavigate()
    const {user} = useContext(AuthContext);

    return(
        <Route
            {...rest}
            exact
            render={props => 
                user ? < Component {...props}/> : navigate("/login")
            }
       />
    )
}