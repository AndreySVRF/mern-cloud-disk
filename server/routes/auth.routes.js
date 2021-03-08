const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

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

      const hashPassword = await bcrypt.hash(password, 15);
      const user = new User({ email, password: hashPassword });

      await user.save();

      return res.status(200).json({ message: `User ${email} was created` });

    } catch (e) {
      console.log(e.message);
      res.send({ message: e.message });
    }
  });

module.exports = router;
