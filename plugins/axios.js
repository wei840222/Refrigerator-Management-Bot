import axios from 'axios'

export default axios.create({
  baseURL: 'https://refrigerator-mgt-bot-backend.herokuapp.com/',
  timeout: 2500
});
