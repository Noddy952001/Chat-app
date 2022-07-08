import React, { useState } from "react"
import { Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc ,updateDoc } from "firebase/firestore"
import { auth , db } from "../firebase"
import { useNavigate } from "react-router-dom";

 
export const Login = () => {

    const navigate = useNavigate();

    const [data , setData] = useState({
        email : "",
        password : "",
        error : null,
        loading : false
    })
    const { email , password , error , loading }  = data

    const hadelSubmit = async (event) => {
        event.preventDefault()

        setData({...data , error:null , loading:true});
        if(!email || !password){
          setData({...data , error : "All fields are required ?"})
        }
        try{
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            console.log(result.user)  

            await updateDoc(doc(db , 'users' , result.user.uid),{
                isOnline : true,
            });

            setData({
                email: "" , 
                password: "" , 
                error: null , 
                loading:false
            });

            navigate("/");
            
        }catch(err){
            setData({...data , error : err.message , loading:false});
        }
    }

    const HandelChange = (e) => {
        setData({...data, [e.target.name]  : e.target.value})
    }

    return(
        <div>

            <div style={{
                    margin : "auto",
                    backgroundColor : "black",
                    width : "450px",
                    height : "300px",
                    borderRadius : "10px"
                }}>

                <h1 
                    style={{
                        marginTop: "40px",
                        color : "white" , 
                        textAlign : "center",
                    }}>
                    Login your account
                </h1>

                <form action="">

                    <label 
                        style={{
                            color : "white" , 
                            marginLeft : "40px"
                        }}> 
                        User e-mail 
                    </label> <br />

                    <input 
                        style={{
                            backgroundColor : "black" ,
                            color:"white" , 
                            borderColor : "white" , 
                            borderRadius : "10px" , 
                            width : "80%" ,
                            height:"30px",
                            marginLeft:"40px"
                        }} 
                        type="text" 
                        placeholder="enter email" 
                        name="email"
                        value={email}
                        onChange={HandelChange}
                        /> <br /><br />

                        <label 
                            style={{
                                color : "white" , 
                                marginLeft : "40px"
                            }}>User password 
                        </label> <br />
                        <input 
                            style={{
                                backgroundColor : "black" ,
                                color:"white" , 
                                borderColor : "white" , 
                                borderRadius : "10px" , 
                                width : "80%" ,
                                height:"30px",
                                marginLeft:"40px"
                                
                            }} 
                            type="text" 
                            placeholder="enter password" 
                            name="password"
                            value={password}
                            onChange={HandelChange}
                        /><br /><br />

                        <>
                      {error ? <p className="error_div"> {error }</p> : null}    
                       </>
                            
                        <button 
                            style={{
                                backgroundColor : "green" ,
                                borderColor : "none" ,  
                                color : "white" , 
                                borderRadius : "10px" , 
                                width : "20%" ,
                                height:"30px",
                                marginLeft:"40%"
                            }}
                            disabled={loading}
                            onClick={hadelSubmit}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                </form>

                
            </div>

            
        </div>
    )
}


