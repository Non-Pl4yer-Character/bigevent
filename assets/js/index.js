$(function () {

    getUserInfo()

    $('#btnLogout').click(function () {

        //eg1
        layer.confirm('确定退出登录吗？', { icon: 3, title: '提示' }, function (index) {
            //do something

            localStorage.removeItem('token')

            location.href = '/login.html'

            layer.close(index);
        });

    })






})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',

        success: function (res) {
            console.log(res);
            if (res.status == 0) {
                getUserPic(res.data)
            } else {
                $('#welcome').html('未登录')

            }
        }
    })

    // 渲染头像
    function getUserPic(user) {
        const name = user.nickname || user.username
        $('.text-avatar').html(name[0].toUpperCase())
        $('#welcome').html('欢迎 ' + name)
        if (user.user_pic) {
            $('.text-avatar').hide()
            $('.layui-nav-img').show().attr('src', user.user_pic)
        } else {
            $('.text-avatar').show()
            $('.layui-nav-img').hide()
        }
    }
}