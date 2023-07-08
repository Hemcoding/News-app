import React from 'react'
import './News.css' 

function MyNews({news}) {
  return (
    <div className='news-card'>
      <div id='img-title'>
      <img className='img' src={news.urlToImage} alt="img"  />
      <h2 id='title' >{news.title}</h2>
      </div>
      
      <p id='description' >{news.description}</p>
      <button id='btn' onClick={() => window.open(news.url)} >Read More...</button>
    </div>
  
  
  )
}

export default MyNews
