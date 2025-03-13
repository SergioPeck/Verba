import './StarModal.css'
import tradIcon from '../../../../icons/Trad.png'
import cleanIcon from '../../../../icons/Clean.png'
import typeIcon from '../../../../icons/Type.png'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

type Options={
    Translate:boolean,
    Clean:boolean,
    Type:boolean
}

type HijoProps = {
    onSend: (opciones: Options) => void; // Función que recibe un objeto de tipo Opciones
    closeStartModal:()=>void;
  };

export function StartModal ({closeStartModal,onSend}:HijoProps){
    const navigate = useNavigate();
    const handleStartBtn=()=>{
        closeStartModal();
        navigate("/upload")
        onSend(selectedOptions)
    }

    const [selectedOptions, setSelectedOptions]=useState({
        Translate:false,
        Clean:false,
        Type:false
    })

    const handleCheckboxChange= (event: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, checked} = event.target;
        setSelectedOptions((prevState)=>({
            ...prevState,
            [name]:checked,
        }));

    };
    
    const isAnyOptionSelected = Object.values(selectedOptions).includes(true);
    return(
        <>
            <div className="start-overlay" onClick={closeStartModal}>
                <div className="start-modal" onClick={(e)=>{e.stopPropagation()}}>
                    <h2 className='start-modal-title'>Get started</h2>
                    <div className='checkbox-div'>
                        <div className='checkbox-div-div'>
                            <input 
                            type="checkbox" 
                            name="Translate" 
                            id="checkbox1" 
                            checked={selectedOptions.Translate} 
                            onChange={handleCheckboxChange}/>
                            <label className='start-label-checkbox' htmlFor="checkbox1">
                                <img src={tradIcon} alt="Translate image" className='checkbox-img' />
                                <p className='checkbox-p'>Translate</p>
                            </label>
                        </div>
                        <div className='checkbox-div-div'>
                            <input 
                            type="checkbox" 
                            name="Clean" 
                            id="checkbox2"
                            checked={selectedOptions.Clean} 
                            onChange={handleCheckboxChange}/>
                            <label className='start-label-checkbox' htmlFor="checkbox2">
                                <img src={cleanIcon} alt="Clean image" className='checkbox-img' />
                                <p className='checkbox-p'>Clean</p>
                            </label>
                        </div>
                        <div className='checkbox-div-div'>
                            <input 
                            type="checkbox" 
                            name="Type" 
                            id="checkbox3"
                            checked={selectedOptions.Type} 
                            onChange={handleCheckboxChange}/>
                            <label className='start-label-checkbox' htmlFor="checkbox3">
                                <img src={typeIcon} alt="Type image" className='checkbox-img' />
                                <p className='checkbox-p'>Type</p>
                            </label>
                        </div>
                    </div>
                    <button className='start-modal-btn' onClick={handleStartBtn} disabled={!isAnyOptionSelected}>Start</button>
                </div>
            </div>
        </>
    )
}