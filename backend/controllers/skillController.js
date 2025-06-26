const skillModel = require('../models/skillModel')
const getFullUrl = require('../utils/pathHelper')

class SkillController{
    async getSkills(req, res){
        try{
            const skills = await skillModel.find()

            const formattedSkills = skills.map(skill => ({
                ...skill.toObject(),
                thumb: getFullUrl(skill.thumb)
            }))

            res.status(200).json(formattedSkills)
        }catch(err){
            res.status(500).json({err: "Server error:" + err.message})
        }
    }
}

module.exports = new SkillController()