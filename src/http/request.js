import axios from 'axios'
import router from '../router/index.js'
export function request(config) {
  // 创建 axios 的实例
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:5888',
    timeout: 10000
  })
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  // 请求拦截器配置
  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  }, error => {
    console.log(error);
    return Promise.error(error)
  })
  // 响应拦截器配置
  instance.interceptors.response.use(response => {
    // console.log(response);
    return response.data
  }, error => {
    switch (error.response.status) {
      case 401:
        localStorage.clear()
        router.push('/token_invalid')
        break
      case 403:
        console.log('没有权限');
        router.push('/login')
        break
      case 404:
        console.log('404啦');
        router.push('/not_found')
        break
      case 500:
        console.log('服务器错误');
        break
      default:
        return Promise.reject(error)
    }
    return Promise.reject(error)
  })
  // 发送真正的网络请求
  return instance(config)
}
export default request