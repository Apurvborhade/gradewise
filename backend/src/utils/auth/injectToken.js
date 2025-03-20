export const injectToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        req.headers['authorization'] = `Bearer ${token}`
    }

    next()
}