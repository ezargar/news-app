import React from "react";
import './App.css';



const Cards = ({articleData}) => {
    const myStyle={
        marginLeft: "75%",
        width: "23%",
        height: "80%",
        borderRadius: "9px",
        opacity: 1,
        marginTop: "26px",
        transform: 'scale(1)',
        transformOrigin: '0 0',
      };

    return(articleData.map(
            (article) => (
                // <div class="col-3 col-s-12">
        <div className="newsCards">
          <div style={{ float: 'left' }}>
            <div className="card-title">
             {article.title}
            </div>
            <div className="card-user-details">
              <span>
                {article.author}
              </span>
              <span className="divider" />
              <span>
               {article.publishedAt}
              </span>
            </div>
            <div className="card-description">
              {article.description}
            </div>
          </div>
          <div style={{ background: `transparent url(${article.urlToImage}) 10% 30% no-repeat padding-box`,  backgroundSize: "250px", ...myStyle}} />
        </div>
        // </div>
            ),
          )     
    )
}

export default Cards;