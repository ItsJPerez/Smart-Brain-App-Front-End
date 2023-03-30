import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import Brain from './brain.png'


const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" style={{height:'100px', width:'125px'}} >
                <div className="Tilt-inner pa3">
                    <img style={{height:'75px'}} src={Brain} alt='Logo'/>
                </div>
            </Tilt>
      </div>
    )
}

export default Logo;