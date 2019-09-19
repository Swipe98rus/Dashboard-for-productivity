import React from 'react';

const ConnectForm = props =>{
  return(
    props.connect === 'true' ? 
    <div className="grid-center">
    {/* _________Disconnect______ */}
      <button type="button" 
              onClick={ ()=>{ props.disconnect(); } } 
              className="disconnect"> Disconnect 
      </button>
      <h3 className="show-dashboard-id">Your dashboard ID: {props.dashboard_id}</h3>
    </div> : 
        <div className = "connection-wrap">
          {/* _________Create form______ */}
          <form className = "create-form" 
                onSubmit={ e =>{ props.createHandleSubmit(e) } }>
            <label htmlFor = "create-dashboard">Create Dashboard</label>
            <input type = "text" 
                  name = "create-dashboard" 
                  placeholder = "Create name for dashboard" 
                  ref = { props.createInputRef }
                  autoComplete="off"/>
            <button type="submit">Create</button>
          </form>
        {/* _________Join form______ */}
          <form className = "join-form" 
                onSubmit={ e =>{ props.joinHandleSubmit(e)} }>
            <label htmlFor = "join-dashboard">Join Dashboard</label>
            <input type = "text" 
                  name = "join-dashboard" 
                  placeholder = "Type name of dashboard" 
                  ref = { props.joinInputRef }
                  autoComplete = "off"/>
            <button type = "submit">Join</button>
          </form>
        </div>
  )
}

export default ConnectForm;