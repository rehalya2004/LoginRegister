import React from 'react'


function Popup(props) {
  return (props.trigger) ? (
    <div>
        <div >
        {props.children}
            <button className='submit_btn' onClick={() => props.setTrigger(false)}>close</button>
        </div>
      
    </div>
  ) : "";
}

export default Popup;