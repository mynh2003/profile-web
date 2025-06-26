const projectMode = require('../models/projectModel')
const getFullUrl = require('../utils/pathHelper')

class ProjectController{
    async getProject(req, res){
        try{
            const { lastId, limit = 2} = req.query
            const parserLimit = parseInt(limit)

            const query = {}

            lastId ? query._id = {$gt: lastId}: undefined

            const projects = await projectMode.find(query)
            .sort({ _id: 1})
            .limit(parserLimit + 1)


            const hasMore = projects.length > parserLimit

            const limitProject = hasMore ? projects.slice(0, parserLimit) : projects

            const formattedProjects = limitProject.map(project => ({
                ...project.toObject(),
                thumb: getFullUrl(project.thumb)
            }))

            res.status(200).json({
                projects: formattedProjects,
                hasMore
            })
        }catch(err){
            res.status(500).json({err: 'Server error: ' + err.message})
        }
    }
}

module.exports = new ProjectController()