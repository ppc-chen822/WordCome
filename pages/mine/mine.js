Page({
    data: {
        userInfo:'',
    },
    // 授权登录
    login(){
        // let that = this
        wx.getUserProfile({
          desc: '必须授权才可以继续使用',
        //   success(res){
        //       console.log('授权成功',res)
        //       that.setData({
        //           nickName:res.userInfo.nickName
        //       })
        //   },
        //   fail(res){
        //     console.log('授权失败',res)
        //   }
            success:res=>{
                let user = res.userInfo
                console.log(res)
                // 存缓存
                wx.setStorageSync('user', user)
                this.setData({
                    userInfo:user
                })
            },
            fail:res=>{
                console.log('授权失败',res)
            }
        })
    },
    onLoad(){
        let user = wx.getStorageSync('user')
        this.setData({
            userInfo:user
        })
    },
    loginOut(){
        this.setData({
            userInfo:''
        })
        wx.setStorageSync('user', null)
    }
})