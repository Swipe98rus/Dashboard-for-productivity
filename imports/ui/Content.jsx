import React from 'react'

import ToDos from './ToDos';
import Doing from './Doing';
import Done from './Done';


const Content =  props =>{
    if( (props.create_userID || props.join_userID) && (props.connect === 'true')){
        const localStorageID = props.create_userID ? props.create_userID : props.join_userID
        return (
            <div className="content">
                <ToDos id = { localStorageID } />
                <Doing id = { localStorageID } />
                <Done id = { localStorageID }  /> 
            </div>
        )
    }else if(props.error){
        return(
            <div className="grid-center wrap-error-message" 
                 ref={props.errorMessageRef}>
                    <h3 className="error-message">Dashboard not found</h3>
            </div>
        )
    }else{
        return <div></div>;
    }
}




export default Content;