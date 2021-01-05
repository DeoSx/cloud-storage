const config = require('config')
const fs = require('fs')
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

  async uploadFile(req, res) {
    try {
      const file = req.files.file
      const parent = await File.findOne({
        user: req.user.id,
        _id: req.body.parent
      })
      const user = await User.findOne({ _id: req.user.id })

      if (user.usedSpace + file.size > user.diskSpace) {
        return res
          .status(400)
          .json({ message: 'You have not free space to upload that file' })
      }

      let path
      if (parent) {
        path = `${config.get('filePath')}/${user._id}/${parent.path}/${
          file.name
        }`
      } else {
        path = `${config.get('filePath')}/${user._id}/${file.name}`
      }

      if (fs.existsSync(path)) {
        return res.status(400).json({ message: 'File already exist' })
      }

      file.mv(path)

      const type = file.name.split('.').pop()
      let filePath = file.name
      if (parent) {
        return `${parent.path}/${file.name}`
      }

      const dbFile = await new File({
        name: file.name,
        type,
        size: file.size,
        user: user._id,
        path: filePath,
        parent: parent && parent._id
      })

      await user.save()
      await dbFile.save()
      res.json(dbFile)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: 'Upload file error' })
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id })
      const path =
        config.get('filePath') +
        `/${req.user.id}${file.path ? '/' + file.path : ''}/${file.name}`

      console.log(path)
      if (fs.existsSync(path)) {
        return res.download(path, file.name)
      }

      return res.status(400).json({ message: 'Download file error' })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: 'Download file error' })
    }
  }

  async deleteFile(req, res) {
    try {
      const file = await File({ _id: req.query.id, user: req.user.id })
      if (!file) {
        return res.status(404).json({ message: 'File not found' })
      }
      fileService.deleteFile(file)
      await file.remove()
      return res.json({ message: 'File was deleted' })
    } catch (e) {
      console.error(e)
      return res
        .status(400)
        .json({ message: 'Error, maybe directory not empty' })
    }
  }
}

module.exports = new FileController()
