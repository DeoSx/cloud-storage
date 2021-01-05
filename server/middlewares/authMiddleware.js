const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  try {
    if (req.method === 'OPTIONS') {
      return next()
    }

    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).send({ message: 'Auth error' })
    }

    const decoded = jwt.verify(token, config.get('secretKey'))
    req.user = decoded
    next()
  } catch (e) {
    console.log(e)
    return res.status(401).send({ message: 'Auth error' })
  }
}
