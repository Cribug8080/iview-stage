import axios from 'axios'
import { Modal } from 'iview'
import config from '@/config'
import { getToken,setToken } from '@/libs/util'
import router from '@/router'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const instance = axios.create({baseURL: baseUrl})
instance.interceptors.request.use(preReq, preReqError)
instance.interceptors.response.use(preResp, preRespError)

export {instance} //可以配置多个不同的服务


/**
 * 发送请求前执行。可以配置请求头，一般是登录信息
 * @param req
 * @returns {*}
 */
function preReq(req) {
  req.headers['token'] = getToken()//配置登录信息
  return req
}

/**
 * 请求前错误函数
 * @param error
 * @returns {Promise<any>}
 */
function preReqError(error) {
  console.error(error)
  return Promise.resolve(error)
}

/**
 * 返回数据后，执行回调函数前需要执行的函数，可以定位登录界面
 * @param req
 * @returns {*}
 */
function preResp(res) {
  if(res.data.status == '-99'){
    // alert("登录过期")
    // loginError()

    setToken('')
    router.push({
      name: 'login',
    })
    return Promise.reject(res)
  }else{
    return Promise.resolve(res)
  }

}

/**
 * 请求结果返回错误统一处理函数，可以
 * @param error
 * @returns {Promise<any>}
 */
function preRespError(error) {
  console.error(error)
  alert('server error')
}

/**
 * 登录过期提醒
 * @type {{before_close_normal: beforeClose.before_close_normal}}
 */
function loginError (){
  Modal.error({
    title: '登录过期',
    okText:'重新登录',
    onOk: () => {
      router.push({
        name: 'login',
      })
    },
  })
}
