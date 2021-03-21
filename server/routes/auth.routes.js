const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');
const fileService = require('../services/fileService');
const File = require('../models/File');

const router = Router();

router.post('/registration',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Password must be longer than 4 and shorted than 24').isLength({ min: 4, max: 24 })
  ],
  async (req, res) => {
    try {

      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({ message: 'Uncorrect result', error });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: `User with email ${email} already exist` });
      }

      const hashPassword = await bcrypt.hash(password, 8);
      const user = new User({ email, password: hashPassword });

      await user.save();

      await fileService.createDir(new File({ user: user.id, name: '' }));

      return res.status(200).json({ message: `User ${email} was created` });

    } catch (e) {
      console.log(e.message);
      res.send({ message: e.message });
    }
  });

router.post('/login',
  async (req, res) => {
    try {

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: `User ${email} not found` });
      }

      const isPassValid = bcrypt.compareSync(password, user.password);

      if (!isPassValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

      return res.status(200).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar
        }
      });

    } catch (e) {
      console.log(e.message);
      res.send({ message: e.message });
    }
  });

router.get('/auth',
  authMiddleware,
  async (req, res) => {
    try {

      const user = await User.findOne({ _id: req.user.id });

      const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

      return res.status(200).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar
        }
      });

    } catch (e) {
      console.log(e.message);
      res.send({ message: e.message });
    }
  });

module.exports = router;
