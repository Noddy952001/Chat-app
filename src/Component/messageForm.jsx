import React from "react";
import {Attachment} from "./svg/Attachment"
import "../style/message.css"
 
export const Message = ({handelSubmit , text , setText ,setImage}) => {
    return(
        <form className="form_message"
            onSubmit={handelSubmit}
        >
            <label htmlFor="img">
                <Attachment />
            </label>
            <input 
                onChange={ e => setImage(e.target.files[0])}
                type="file" 
                id="img"  
                accept="image/*"
                style={{
                    display:"none"  
                }}
            />
            <div>
                <input 
                    type="text" 
                    placeholder="Enter message" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <button className="btn"
            >

              
                Send
            </button>
        </form>
    )
}