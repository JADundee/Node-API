const User = require('../model/User')

const handleLogout = async (req, res) => {
    // on client, also delete accessToken
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // No content to send back
    const refreshToken = cookies.jwt

    // is refreshToken in DB?
    const foundUser = await User.findOne({ refreshToken }).exec()
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None', secure: true }) // secure: true - only serves on https for production
        return res.sendStatus(204) // successful, no content to send back
    }
    // delete refreshToken in DB
    foundUser.refreshToken = ''
    const result = await foundUser.save()
    console.log(result)

    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None', secure: true }) // secure: true - only serves on https for production
    res.sendStatus(204) // successful, no content to send back
}

module.exports = { handleLogout }