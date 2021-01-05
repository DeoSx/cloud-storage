const File = require('../models/File')
const User = require('../models/User')
const fileService = require('../services/fileServices')

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body
      const file = new File({ name, type, parent, user: req.user.id })
      const parentFile = await File.findOne({ _id: parent })

      if (!parentFile) {
        file.path = name
        await fileService.createDir(file)
      } else {
        file.path = `${parentFile.path}/${file.name}`
        await fileService.createDir(file)
        parentFile.childs.push(file._id)
        await parentFile.save()
      }
      await file.save()
      return res.send(file)
    } catch (e) {
      console.error(e)
      return res.status(400).json(e)
    }
  }

  async fetchFiles(req, res) {
    try {
      const files = await File.find({
        user: req.user.id,
        parent: req.query.parent
      })
      res.json(files)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new FileController()
