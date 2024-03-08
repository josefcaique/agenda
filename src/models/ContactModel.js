const mongoose = require('mongoose')
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true},
    lastName: { type: String, required: false, default: ''},
    email: { type: String, required: false, default: ''},
    phone: { type: String, required: false, default: ''},
    createdIn: { type: Date, default: Date.now }
})

const ContactModel = mongoose.model('Contact', ContactSchema)

class Contact{
    
    static async searchId(id){
    if(typeof id !== 'string') return
    return await ContactModel.findById(id)
    }

    constructor(body){
        this.body = body
        this.errors = []
        this.contact = null
    }

    async register(){
        this.valid()
        if (this.errors.length > 0) return
        this.contact = await ContactModel.create(this.body)
    }
    
    valid(){
        this.cleanUp()
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid email')
        if(!this.body.name) this.errors.push('Name field necessary')
        if(!this.body.email && !this.body.phone) {
            this.errors.push('Insert at least a phone number or an email')
        }
    }

    cleanUp(){
        for (let key in this.body){
            if(typeof(this.body[key]) !== 'String'){
                this.body[key]
            }
        }

        this.body = {
            name: this.body.name,
            lastName: this.body.lastName,
            email: this.body.email,
            phone: this.body.phone
        }
    }
}

module.exports = Contact