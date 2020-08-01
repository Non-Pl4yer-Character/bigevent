$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url

    if (option.url.indexOf('/my') != -1) {
        // 原生js是setrequestheader
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一调用complete回调函数

    option.complete = function (res) {
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem('token')

            location.href = '/login.html'
        }
    }
})