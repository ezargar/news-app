import logo from './logo.svg';
import './App.css';
import search from './search.svg';
import React, { useState, useEffect } from 'react';
import 'google-fonts';
// import eliyas from './images/eliyas.png';
import Cards from './Cards';
import axios from 'axios';
import Modal from './Modal/AddCategoriesModal';
import mockData from './mockData.json'


const  App = () => {
  const [article, updateArticle] = useState();
  const defaultCategory = {
    categoryName : 'TechCrunch',
    apiUrl: 'https://newsapi.org/v2/everything?q=TechCrunch&from=2022-02-11&sortBy=publishedAt&apiKey=a5cf886a8dd84801a01c8b5bd0da1b0d',
  }
  const [categories, updateCategories] = useState([defaultCategory]);
  const [fixedArticles, updateFixedArticles] = useState();
  const [show, setShow] = useState(false);
  const [currentCategory, updateCurrentCategory] = useState('TechCrunch');

  useEffect(() => {
    getArticles(defaultCategory.apiUrl);
  }, []);


  const handleCategories = (categoryName, apiUrl, action)=> {
    const categoriesSelected = {
      categoryName,
      apiUrl
    }
    if(!action && categories && categories.length < 5){
      updateCategories(prevCategories => [...prevCategories, categoriesSelected]);
    }  
    getArticles(apiUrl);
    setShow(false);
    updateCurrentCategory(categoryName)
  }


  const handleLiveSearch = (value)=>{
    let arr = fixedArticles.filter((obj) => Object.values(obj).some((val) => {
      return typeof val === 'string' && val.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    }))
    updateArticle(arr)
  }


  const getArticles = (url) => {
    axios.get(
      url,
    ).then(response => {
      updateArticle(response.data.articles);
      updateFixedArticles(response.data.articles);
    })
    .catch(function (error) {
      if(error){
        // use mock data due to limited no of api requests 
        updateFixedArticles(mockData.articles);
        updateArticle(mockData.articles);
      }
    })
  };
  return (
      <div
        className="news-app"
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
        <div style={{ marginTop: '30px', display: 'flex', width: '60%' }}>
          {categories.map((value)=>(
            <button className={value.categoryName === currentCategory && !show ? "button-style" : "disable-button" } onClick={()=>handleCategories(value.categoryName, value.apiUrl, "toggle")}>{value.categoryName}</button>
          ))}
          <button className={show? "button-style" : "disable-button"} disabled={!(categories.length < 5)}  onClick={() => setShow(true)}>+</button>
        </div>
        <div className="searchBar">
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
            className="input-box"
            type="text"
            onChange={(event)=> handleLiveSearch(event.target.value)}
            placeholder="Search for keywords, author"
            autoComplete="off"
          />
        </div>
        {article !== undefined && <Cards articleData={article} /> }
          <Modal showModal={show} updateCategories={handleCategories}/>
      </div>
  );
}

export default App;
