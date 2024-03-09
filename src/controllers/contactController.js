const Contact = require('../models/ContactModel')

exports.index = (req, res) => {
    res.render('contact')
}

exports.register = async (req, res) => {
    try{
        const contact = new Contact(req.body)
    await contact.register()
    if(contact.errors.length > 0){
        req.flash('errors', contact.errors)
        req.session.save(() => res.redirect('back'))
        return
    }

    req.flash('success', 'Contact saved')
    req.session.save(() => res.redirect(`/contact/index/${contact.contact._id}`))
    return
    } catch(e){
        console.log(e)
        return res.render('404')
    }
    
}

exports.editIndex = function(req, res){
    if (!req.params.id) return res.render('404')
    res.render('contact')
}