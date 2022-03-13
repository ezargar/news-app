import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs" 


/*
Open Add Categories Modal 
*/

const AddCategoriesModal = ({showModal, updateCategories}) => {
  const [categoryName, updateCategory] = useState();
  const [apiUrl, updateAPI] = useState();

  return(
    <div className="overlay" style={{display: showModal? 'block': 'none'}}>
    <div className="modal-attr" style={{display: showModal? 'block': 'none'}}>
        <div className="add-category">
         Add Category
        </div>
        <input
            className="input-category-box"
            type="text"
            value={categoryName}
            onChange={(event)=> updateCategory(event.target.value)}
            placeholder="Category Name"
            autoComplete="off"
          />
          <input
            className="input-category-box"
            onChange={(event)=> updateAPI(event.target.value)}
            type="text"
            value={apiUrl}
            placeholder="API URL"
            autoComplete="off"
          />
          <div>
              <button className="add-category-button" 
              onClick={(e) => {
                e.preventDefault();
                updateCategories(categoryName, apiUrl);
                updateCategory('');
                updateAPI('');
            }}>
                  <span className="icon">
                      <BsPlusLg size="10px" value={{ style: { verticalAlign: 'middle', padding: "5px" }}}/>
                      <span className="button-text">
                          Add
                      </span>
                      </span> 
              </button>
          </div>
    </div>
  </div>
  )
};

export default AddCategoriesModal;
