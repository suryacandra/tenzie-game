import React from 'react'

const Die = (props) => {
    const style = {
        backgroundColor: props.isHeld ? 'lime' : ''
    }

  return (
    <div className="flex flex-col sm:w-full">
       <div style={style} onClick={props.toggle} className="rounded-md bg-slate-300 p-2 shadow-lg sm:w-full sm:self-center">{props.value}</div>
    </div>
  )
}

export default Die