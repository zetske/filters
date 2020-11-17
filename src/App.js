import React from 'react'
import './App.css';
import { Recommend } from './Recommend'

function App() {
  const search = window.location.search;
  const searchParams = search.slice(1).split('&');
  const queryParams = {};
  searchParams.forEach(p => {
    const [property, value] = p.split('=');
    queryParams[property] = value;
  })
  return (
    <div className="App">
      <Recommend queryParams={queryParams} />
    </div>
  );
}

export default App;