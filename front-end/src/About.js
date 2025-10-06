import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './About.css'


const AboutUs = () =>{
    const [about, setAbout] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState('')

    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`).then(res => {
            setAbout(res.data);
        })
        .catch (err =>{
            setError(err.message);
        })
        .finally(() => {
            setLoaded(true)
        })
    }

    useEffect(() =>{
        fetchData()
    }, [])

    // draw about us section
    if (!loaded){
        return <h3>Loading...</h3>
    }
    
    if (error){
        return <h3>Error Occurred : {error}</h3>
    }

    return(
        <div className='about-us'> 
                   
            <img className = "my-image" src ={about.imageLink} alt = "Kazi Hossain"/>
            
            {about.aboutMe.map((para, indx) => (
                <p key={indx}>{para}</p>
            ))}
        </div>
    )

}

export default AboutUs;