import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthReq } from '../types/user';



export default function authMiddleware(req:AuthReq, res:Response, next:NextFunction) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'User is not authorized' });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = JSON.parse(JSON.stringify(decoded));
        next();
    }
    catch (e) {
        console.log(e);
        res.status(401).json({ message: 'User is not authorized' });
    }
}
