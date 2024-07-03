import React, { useState } from 'react'

function Dictionary() {
    const [search,setSearch] = useState("")
    const [info,setInfo] = useState()

    const HandleChange = (e) => {
        setSearch(e.target.value)
    }
    const GetInfo = async() => {
        const get = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`)
        const jsonData = await get.json()
        console.log(jsonData);
        setInfo(jsonData[0]);
        }
  return (
    <>
        <div className='container'>
            <div className='info'>
                <div className='text'> 
                    <input className='txt' placeholder='Search Word' value={search} onChange={HandleChange} type='text'></input>
                    <button onClick={GetInfo} className='search-btn'>Search</button>
                </div>
                <div className='details'>
                    {
                        info ? 
                        <div>
                            <h2>Word : {info.word}</h2>
                            <p>Part of Speech: {info.meanings[0].partOfSpeech}</p>
                            <p>Definition : {info.meanings[0].definitions[0].definition}</p>
                            <p>Synonyms : {info.meanings[0].synonyms[0]}</p>
                            <p>Example : {info.meanings[0].definitions[0].example}</p>
                        </div>
                        : ""
                    }
                </div>
                <button className='more-btn' onClick={()=>window.open(info.sourceUrls[0],"_blank")}>Read More</button>
            </div>
        </div>
    </>
  )
}

export default Dictionary