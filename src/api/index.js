let getHistoryByUID = function (uid) {
    let a = {
        status: 'success',
        toUID:`${uid}`,
        messages: [
            {
                user: `${uid}`,
                text: '你好！',
                time: '2022/5/16-21:00:05'
            },
            {
                user: `${uid}`,
                text: '你好！',
                time: '2022/5/16-21:01:05'
            },
            {
                user: `${uid}`,
                text: '哈哈哈！',
                time: '2022/5/16-21:03:05'
            },
            {
                user: `me`,
                text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！',
                time: '2022/5/16-21:04:05'
            },
            {
                user: `${uid}`,
                text: '你好！',
                time: '2022/5/16-21:05:05'
            },
            {
                user: `me`,
                text: '你好！',
                time: '2022/5/16-21:06:05'
            },
            {
                user: `${uid}`,
                text: '你好你好！',
                time: '2022/5/16-21:07:05'
            },
            {
                user: 'me',
                text: '哈哈哈！',
                time: '2022/5/16-21:08:05'
            },
            {
                user: 'me',
                text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！',
                time: '2022/5/16-21:09:05'
            }
        ]

    };
    return new Promise(resolve => {
        setTimeout(() => {resolve(a) },300)
    })
    // 
}
let login = (data) => {
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.1) {
            setTimeout(() => {
                resolve({
                    status: 'ok',
                    code: '200'
                })
            }, 1000)
        }
        else {
            reject({
                status: 'error',
                code: '500'
            })
        }

    })
}
let getCurrentTalkList = () => {
    let currentlist = [
        {
            username: 'zs',
            latestMessage: {
                from: 'me',
                to: 'zs',
                text: '哈哈哈哈',
                time: '2022/5/16-21:09:05'
            }
        },
        {
            username: 'ls',
            latestMessage: {
                from: 'me',
                to: 'ls',
                text: '今天去干嘛了？',
                time: '2022/5/17-11:09:05'
            }
        },
        {
            username: 'ww',
            latestMessage: {
                from: 'ww',
                to: 'me',
                text: '晚上一起吃饭？',
                time: '2022/5/16-21:09:05'
            }
        },
        {
            username: 'zl',
            latestMessage: {
                from: 'zl',
                to: 'me',
                text: '好的，收到！',
                time: '2022/5/22-16:09:05'
            }
        }
    ]
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.01) {
            setTimeout(() => {
                resolve({
                    status: 'ok',
                    data: currentlist
                })
            }, 1000)
        }
        else {
            reject({
                status: 'error',
                code: '500'
            })
        }
    })
}
let getFriendList = () => {
    let fakelist = [
        {
            un: '用户0',
            uid: 0
        }
        , {
            un: '用户1',
            uid: 1
        }
        , {
            un: '用户2',
            uid: 2
        }
        , {
            un: '用户3',
            uid: 3
        }
        , {
            un: '用户4',
            uid: 4
        }
        , {
            un: '用户5',
            uid: 5
        }
        , {
            un: '用户6',
            uid: 6
        }
        , {
            un: '用户7',
            uid: 7
        }
        , {
            un: '用户8',
            uid: 8
        }
        , {
            un: '用户9',
            uid: 9
        }
        , {
            un: '用户10',
            uid: 10
        }
        , {
            un: '用户11',
            uid: 11
        }
        , {
            un: '用户12',
            uid: 12
        }
        , {
            un: '用户13',
            uid: 13
        }
        , {
            un: '用户14',
            uid: 14
        }
        , {
            un: '用户15',
            uid: 15
        }
        , {
            un: '用户16',
            uid: 16
        }
        , {
            un: '用户17',
            uid: 17
        }
        , {
            un: '用户18',
            uid: 18
        }
        , {
            un: '用户19',
            uid: 19
        }
        , {
            un: '用户20',
            uid: 20
        }
        , {
            un: '用户21',
            uid: 21
        }
        , {
            un: '用户22',
            uid: 22
        }
        , {
            un: '用户23',
            uid: 23
        }
        , {
            un: '用户24',
            uid: 24
        }
        , {
            un: '用户25',
            uid: 25
        }
        , {
            un: '用户26',
            uid: 26
        }
        , {
            un: '用户27',
            uid: 27
        }
        , {
            un: '用户28',
            uid: 28
        }
        , {
            un: '用户29',
            uid: 29
        }
    ]
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(fakelist);
        },2000)
    })
}
export { getHistoryByUID, login, getCurrentTalkList, getFriendList } 