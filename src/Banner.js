import React from "react"

function Banner(props){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    

    return(
        <div className="banner" style={{backgroundImage:  "linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%)" + "," + props.bgImg }}>
            <h1>{today}</h1>
            <div className="quote-container">
                <h1 className="quote">{props.quote === undefined ? "" : "\"" + props.quote + "\""}</h1>
                <h2 className="quote-author">{props.author}</h2>
            </div>
        </div>
    )
}

export default Banner