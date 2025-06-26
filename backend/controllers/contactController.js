const contactModel = require('../models/contactModel')
const getFullUrl = require('../utils/pathHelper')

class ContactController{

    async getContact(req, res){
        try{
            const contacts = await contactModel.find()

            const formattedContact = contacts.map(contact => ({
                ...contact.toObject(),
                logo: getFullUrl(contact.logo)
            }))

            res.status(200).json(formattedContact)
        }catch(err){
            res.status(500).json({err: "Server error: "+ err.message})
        }
    }
}

module.exports = new ContactController()