import './App.css';
import search from './search.svg';
import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import axios from 'axios';
import AddCategoriesModal from './AddCategoriesModal';
import mockData from './mockData.json'
import { CATEGORIES_LIMIT, DEAFULT_API_URL, DEAFULT_CATEGORY_NAME, API_REQUEST_LIMIT_STATUS_CODE, API_REQUEST_GIT_CORS_STATUS_CODE } from './constants';


const  App = () => {
  const [articles, updateArticles] = useState();
  const defaultCategory = {
    categoryName : DEAFULT_CATEGORY_NAME,
    apiUrl: DEAFULT_API_URL,
  }
  const [categories, updateCategories] = useState([defaultCategory]);
  const [fixedArticles, updateFixedArticles] = useState();
  const [isModalOpen, showModal] = useState(false);
  const [currentCategory, updateCurrentCategory] = useState(DEAFULT_CATEGORY_NAME);

  useEffect(() => {
    fetchArticles(defaultCategory.apiUrl);
  }, []);


  const handleCategories = (categoryName, apiUrl, action)=> {
    const categoriesSelected = {
      categoryName,
      apiUrl
    }
    if(!action && categories && categories.length < CATEGORIES_LIMIT){
      updateCategories(prevCategories => [...prevCategories, categoriesSelected]);
    }  
    fetchArticles(apiUrl);
    showModal(false);
    updateCurrentCategory(categoryName)
  }


  const handleLiveSearch = (userInput)=>{
    const filteredCategories = fixedArticles.filter((categories) => Object.values(categories).some((category) => 
       typeof category === 'string' && category.toLocaleLowerCase().includes(userInput.toLocaleLowerCase())
    ))
    updateArticles(filteredCategories)
  }


  const fetchArticles = (url) => {
    axios.get(
      url,
    ).then(response => {
      updateArticles(response.data.articles);
      updateFixedArticles(response.data.articles);
    })
    .catch(function (error) {
      if(error){
        if(error.response.status === API_REQUEST_LIMIT_STATUS_CODE || error.response.status === API_REQUEST_GIT_CORS_STATUS_CODE) {
          // use mock data due to limited no of api requests 
          updateFixedArticles(mockData.articles);
          updateArticles(mockData.articles);
        }        
      }
    })
  };

  return (
      <div
        className="news-app-dash"
      >
         <div
        className="title"
        style={{
          width: '216px',
          height: '53px',
        }}
      >
        News Today
        </div>
        <div className='category-buttons'>
          {categories.map((value, index)=>(
            <button key={`category-button${index}`} className={value.categoryName === currentCategory && !isModalOpen ? "category-button-style" : "disable-category-button" } onClick={()=>handleCategories(value.categoryName, value.apiUrl, "toggle")}>{value.categoryName}</button>
          ))}
          <button className={isModalOpen? "category-button-style" : "disable-category-button"} disabled={!(categories.length < 5)}  onClick={() => showModal(true)}>+</button>
        </div>
        <div className="search-bar">
          <svg
            xmlns={search}
            viewBox="0 -13 10 50"
            width="40px"
            height="100%"
            id="two"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            className="live-search-box"
            type="text"
            onChange={(event)=> handleLiveSearch(event.target.value)}
            placeholder="Search for keywords, author"
            autoComplete="off"
          />
        </div>
        {articles !== undefined && <Cards articleData={articles} /> }
          <AddCategoriesModal showModal={isModalOpen} updateCategories={handleCategories}/>
      </div>
  );
}

export default App;
