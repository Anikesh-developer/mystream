import axios from 'axios';

const BASE_URL= 'https://api.themoviedb.org/3';
const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDk3NTExNjBhMDU3NTRhOWI2OWNlODE3MDczNWY1YyIsInN1YiI6IjY0NDkzNDZkZjJjZjI1MDUwY2FkZTA4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SXeaMXTIjaeBkUl8bQYPvkLEV-eph5Vn-OEkL7bCt7M';

const headers = {
    Authorization : 'bearer ' + TMDB_TOKEN ,
};

export const fetchDataFromApi = async (url , params) => {
    try {
        const {data} = await axios.get(BASE_URL + url , {
            headers,
            params
        })
        return data;
    } catch (err) {
        console.log(err)
        return err;
    }
}