const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const number = phoneUtil.parseAndKeepRawInput('054 6211 013', 'IL');
console.log(number.getCountryCode());