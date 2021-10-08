const moment = require('moment');

function validateBirthDate(date) {

    let isValid = true;

    let birthDateIsValid = moment(date, 'YYYY-MM-DD', true).isValid();
    
    if (!birthDateIsValid) {
        isValid = false;
    }

    const currentDate = moment();
    const birthDate = moment(date);

    if(currentDate < birthDate || currentDate.year() - birthDate.year()  > 120) {
        isValid = false;
    }

    return isValid;
}

module.exports = validateBirthDate