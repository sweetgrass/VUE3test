let getHistoryByUID = function (uid) {
    let a = {
        status:'success',
        messages:[
            {
                user:'zs',
                text: '你好！',
                time: '2022/5/16-21:00:05'
            },
            {
                user:'me',
                text: '你好！',
                time: '2022/5/16-21:01:05'
            },
            {
                user:'zs',
                text: '你好你好！',
                time: '2022/5/16-21:02:05'
            },
            {
                user:'me',
                text: '哈哈哈！',
                time: '2022/5/16-21:03:05'
            },
            {
                user:'me',
                text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！',
                time: '2022/5/16-21:04:05'
            },
            {
                user:'zs',
                text: '你好！',
                time: '2022/5/16-21:05:05'
            },
            {
                user:'me',
                text: '你好！',
                time: '2022/5/16-21:06:05'
            },
            {
                user:'zs',
                text: '你好你好！',
                time: '2022/5/16-21:07:05'
            },
            {
                user:'me',
                text: '哈哈哈！',
                time: '2022/5/16-21:08:05'
            },
            {
                user:'me',
                text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！',
                time: '2022/5/16-21:09:05'
            }
        ]
        
    };
    return new Promise(resolve=>{
        setTimeout(()=>{resolve(a)},300)
    })
    // 
}
let login = (data)=>{
    return new Promise((resolve,reject)=>{
        if(Math.random()>0.1){
            setTimeout(()=>{
                resolve({
                    status:'ok',
                    code:'200'
                })
            },1000)
        }
        else{
            reject({
                status:'error',
                code:'500'
            })
        }
        
    })
}
export { getHistoryByUID,login } 