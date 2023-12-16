const mainService = require('../services/main.service');

const signIn = async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
       return res.status(400).send('phoneNumber is required');
    }
    try {
        const user = await mainService.findUserByPhoneNumber(phoneNumber);
        if (!user) {
          return res.status(404).send('User not found');
        }
         return res.send(user);
    }
    catch (err) {
        return res.status(500).send('Internal server error');
    }
    
}

const auth = async (req, res) => {
    // const plants = await mainService.auth();
    res.send('auth page is under construction');
    
}

module.exports = {
    signIn,
    auth
}