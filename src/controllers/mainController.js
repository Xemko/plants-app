const mainService = require('../services/mainService');

const signIn = async (req, res) => {
    // const plants = await mainService.signIn();
    res.send('sign-in page is under construction');
}

const auth = async (req, res) => {
    // const plants = await mainService.auth();
    res.send('auth page is under construction');
}

module.exports = {
    signIn,
    auth
}