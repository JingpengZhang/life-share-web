import http from "../http/http";
// 注册
export const register = (data) => {
    return http.post('/api/users', data)
}

// 登录
export const login = (data) => {
    return http.post('/api/login', data)
}

// 获取个人资料
export const getUserInfo = (id) => {
    return http.get('/api/auth/users/' + id)
}

// 修改个人资料
export const updateUserInfo = (data) => {
    return http.put('/api/auth/users', data)
}

// 获取头像
export const getHeadshot = (id) => {
    return http.get('/api/auth/headshot/' + id)
}

// 保存头像
export const saveHeadshot = (imgdata) => {
    return http.post('/api/auth/headshot', imgdata)
}

// 获取当前登录用户的手机号
export const getPhone = () => {
    return http.get('/api/auth/phone')
}

// 获取当前登录用户的手机号
export const getEmail = () => {
    return http.get('/api/auth/email')
}

// 获取后台列表
export const getAdminUserList = (current_page) => {
    return http.get('/api/auth/admin/users/' + current_page)
}

// 获取用户总数
export const getUserCount = () =>{
    return http.get('/api/users/count')
}

// 改变用户是否为管理员
export const changeUserAdmin = (data) => {
    return http.post('/api/auth/admin/user/admin', data)
}

// 删除用户
export const deleteItem = (id) => {
    return http.delete('/api/auth/admin/user/' + id)
}