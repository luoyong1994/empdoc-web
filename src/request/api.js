/* eslint-disable */
import {
  get,
  post
} from './http'

//封装请求方法
// export const login = data => post("user/login.do", data);
export const queryComponentTypeAndComponent = data => post("manage/queryComponentTypeAndComponent.do", data);
export const addComponentType = data => post("manage/addComponentType.do", data);
export const addComponent = data => post("manage/addComponent.do", data);
export const queryComponentTypeList = data => post("manage/queryComponentTypeList.do", data);
export const queryComponentList = data =>post("manage/queryComponentList.do",data);
export const updateComponent = data =>post("manage/updateComponent.do",data);



