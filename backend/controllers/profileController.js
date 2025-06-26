const profileModel = require('../models/profileModel')
const Profile = require('../models/profileModel')
const getFullUrl = require('../utils/pathHelper')

class ProfileController {
  async getAllProfiles(req, res) {
    try {
      const profile = await Profile.findOne()

      const formattedProfile = {
        ...profile.toObject(),
        avatar: getFullUrl(profile.avatar)
      }
      res.json(formattedProfile)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  async getTabByName(req, res) {
    try {
      const { name } = req.params

      const profile = await profileModel.findOne()

      let tab = profile.tab.find(t => t.name === name)

      if (tab.name === 'picture') {
        tab = {
          ...tab,
          content: Array.isArray(tab.content) ? tab.content.map(item => getFullUrl(item)) : getFullUrl(tab.content)
        }
      }

      res.status(200).json(tab)

    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

module.exports = new ProfileController
