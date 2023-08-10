import http from "../http/http";

// 上传图片
export const uploadImg = (data) => {
  return http.post('/api/auth/upload_image', data)
}