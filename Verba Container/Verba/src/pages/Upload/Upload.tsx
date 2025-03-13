import './Upload.css'
export function Upload(){
    return(
        <>
            <div className="upload-container">
                <div className="upload-imgs-container">
                    
                </div>
                <div className="upload-btns-div">
                    <button className='upload-btn-local'>Select image</button>
                    <button className='upload-btn-drive'>Load from Drive</button>
                </div>
            </div>
        </>
    )
}