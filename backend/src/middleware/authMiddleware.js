import { auth } from "../config/firebaseadmin.js";
import AppError from "../utils/AppError.js"

export const decodeFirebaseIdToken = async (req, res, next) => {
    const tokenId = req.header('Authorization').split(' ')[1]

    if (!tokenId) {
        throw new AppError('You did not specify any idToken for this request')
    }
    try {
        // Use firebase-admin auth to verify the token passed in from the client header.
        // This is token is generated from the firebase client
        // Decoding this token returns the userpayload and all the other token claims you added while creating the custom token

        const userPayload = await auth.verifyIdToken(tokenId);

        req.user = userPayload;

        next();
    } catch (error) {
        next(error)
    }
}
export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            throw new AppError('Access Denied. No role assigned.', 401)
        }

        if (!allowedRoles.includes(req.user.role)) {
            throw new AppError(`Access Denied. Requires ${allowedRoles.join(", ")} role.`, 401)
        }

        next();

    }
}

export const isAuthorized = async (req, res, next) => {
    if (req.user) {
        next();
    } else {
        throw new AppError('You are not authorised to perform this action. SignUp/Login to continue', 401)
    }
};