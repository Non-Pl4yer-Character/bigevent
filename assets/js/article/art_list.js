$(function () {
    const op = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    function putList() {


        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: op,
            success: function (res) {
                console.log(res);
                const html = template('putList', res)
                $('#tb').html(html)
                pageBox(res.total)
            }
        })
    }

    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function (res) {
            const html = template('tpl-cates', res)
            $('.cate_name').html(html)
            layui.form.render()
        }
    })


    // 筛选
    $('#form-shai').submit(function (e) {
        e.preventDefault()

        const cate = $('.cate_name').val()
        const state = $('.state').val()

        op.cate_id = cate
        op.state = state
        putList()
    })

    putList()

    // 美化时间格式

    template.defaults.imports.dateFormat = function (date) {
        const ndate = new Date(date)

        const y = parseZero(ndate.getFullYear())
        const m = parseZero(ndate.getMonth() + 1)
        const d = parseZero(ndate.getDate())

        const HH = parseZero(ndate.getHours())
        const MM = parseZero(ndate.getMinutes())
        const SS = parseZero(ndate.getSeconds())

        return y + '-' + m + '-' + d + ' ' + HH + ':' + MM + ':' + SS

        function parseZero(x) {
            if (x < 10) {
                x = '0' + x
            }
            return x
        }
    }


    // 分页
    function pageBox(total) {
        layui.laypage.render({
            elem: 'pageBox',
            count: total,
            limit: op.pagesize,
            limits: [2, 3, 4, 5],
            curr: op.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                op.pagesize = obj.limit
                op.pagenum = obj.curr
                if (first) {
                    return
                }

                putList()
            }
        })
    }

    // 删除

    function delArt() {
        $('#tb').on('click', '.del', function () {
            const id = $(this).attr('data-id')
            const leng = $('.del').length
            console.log(1);
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    console.log(res);
                    if (res.status == 0) {

                        leng == 1 && op.pagenum > 1 && op.pagenum--
                        putList()

                        return layer.msg(res.message)
                    } else {
                        return layer.msg(res.message)
                    }
                }
            })
        })
    }
    delArt()
})