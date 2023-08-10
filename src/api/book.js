import http from '../http/http'

// 新增
export const createItem = (data) => {
    return http.post('/api/auth/book', data)
}

// 获取所有
export const getAll = (current_page) => {
    return http.get('/api/books/' + current_page)
}

// 获取详情
export const getDetail = (id) => {
    return http.get('/api/book/' + id)
}

// 获取个人推荐
export const getListByUserID = (user_id, current_page) => {
    return http.get('/api/auth/' + user_id + '/' + current_page + '/books')
}

// 删除
export const deleteItem = (id) => {
    return http.delete('/api/auth/book/' + id)
}

// 修改封面
export const changePic = (data) => {
    return http.post('/api/auth/book/pic', data
    )
}

// 提交修改
export const editItem = (id, data) => {
    return http.put('/api/auth/book/' + id, data)
}

// 查询作者推荐数量
export const getUserCount = (user_id) => {
    return http.get('/api/book/' + user_id + '/count')
}

// 获取所有推荐数量
export const getBooksNum = () => {
    return http.get('/api/books/count/num')
}

// 获取后台推荐列表
export const getAdminBookList = (current_page) =>{
    return http.get('/api/auth/admin/book/list/'+current_page)
}