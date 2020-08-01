$(function () {


    layui.form.verify({
        repwd: function () {
            if ($('#pwd1').val() != $('#pwd2').val()) {
                return '两次密码输入不同'
            }
        },
        pwd: [/^[\w]{6,12}$/, '密码必须6-12位'],
        samepwd: function (val) {
            if (val == $('#pwd1').val()) {
                return '新旧密码不能相同'
            }
        }
    })
    $('.layui-form').submit(function (e) {
        e.preventDefault()

        const data = $(this).serialize()


        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: data,
            success: function (res) {
                if (res.status == 0) {
                    $('.layui-form')[0].reset()
                    return layer.msg('修改成功')
                } else {
                    return layer.msg(res.message)
                }
            }
        })
    })
})