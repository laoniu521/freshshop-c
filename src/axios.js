import axios from 'axios'

const myAxios = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
  params: {
    appkey: 'liuguiyin_1618193286687'
  }
})
myAxios.interceptors.response.use((res) => res.data)
export default myAxios
