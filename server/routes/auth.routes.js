const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const File = require('../models/File')
const authMiddleware = require('../middlewares/authMiddleware')
const fileServices = require('../services/fileServices')

const router = Router()

router.post(
  '/registration',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Password must be longer than 3 or 12').isLength({
      min: 3,
      max: 12
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).send({ message: 'Uncorrect request', errors })
      }

      const { email, password } = req.body

      const candidate = await User.findOne({ email })
      if (candidate) {
        return res
          .status(400)
          .send({ message: `User with email ${email} already exist` })
      }

      const hashPassword = await bcrypt.hash(password, 8)

      const user = new User({ email, password: hashPassword })
      await user.save()
      await fileServices.createDir(new File({ user: user.id, name: '' }))

      return res.json({ message: 'User was created' }) 
    } catch (e) {
      console.error(e)
      res.status(500).send({ message: 'Server error' })
    }
  }
)

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).send({ message: 'Invalid email or password' })
    }

    const isPassValid = bcrypt.compareSync(password, user.password)

    if (!isPassValid) {
      return res.status(400).send({ message: 'Invalid email or password' })
    }

    const token = jwt.sign({ id: user.id }, config.get('secretKey'), {
      expiresIn: '2h'
    })

    return res.send({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace
      }
    })
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Server error' })
  }
})

router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id })
    const token = jwt.sign({ id: user.id }, config.get('secretKey'), {
      expiresIn: '2h'
    })

    return res.send({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace
      }
    })
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Server error' })
  }
})

module.exports = router
