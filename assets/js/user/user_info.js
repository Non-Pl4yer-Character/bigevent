$(function () {


    initUserInfo()
    layui.form.verify({
        nickname: function (val) {
            if (val.length > 6) {
                return '昵称最大6位'
            }
        },

    })

    $('.layui-form').submit(function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        console.log(data);
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: data,
            success: function (res) {
                if (res.status == 0) {
                    initUserInfo()

                    // 调用父窗口 也就是页面的渲染头像和欢迎文本方法getUserInfo()
                    window.parent.getUserInfo()
                    return layer.msg('修改成功')
                } else {
                    return layer.msg(res.data.message)
                }
            }
        })
    })

    $('#resetBtn').click(function (e) {
        e.preventDefault()

        initUserInfo()
    })

})


function initUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layui.form.val('formUserInfo', res.data)
        }
    })
}
