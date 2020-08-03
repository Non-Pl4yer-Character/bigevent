$(function () {
    function getArtCate() {

        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status == 0) {
                    const html = template('tpl-template', res)
                    $('#tb').html(html)
                }
            }
        })
    }
    getArtCate()


    $('#btnAddCate').click(function () {

        let html = layui.layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '新增类别',
            content: $('#layui-new').html()
        })

        $('body').on('submit', '#form-new', function (e) {
            e.preventDefault()

            const data = $(this).serialize()
            $.ajax({
                method: 'post',
                url: '/my/article/addcates',
                data: data,
                success: function (res) {
                    console.log(res);
                    if (res.status == 0) {
                        getArtCate()
                        layui.layer.close(html)
                    } else {
                        return layer.msg(res.message)
                    }
                }
            })
        })
    })


    $('#tb').on('click', '#edit', function () {

        const name = $(this).parent().siblings('.name').html()
        const alias = $(this).parent().siblings('.alias').html()
        let tan = layui.layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '编辑类别',
            content: $('#layui-edit').html(),
            // success: function (dom, i) {
            //     console.log(dom, i);
            // }
        })
        $('#form-edit [name="name"]').val(name)
        $('#form-edit [name="alias"]').val(alias)
        const id = parseInt($(this).parent().siblings('.id').html())
        $('body').on('submit', '#form-edit', function (e) {
            e.preventDefault()
            const data = $(this).serialize() + '&Id=' + id
            const data1 = $(this).serializeArray()
            let obj = {}
            obj.Id = id
            data1.forEach(function (val) {
                obj[val.name] = val.value
            })
            console.log(obj);
            console.log(data);
            $.ajax({
                method: 'post',
                url: '/my/article/updatecate',
                data: obj,
                success: function (res) {
                    console.log(res);
                    if (res.status == 0) {
                        getArtCate()
                        layui.layer.close(tan)
                    }
                    return layer.msg(res.message)

                }
            })
        })
    })

    $('#tb').on('click', '#del', function () {
        const id = $(this).parent().siblings('.id').html()
        console.log(id);
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    console.log(res);
                    if (res.status == 0) {
                        getArtCate()
                        return layer.msg('删除成功')
                    } else {
                        return layer.msg(res.message)
                    }
                }
            })
            layer.close(index);
        });

    })

})