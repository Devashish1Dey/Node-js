const { getUser } = require('../service/auth')

function checkForAuthentication(req, res, next) {
    // const authorizationHeaderValue = req.headers['authorization']
    const tokenCookie = req.cookies?.token
    req.user = null
    // if (!authorizationHeaderValue || !authorizationHeaderValue.startswith('Bearer')) {
    //     return next()
    // }
    if(!tokenCookie) return next()

    // const token = authorizationHeaderValue.split("Bearer ")[1]
    const token = tokenCookie
    const user = getUser(token)

    req.user = user
    return next()
}

// async function restrictToLoggedinUserOnly(req, res, next) {
//     // const userUid = req.cookies?.uid
//     const userUid = req.headers['authorization']
//     console.log(req.headers)

//     if(!userUid) return res.redirect('/login')
//     const token = userUid.split("Bearer ")[1]   // 'Bearer [4346duwdwsls63]'

//     const user = getUser(token)
//     // const user = getUser(userUid)

//     if (!user) return res.redirect('/login')

//     req.user = user
//     next()
// }

// async function checkAuth(req, res, next) {
//     console.log(req.headers)
//     // const userUid = req.cookies?.uid
//     const userUid = req.headers['authorization']
//     const token = userUid.split("Bearer ")[1]

//     // const user = getUser(userUid)
//     const user = getUser(token)

//     req.user = user
//     next()
// }

function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login')

        if (!roles.includes(req.user.role)) return res.end("UnAuthorized")

        return next()
    }
}

module.exports = {
    // restrictToLoggedinUserOnly,
    // checkAuth,
    checkForAuthentication,
    restrictTo,
}