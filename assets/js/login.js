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

})