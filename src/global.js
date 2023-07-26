import Axios from 'axios';
const url = Axios.create({
    baseURL: 'http://localhost:4000/api/',
    UPLOAD_URI: 'http://localhost:4000/uploads'

});
export default url;