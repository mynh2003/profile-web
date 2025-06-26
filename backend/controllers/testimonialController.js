const testimonialModel = require('../models/testimonialModel')
const getFullUrl = require('../utils/pathHelper')

class TestimonialController{

    async getTestimonial(req, res){
        try{
            const testimonials = await testimonialModel.find()

            const formattedTestimonial = testimonials.map(testimonial => ({
                ...testimonial.toObject(),
                avatar: getFullUrl(testimonial.avatar)
            }))

            res.status(200).json(formattedTestimonial)
        }catch(err){
            res.status(500).json({err: "Server errorr: "+ err.message})
        }
    }
}

module.exports = new TestimonialController()