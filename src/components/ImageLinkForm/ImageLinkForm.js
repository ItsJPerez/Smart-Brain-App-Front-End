import React from "react";
import './ImageLink.css'

const ImageLinkForm = ({ onInputChange, onBtnSubmit }) => {
    return(
        <div>
            <p className=" white f3">
                {'This Smart Brain will detect faces in your pictures. Give it a try!'}
            </p>

            <div className="center">
                <div className=" form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type='text' onChange={onInputChange}/>
                    <button onClick={onBtnSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-black">Detect
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ImageLinkForm;