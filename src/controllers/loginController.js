const Login = require('../models/loginModel')

exports.index = (req, res) => {
    res.render('login')
}

exports.register = async function(req, res) {
    try{
        const login = new Login(req.body)
        await login.register()
        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(function(){
                return res.redirect('back')
            })
            return
        }
        req.flash('success', 'Success to create a user')
        req.session.save(function(){
            return res.redirect('back')
        })
    } catch(e){
        console.log(e)
        res.render(404)
    }
}

exports.login = async function(req, res) {
    try{
        const login = new Login(req.body)
        await login.login()
        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(function(){
                return res.redirect('back')
            })
            return
        }

        req.flash('success', 'Success to login')
        req.session.user = login.user
        req.session.save(function(){
            return res.redirect('back')
        })
    } catch(e){
        console.log(e)
        res.render(404)
    }
}