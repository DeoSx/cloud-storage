const { Router } = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const fileController = require('../controllers/fileController')

const router = Router()

router.post('', authMiddleware, fileController.createDir)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.get('', authMiddleware, fileController.fetchFiles)
router.get('/download', authMiddleware, fileController.downloadFile)

module.exports = router
