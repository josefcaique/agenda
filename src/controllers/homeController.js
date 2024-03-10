const Contact = require('../models/ContactModel')

exports.index = async (req, res) => {
    const contacts = await Contact.searchContact()
    console.log('this is the contacts:', contacts)
    res.render('index', { contacts })
}