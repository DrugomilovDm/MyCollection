import React, {useState} from 'react';
import {Card} from "react-bootstrap";

export const Drag = ({setFile}) => {
    const [drag,setDrag]=useState()
    const dragStartHandler=(e)=>{
        e.preventDefault()
        setDrag(true)
    }
    const dragLeaveHandler=(e)=>{
        e.preventDefault()
        setDrag(false)
    }
    const onDropHandler=(e)=>{
        e.preventDefault()
         setFile(...e.dataTransfer.files)
    }
    return (
        <Card className="mt-3 drop-area" onDrop={e=>onDropHandler(e)} >
            {drag
                ? <div className="border-5 h-100 w-100 text-center "
                    onDragStart={e=>dragStartHandler(e)}
                    onDragLeave={e=>dragLeaveHandler(e)}
                    onDragOver={e=>dragStartHandler(e)}
                    //onDrop={e=>onDropHandler(e)}
                >Drop the file</div>
                :<div
                    onDragStart={e=>dragStartHandler(e)}
                    onDragLeave={e=>dragLeaveHandler(e)}
                    onDragOver={e=>dragStartHandler(e)}
                >Drag and drop the file</div>
            }
        </Card>
    );
};
