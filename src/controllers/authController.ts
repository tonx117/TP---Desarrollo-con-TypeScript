import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

class AuthController {
  private static instance: AuthController;

  private constructor() {}

  public static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  public async createAdmin() {
    const adminExists = await User.findOne({ username: 'Admin' });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Admin', 10);
      const admin = new User({
        username: 'Admin',
        password: hashedPassword,
        role: 'admin',
      });

      await admin.save();
      console.log('Admin creado');
    }
  }

  public async register(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'El usuario ya existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const role = username === 'Admin' ? 'admin' : 'employee';
      const newUser = new User({ username, password: hashedPassword, role });

      await newUser.save();
      res.status(201).json({ success: true, message: 'Usuario registrado con éxito' });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
    }
  }

  public async login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ success: false, message: 'Usuario no encontrado' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      res.status(200).json({ success: true, token, role: user.role });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
    }
  }
}

export default AuthController.getInstance();
