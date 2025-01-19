import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL =  'https://youtube-v31.p.rapidapi.com'

const options = {
  params: {
    maxResults: '32',
    pageToken:''
  },
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  } 
};

let fetchData = async (URL, pageParam) => {
    try{
        options.params.pageToken = pageParam
        const response = await axios.get(`${BASE_URL}/${URL}`,options);
        return response.data;
    }catch{
        throw new Error("Could not fetch data...")
    }
}

export default fetchData
