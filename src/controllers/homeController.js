const Contact = require('../models/ContactModel')

exports.index = async (req, res) => {
    const id = req.session.user._id
    const contacts = await Contact.searchContact(id)
    res.render('index', { contacts })
}