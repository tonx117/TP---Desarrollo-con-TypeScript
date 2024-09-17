import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

class AuthMiddleware {
  private static instance: AuthMiddleware;

  private constructor() {}

  public static getInstance(): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  public authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó token' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido' });
    }
  }
}

export default AuthMiddleware.getInstance();
