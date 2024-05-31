const user_model = require('../models/user.js');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const type_class = 'student';
  if (!email || !password || !name || !type_class)
    return res.status(400).json({ msg: "Datos incompletos" });

  // el usuario ya existe?
  const user = await user_model.findOne({ email });
  if (user) return res.status(400).json({ msg: "El usuario ya existe" });

  const newUser = new user_model({
    email,
    password,
    name,
    type_class
  });
  newUser.save();

  return res.status(201).json(newUser);
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await user_model.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) return res.status(500).json({ msg: 'Error al iniciar sesión' });
      if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
        expiresIn: '1h',
      });

      res.json({ token, name: user.name ,email:user.email});
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error al iniciar sesión' });
  }
}

const getUserByEmail = async (req, res) => {
  try {
    const useremail = req.params.useremail;
    const user = await user_model.findOne({ email : useremail });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

module.exports = { register, login, getUserByEmail};
