import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (token === undefined) return next({ status: 403, message: "Token is not provided" });

    jwt.verify(token, process.env.JWT_SECRET, (e, decoded) => {
        if (e) {
            if (e.name === 'TokenExpiredError') return next({ status: 401, message: "Token has expired" });
            if (e.name === 'JsonWebTokenError') return next({ status: 401, message: "Incorrect JWT" });
        } else {
            req.username = decoded.data;
            next();
        }
    });
}