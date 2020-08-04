$(function () {
    const id = location.search.split('=')[1]
    console.log(id);
    const op = {
        aspectRatio: 400 / 300,
        preview: '.img-preview'
    }
    $.ajax({
        method: 'get',
        url: '/my/article/' + id,
        success: function (res) {
            console.log(res);
            $('#id').val(id)
            layui.form.val('formInfo', res.data)
            res.data && initCate(res.data.cate_id)
            if (res.data) {
                const src = 'http://ajax.frontend.itheima.net' + res.data.cover_img
                $('#img').cropper('destroy').attr('src', src).cropper(op)
            }
        }
    })

    function initCate(cate_id) {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status == 0) {

                    const html = template('tpl-cate', { data: res.data, cate_id: cate_id })
                    $('[name=cate_id]').html(html)
                    layui.form.render()
                }
            }
        })
    }
    if (location.search) {
        $('#create').hide()
        $('#update').show()
    } else {
        $('#create').show()
        $('#update').hide()
    }



    $('#update').click(function () {
        state = '已发布'
        getAjax = noSameBtn('/my/article/edit')
    })
    $('#cun').click(function () {
        state = '草稿'
        getAjax = noSameBtn('/my/article/edit')
    })

})