import React from 'react';
import logo from "../Stylesheets/logo.png"

const Logo = () => {

    const styles = {
        margin: "40px 0 80px 0px",
        width: '90vw',
        maxWidth: '500px',
        justifySelf:'center'
    }

    return ( 
        <div style={styles}>
            <img style={{width:'100%', margin:'auto'}} src={logo} alt="MovieDex Logo"/>
        </div>
     );
}
 
export default Logo;