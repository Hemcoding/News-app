import React, { useEffect, useRef, useState } from 'react'
import MyNews from './MyNews';
import './News.css';

function News() {

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${day}-${month}`;
    
  }
  
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  
 
  const apiKey = `a74c9b1868b2420eb72f9b07cc3d15dc`;
  const [newsList , setNewsList] = useState([]);
  const [query , setQuery] = useState('Modi');
  const apiUrl =`https://newsapi.org/v2/everything?q=${query}&from=${formattedDate}&sortBy=publishedAt&apiKey=${apiKey}`;
  // const apiUrl =`https://newsapi.org/v2/everything?q=${query}&from=2023-15-08&sortBy=publishedAt&apiKey=${apiKey}`;
   
  

  const list = [
    {
      id: 1 ,
      name: 'India'
    },
    {
      id: 2 ,
      name: 'Sports'
    },
    {
      id: 3 ,
      name: 'Entertainment'
    },
    {
      id: 4 , 
      name: 'Political'
    }
  ];

  const queryInputRef = useRef(null);
  const queryValueRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [query])

  async function fetchData() {
    try{

      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      
      console.log(response);

      setNewsList(jsonData.articles);
    }catch(e){
      console.log(e , "error occured");
    }
  }



  function handleSubmit(event){
    event.preventDefault();
    const queryValue = queryInputRef.current.value;
    setQuery(queryValue);
  }

  

  return (
    <div>
        <div id='menu-bar'>
          <img id='logo-img' src="https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png" alt="logo" srcset="" />
          <ul id='flex-query' ref={queryValueRef}>
            <li className='menu' onClick={() =>setQuery('India')}>India</li>
            <li className='menu' onClick={() =>setQuery('Sports')}>Sports</li>
            <li className='menu' onClick={() =>setQuery('Entertainment')}>Entertainment</li>
            <li className='menu' onClick={() =>setQuery('Political')}>Political</li>
            <li className='menu' onClick={() =>setQuery('Technology')}>Technology</li>
            <li className='menu' onClick={() =>setQuery('Education')}>Education</li>
            <li className='menu' onClick={() =>setQuery('Lifestyle')}>Lifestyle</li>
          </ul>
        </div>

        {/* {list.map(li =>{
              return <li className='menu' key={li.id} onClick={() => setQuery('Sports')}>{li.name}</li>
            })} */}

      <form className='form' onSubmit={handleSubmit} action="">
        <input className='search-textarea' type="text" ref={queryInputRef}/>
        <input className='search-button' onClick={handleSubmit} type="submit" value="Search" />
        </form> 


    <div className='news-display'>
      {newsList?.map(news =>{
        return <MyNews key={news.urlImage} news={news}/>
      })}
    </div> 
    </div> 
  )
}

export default News
