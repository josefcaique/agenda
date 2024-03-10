const Contact = require('../models/ContactModel')

exports.index = (req, res) => {
    res.render('contact', {
        contact: {},
        user: req.session.user
    })
}

exports.register = async (req, res) => {
    try{
        const contact = new Contact(req.body)
        await contact.register()
        if(contact.errors.length > 0){
            req.flash('errors', contact.errors)
            req.session.save(() => res.redirect('/contact/index'))
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

exports.editIndex = async function(req, res){
    if (!req.params.id) return res.render('404')
    const contact = await Contact.searchId(req.params.id)
    if (!contact) return res.render('404')
    res.render('contact', { contact })
}

exports.edit = async function(req, res){
    try{
        if (!req.params.id) return res.render('404')
        const contact = new Contact(req.body)
        await contact.edit(req.params.id)

        if(contact.errors.length > 0){
            req.flash('errors', contact.errors)
            req.session.save(() => res.redirect('back'))
            return
        }

        req.flash('success', 'Contact updated')
        req.session.save(() => res.redirect(`/contact/index/${contact.contact._id}`))
        return
    } catch(e){
        console.log(e)
        res.render('404')
    }
    
}

exports.delete = async function(req, res){
    if (!req.params.id) return res.render('404')
    const contact = await Contact.deleteContact(req.params.id)
    if (!contact) return res.render('404')

    req.flash('success', 'Contact deleted')
    req.session.save(() => res.redirect('back'))
    return
}