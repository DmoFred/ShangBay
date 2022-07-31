//利用uuid生成未登录用户临时标识符
import { v4 as uuidv4 } from 'uuid';
//封装函数:只能生成一次用户临时身份I且不会改变
export const getUuid = () => {
    // 查看本地存储有木有uuid
    let uuidToken = localStorage.getItem('GETUUID')
    // 判断 没有本地存储uuid 干神马
    if (!uuidToken) {
        //随机生成一个临时登录身份   用视频里的uuid_token会报错 换成了localToken 这里随意起名 与第11行对应就行
        let localToken = uuidv4()
        localStorage.setItem('GETUUID', localToken)
    }
    return uuidToken
}
