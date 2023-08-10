import http from '../http/http'

// 增加
export const createItem = (data) => {
    return http.post('/api/auth/lost', data)
}

// 列表
export const getAll = (current_page) => {
    return http.get('/api/losts/' + current_page)
}

// 失物详情页
export const getDetail = (id) => {
    return http.get('/api/lost/' + id)
}

// 获取个人启事
export const getListByUserID = (user_id, current_page) => {
    return http.get('/api/auth/' + user_id + '/' + current_page + '/losts')
}

// 删除
export const deleteItem = (id) => {
    return http.delete('/api/auth/lost/' + id)
}

// 修改物品图
export const changePic = (data) => {
    return http.post('/api/auth/lost/pic', data)
}

// 提交修改
export const editItem = (id, data) => {
    return http.put('/api/auth/lost/' + id, data)
}

// 根据类型获取失物表
export const getAllByType = (type, current_page) => {
    return http.get('/api/losts/' + type + '/' + current_page)
}

// 获取作者所有启事数量
export const getUserLostCount = (user_id) => {
    return http.get('/api/lost/' + user_id + '/count')
}

// 获取所有启事数量
export const getLostsNum = () => {
    return http.get('/api/all/losts/count/num')
}

// 根据分类获取启事数量
export const getNumByType = (type) => {
    return http.get('/api/losts/' + type + '/count/num')
}