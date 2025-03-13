import './ExitModal.css'
type ExitModalProps=({
    closeExitModal:()=>void;
    handleExit:()=>void;
})
export const ExitModal = ({closeExitModal,handleExit}:ExitModalProps)=> {
    
    return(
        <>
            <div className="exit-overlay" onClick={closeExitModal}>
                <div className="exit-modal" onClick={(e)=>{e.stopPropagation()}}>
                    <h2 className='exit-modal-h2'>Go Home?</h2>
                    <div className='exit-modal-btns'>
                        <button className='btn-cancel' onClick={closeExitModal}>Cancel</button>
                        <button className='btn-exit' onClick={handleExit}>Yes, go home</button>
                    </div>
                </div>
            </div>
        </>
    )

}