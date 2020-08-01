$(function () {

    const $img = $('#img')
    const $file = $('#file')
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $img.cropper(options)


    $('#sub').click(function () {
        console.log(123);
        $file.click()
    })

    $file.change(function () {
        //    文件创建成路径
        const imgurl = URL.createObjectURL($file[0].files[0])
        // 销毁旧图，生成新图
        $img.cropper('destroy').attr('src', imgurl).cropper(options)


        // 提交
        $('#confirm').click(function () {
            console.log(123);
            const dataUrl = $img.cropper('getCroppedCanvas', { width: 100, height: 100 }).toDataURL('image/png')
            console.log(dataUrl);
            $.ajax({
                method: 'post',
                url: '/my/update/avatar',
                // dataType: 'jsonp',
                data: { avatar: dataUrl },
                success: function (res) {
                    console.log(res);
                    if (res.status == 0) {
                        window.parent.getUserInfo()
                        return layer.msg('更换头像成功')
                    } else {
                        return layer.msg(res.message)
                    }
                }
            })
        })

    })



})