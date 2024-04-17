// All requests related to the user
import { request } from "@/utils"

// 1. login request
export function loginAPI(formData) {  // 函数的执行结果是promise，之后可以调用then等方法
    return request({
        url: '/authorizations',
        method: 'POST',
        data: formData
    })
}


// 2. get user-info
export function getProfileAPI() {    // 函数的执行结果是promise
    return request({
        url: '/user/profile',
        method: 'GET'
    })
}