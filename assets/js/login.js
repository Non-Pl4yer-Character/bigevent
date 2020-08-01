$(function () {
    const $login = $('#login')
    const $toregister = $('#toregister')
    const $register = $('#register')
    const $tologin = $('#tologin')

    $toregister.click(function () {
        $login.hide()
        $register.show()
    })

    $tologin.click(function () {
        $login.show()
        $register.hide()
    })

    layui.form.verify({
        pwd: [/^[\w]{6,10}$/, '密码只能由6-10位字母数字和下划线组成'],
        // user: [/^[\S]{4,8}$/, '用户名只能4到8位且不能带有空格'],
        repwd: function () {
            if ($('#password1').val().trim() != $('#password2').val().trim()) {
                return '两次密码输入不同'
            }
        }
    })




    // 注册功能请求
    $register.submit(function (e) {
        e.preventDefault()
        // const user = $('#username1').val().trim()
        // const pwd1 = $('#password1').val().trim()
        // const pwd2 = $('#password2').val().trim()
        // const reg1 = /^[\w]{6,10}$/


        // if (!(reg1.test(user) && reg1.test(pwd1))) {
        //     return $('#tips').html('用户名密码只能由6-10位字母数字和下划线组成')
        // }
        // if (pwd1 != pwd2) {
        //     return $('#tips').html('两次密码输入不同')
        // }

        const data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                if (res.status == 0) {
                    layui.layer.msg('注册成功')
                    $tologin.click()
                    $register[0].reset()
                } else {
                    // $('#tips').html('用户名已被占用，请重新注册')
                    layui.layer.msg('用户名也被占用，请重新注册')
                }
            }
        })

    })

    // 登陆功能请求
    $login.submit(function (e) {
        e.preventDefault()

        const data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function (res) {
                if (res.status == 1) {
                    // $('#tip').html('登录失败，用户名或密码错误')
                    layui.layer.msg('登录失败，用户名或密码错误')
                } else {
                    layui.layer.msg('登陆成功')
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                }
                console.log(res);
            }
        })
    })



























})