import Axios from 'axios';
const url = Axios.create({
    baseURL: 'http://localhost:4000/api/'
});
export default url;