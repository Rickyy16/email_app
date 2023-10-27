import React from 'react'
import {favorites } from '../slice/filterSlice';
import { useDispatch } from 'react-redux';

const EmailBody = ({ bodyData, data, id }) => {
    const dispatch = useDispatch();

    const addToFav = (id)=>{
        dispatch(favorites(id))
    }

    return (
        <div className="email_body">
            <div className="logo">
                <h2>{data ? data[id - 1].from.name[0] : ""}</h2>
            </div>
            <div className="email_inner">
                <div className="email_heading">
                    <h2>{data ? data[id - 1].subject : ""}</h2>
                    <button onClick={()=>{addToFav(id)}}>Mark as favorite</button>
                </div>
                <p>{data ? data[id - 1].date : ""}</p>
                <div className="email_content">
                    <p>{bodyData ? bodyData?.body?.replaceAll("<div><p>", "").replaceAll("</p></div>", "") : ""}</p>
                </div>
            </div>
        </div>
    )
}

export default EmailBody