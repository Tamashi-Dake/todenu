import React,{useState,useEffect} from 'react';
// import {handler} from "./api/songs"
import axios from 'axios';

export default function Songs() {
    const [songs,setSongs ] = useState([])
    
    useEffect(() => {
        // fetch('/api/songs')
        //   .then((response) => response.json())
        //   .then((data) => setSong(data))
        //   .catch((error) => {
            //     console.error('Error fetching songs:', error);
            //   });
            const fetchData = async () => {
                try {
                    const response = await axios.get('/api/songs');
                    const data = response.data;
                    setSongs(data);
                } catch (error) {
                    console.error('Error fetching songs:', error);
                }
            };
            
            fetchData();
        }, []);
        
        return (
            <div>
            <h1>Top 20 Songs of All Time</h1>
            <p>
                <small>(According to title)</small>
            </p>
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        <h2>{song.title}</h2>
                        <h3>{song.artist}</h3>
                        <p>{song.timestamp}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
Songs.title = "Songs"