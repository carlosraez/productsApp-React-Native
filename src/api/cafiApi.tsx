import axios from 'axios';

const baseURL = 'https://cafe-mern-rnc.herokuapp.com/api';

const cafeApi = axios.create({ baseURL });

export default cafeApi;
