import React, { useState } from "react"


const api = {
  key: '6f53a03491f93a50df1af7cb3779aa2a',
  base: 'http://api.openweathermap.org/data/2.5/'
}
function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [error, setError] = useState(null)

  const search = evt => {
    if(evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => { 
          if(!res.ok){
            throw Error('City not found')
          }
          return res.json()})

        .then(result => {
          setError(null);
          setWeather(result);
          setQuery('');
        })
        .catch(err => {
          setWeather({})
          setError(err.message)
        })
      }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear()
    return `${day} ${date} ${month} ${year}`   
  }
  
  return (
    <div className='bg-teal-500 h-screen flex items-center justify-center'>
      <main className="h-full min-w-full max-w-xl p-5">
        <div className='flex justify-center'>
          <input className="block w-1/2 p-3 focus:outline-none rounded
            opacity-70 shadow-lg focus:opacity-100"
            type="text" placeholder="Search..." 
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
        

        { error && <div className="text-center text-red-500 text-6xl font-medium italic animate-bounce pt-5" style={{textShadow: '3px 6px rgba(50, 50, 70, 0.5)'}}>
          { error }
        </div>}

        {(typeof weather.main != 'undefined') ? (
        <div>
          <div className="pt-10 text-white text-center">
            <div className="font-medium text-5xl drop-shadow-md" style={{textShadow: '3px 6px rgba(50, 50, 70, 0.5)'}}>{weather.name}, {weather.sys.country}</div>
            
            <div className="font-light text-xl italic drop-shadow-md">{dateBuilder(new Date())}</div>
          </div>
          <div className="text-center">
            <div className="relative inline-block m-10 shadow-lg
            text-white text-8xl font-black p-5 rounded-xl"
            style={{
              textShadow: "3px 6px rgba(50, 50, 70, 0.5",
              backgroundColor: "rgba(255, 255, 255, 0.2"
              }}>
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="text-white font-medium text-5xl">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  )
}

export default App
