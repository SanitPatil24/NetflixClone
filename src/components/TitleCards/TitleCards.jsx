import React,{useEffect,useRef, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
// import { use } from 'react';
import { Link } from 'react-router-dom'


const TitleCards = ({title,category}) => {

  const[apiData,setApiData]=useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzRlNmM0NzI5Y2RiNDUyY2RmNDJkZGIyZTgyZjkyNSIsIm5iZiI6MTczMzk4NjY5Mi45OSwic3ViIjoiNjc1YTg5ODQ2NzU4ZjE2M2Y4YWQyMzQ0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oaJmBfrEYHeYAoaWTeRAFHUeoC3HY5GaX7t01-u_k7I'
    }
  };
  
  

  // const handleWheel = (event) => {
  //   event.preventDefault();
  //   cardsRef.current.scrollLeft += event.deltaY;
  // }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
    // cardsRef.current.addEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className='title-Cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card"key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
