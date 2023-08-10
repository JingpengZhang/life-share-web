import http from '../http/http'

// 获取分类选择列表
export const getSelectCaregories = () => {
  return http.get('/api/auth/categories')
}

// 保存分享
export const saveShare = (data) => {
  return http.post('/api/auth/share', data)
}

// 获取所有分享
export const getAll = (current_page) => {
  return http.get('/api/shares/' + current_page)
}

// 获取分享详情
export const getDetail = (id) => {
  return http.get('/api/share/' + id)
}
// 获取用户分享数量
export const getUserShareCount = (user_id) => {
  return http.get('/api/auth/share/' + user_id + '/count')
}

// 评论
export const comment = (share_id, data) => {
  return http.post('/api/auth/' + share_id + '/comment', data)
}

// 获取分享评论
export const getShareComments = (share_id) => {
  return http.get('/api/' + share_id + '/comments')
}

// 获取某一用户的分享列表
export const getSharesByUserID = (user_id, current_page) => {
  return http.get('/api/auth/' + user_id + '/' + current_page + '/shares')
}

// 删除分享
export const deleteItem = (id) => {
  return http.delete('/api/auth/share/' + id)
}

// 修改分享时的数据初始化
export const editShareData = (id) => {
  return http.get('/api/auth/share/' + id)
}

// 修改分享封面
export const editShareCover = (data) => {
  return http.post('/api/auth/share/cover', data)
}

// 修改分享
export const editShare = (id, data) => {
  return http.put('/api/auth/share/' + id, data)
}

// 获取分类列表
export const getCateList = (current_page) => {
  return http.get('/api/auth/share/cates/' + current_page)
}

// 保存分类
export const saveShareCate = (data) => {
  return http.post('/api/auth/share/cate', data)
}

// 删除分类
export const deleteShareCate = (id) => {
  return http.delete('/api/auth/share/cate/' + id)
}

// 获取分类数量
export const getShareCateNum = () => {
  return http.get('/api/share/cate/num')
}

// 获取分类信息
export const getShareCateInfo = (id) => {
  return http.get('/api/share/cate/info/' + id)
}

// 修改分类信息
export const editShareCate = (id, data) => {
  return http.put('/api/auth/share/cate/' + id, data)
}

// 获取后台分类列表
export const getAdminShareList = (current_page) => {
  return http.get('/api/auth/admin/share/' + current_page)
}

// 获取分享数量
export const getShareCount = () => {
  return http.get('/api/shares_num')
}

// 修改分享轮播状态
export const changeShareSlide = (data) => {
  return http.post('/api/auth/share/slide', data)
}

// 获取轮播分享
export const getSlideShares = () =>{
  return http.get('/api/shares/slide/all')
}