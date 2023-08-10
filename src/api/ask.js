import http from '../http/http'

export const createItem = (data) => {
  return http.post('/api/auth/ask', data)
}

// 获取所有
export const getAll = (current_page) => {
  return http.get('/api/asks/' + current_page)
}

// 获取用户问答数量
export const getUserAskCount = (user_id) => {
  return http.get('/api/asks/' + user_id + '/count')
}

// 获取详情
export const getDetail = (id) => {
  return http.get('/api/ask/' + id)
}

// 获取某个用户的问答列表
export const getUsersAsks = (user_id, current_page) => {
  return http.get('/api/auth/' + user_id + '/asks/' + current_page)
}

// 删除
export const deleteItem = (id) => {
  return http.delete('/api/auth/ask/' + id)
}

// 修改
export const editItem = (id, data) => {
  return http.put('/api/auth/ask/' + id, data)
}

// 提交答案
export const submitAnswer = (id, data) => {
  return http.post('/api/auth/ask/' + id + '/answer', data)
}

// 获取某个问题的所有答案
export const getAsksAnwsers = (ask_id, current_page) => {
  return http.get('/api/ask/' + ask_id + '/answers/' + current_page)
}

// 获取某个用户的所有答案
export const getUsersAnwsers = (user_id, current_page) => {
  return http.get('/api/auth/ask/' + user_id + '/answers/' + current_page)
}

// 获取某个用户所有答案的数量
export const getUsersAnswersNum = (user_id) => {
  return http.get('/api/auth/ask/' + user_id + '/answers/count/num')
}

// 删除答案
export const deleteAskAnswer = (id) => {
  return http.delete('/api/auth/ask/answers/' + id)
}

// 获取所有问题数量
export const getAsksNum = () =>{
  return http.get('/api/asks/count/num')
}

// 获取所有答案数量
export const getAnswersNum = () =>{
  return http.get('/api/asks/answers/count/num')
}

// 获取所有答案
export const getAllAnswer = (current_page) =>{
  return http.get('/api/admin/ask/all/anwsers/'+current_page)
}