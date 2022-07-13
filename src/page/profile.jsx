import React from "react";
import Img from "../vikas.jpg"
import "../style/profile.css" 
import { Camera } from "../Component/svg/Camera";
import { Delete } from "../Component/svg/Delete";
import { useState } from "react";
import { storage , db , auth} from "../firebase";
import { ref , getDownloadURL , uploadBytes , deleteObject} from "firebase/storage"
import { getDoc , doc , updateDoc } from "firebase/firestore"

import { useEffect } from "react";
import { async } from "@firebase/util";

export const Profile = () => {

    const [img , setImage] = useState("")
    const [user , setUser] = useState()

    useEffect(() => {
        getDoc(doc(db, "users" , auth.currentUser.uid)).then((docSnap) => {
            if(docSnap.exists){
                setUser(docSnap.data())
            }
        })



        if(img) {
            const uploadingImg = async () => {

                const imgRef = ref(
                    storage , 
                    `avatar/${new Date().getTime()} - ${img.name}`
                );
                try{

                    if(user.avatarPath){
                        await deleteObject(ref(storage , user.avatarPath))

                    }
                    const snap =await uploadBytes(imgRef , img);
                    const url = await getDownloadURL(ref(storage , snap.ref.fullPath))
                        
                    await updateDoc(doc(db , "users" , auth.currentUser.uid),{
                        avatar: url,
                        avatarPath : snap.ref.fullPath
                    });

                    setImage("")
                   
                }catch(e){
                    console.log(e.message)
                }
            }
            uploadingImg()
        }
    },[img])

    const deleteImage = async () => {
        try {

            const consfirm = window.confirm("Delete avatar")
            if(consfirm){
                await deleteObject(ref(storage , user.avatarPath))

                await updateDoc(doc(db, "users", auth.currentUser.uid),{
                    avatar: "",
                    avatarPath : ""
                })
            }

        }catch(e){
            console.log(e.message)
        }
    }

    return  user ? (
        <div className="Profile_div">
            <div className="Profolie_img"> 
                <img src={user.avatar || Img} alt="page not found!" />

                <div className="overlay">
                        <div>
                            <label htmlFor="photo">
                                <Camera/>
                                {user.avatar ? <Delete deleteImage={deleteImage} /> : null}
                                <input type="file"  accept="image/*"
                                    style={{
                                        display:"none"
                                    }}
                                        id="photo"
                                        onChange={(e) =>setImage(e.target.files[0]) }
                                    />

                            </label>
                        </div>
                </div>

            </div>



          <div className="Profile_text">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <hr />
            <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
          </div>
        </div>
    ) : null
}