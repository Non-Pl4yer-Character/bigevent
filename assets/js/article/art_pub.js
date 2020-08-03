$(function () {

    initCate()
    initEditor()


    const $img = $('#img')

    const op = {
        aspectRatio: 400 / 300,
        preview: '.img-preview'
    }

    $img.cropper(op)



    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status == 0) {
                    const html = template('tpl-cate', res)
                    $('[name=cate_id]').html(html)
                    layui.form.render()
                }
            }
        })
    }


    // 图片
    $('#btnFile').click(function () {
        $('#file').click()
    })


    $('#file').change(function () {
        const file = $(this)[0].files
        console.log(file);
        if (file.length == 0) {
            return
        }
        var newImgURL = URL.createObjectURL(file[0])

        $img.cropper('destroy').attr('src', newImgURL
        ).cropper(op)
    })




    // 表单上传
    let state = '已发布'
    $('#caogao').click(function () {
        state = '草稿'

    })
    $('#form').submit(function (e) {
        e.preventDefault()
        const fd = new FormData(this)
        fd.append('state', state)

        $img.cropper('getCroppedCanvas', { width: 400, height: 200 }).toBlob(function (blob) {
            fd.append('cover_img', blob)

            $.ajax({
                method: 'post',
                url: '/my/article/add',
                data: fd,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.status == 1) {
                        return layer.msg(res.message)

                    }
                    window.parent.document.querySelector('#a2').className = 'layui-this'
                    window.parent.document.querySelector('#a3').className = ''
                    location.href = '/article/art_list.html'
                }
            })

            console.log(...fd);

        })


    })



})