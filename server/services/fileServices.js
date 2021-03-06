const fs = require('fs')
const path = require('path')
const config = require('config')
const File = require('../models/File')

class FileService {
  createDir(file) {
    const filePath = path.join(__dirname, `../files/${file.user}/${file.path}`)
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({ message: 'File was created' })
        } else {
          return reject({ message: 'File already exist' })
        }
      } catch (e) {
        console.log(e)
        reject({ message: 'File error' })
      }
    })
  }
  deleteFile(file) {
    const path = this.getPath(file)
    if (file.type === 'dir') {
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
  }

  getPath(file) {
    return `${config.get('filePath')}/${file.user}/${file.path}`
  }
}

module.exports = new FileService()
