import React, { useEffect } from 'react';
import EmailBody from "./EmailBody";
import { useSelector, useDispatch } from 'react-redux';
import { open, styleValue, select, selectedValue, selectedIdValue } from '../slice/slaveSlice';
import { emailList, emailBody, dataValue, bodyDataValue } from '../slice/emailSlice';
import { read, readSaved, selectedFilterId } from '../slice/filterSlice';


const Emails = () => {
    const style = useSelector(styleValue);
    const selected = useSelector(selectedValue);
    const selectedId = useSelector(selectedIdValue);
    const data = useSelector(dataValue);
    const bodyData = useSelector(bodyDataValue);
    const tab = useSelector(selectedFilterId);

    const Read = JSON.parse(localStorage.getItem("Read"))
    const ReadSaved = JSON.parse(localStorage.getItem("ReadSaved"))
    const Favorites = JSON.parse(localStorage.getItem("Favorites"))

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(emailList("1"))
        dispatch(open("close"))
        dispatch(select("close"))
        dispatch(readSaved(Read))
    }, [tab])

    const openEmail = (id) => {
        dispatch(open())
        dispatch(select(id))
        dispatch(read(id))
        dispatch(emailBody(id))
    }

    const filterArray = (ele) => {
        if (tab === "Read") {
            return ReadSaved?.includes(ele.id)
        }
        else if (tab === "Unread") {
            return !ReadSaved?.includes(ele.id)
        }
        else if (tab === "Favorites") {
            return Favorites?.includes(ele.id)
        }
        else {
            return ele.id > 0
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <>
            <div className="main" style={{ display: style }}>
                <div className="email_list">
                    {data?.list ? data.list.filter(filterArray).map(ele => {
                        return <>
                            <div className={(selected && selectedId === ele.id ? `email selected` : `email`) + (Read?.includes(ele.id) ? ` read` : ``)} onClick={() => { openEmail(ele.id) }} key={ele.id}>
                                <div className="logo">
                                    <h2>{ele.from.name[0]}</h2>
                                </div>
                                <div className="email_head">
                                    <div><p>From: </p><h4>{ele.from.name} {`<${ele.from.email}>`}</h4></div>
                                    <div><p>Subject:</p><h4>{ele.subject}</h4></div>
                                    <p className='description'>{style ? `${ele.short_description.substr(0, 45)}...` : ele.short_description}</p>
                                    <div><p>{ele.date} </p>{(Favorites?.includes(ele.id) ? <h4 className='fav'>Favorite</h4> : <></>)} </div>
                                </div>
                            </div>
                        </>
                    }) : <><h2>Please Wait...</h2></>}
                    <div className='pagination'>
                        <button onClick={() => { return dispatch(emailList("1")), scrollToTop() }}>&lt;</button>
                        <button onClick={() => { return dispatch(emailList("2")), scrollToTop() }}>&gt;</button>
                    </div>

                </div>
                {style ? <EmailBody bodyData={bodyData} data={data.list} id={selectedId} /> : <></>}
            </div>
        </>
    )
}

export default Emails;