import http from '../http/http'

// 新增专业
export const addMajor = (data) => {
  return http.post('/api/auth/major', data)
}

// 获取大类列表
export const getMajorParents = () =>{
  return http.get('/api/major/parent')
}