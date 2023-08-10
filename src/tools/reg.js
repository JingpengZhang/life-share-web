// 邮箱
const email = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;

// 密码：以字母开头，长度在6~18之间，只能包含字符、数字和下划线。
const password = /^[a-zA-Z]\w{5,17}$/

// 手机号
const phone = /^1[3-9]\d{9}$/

export default {
  email,password,phone
}