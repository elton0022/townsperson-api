const moment = require('moment');

function validateBirthDate(date) {

    const currentDate = moment();
    const birthDate = moment(date);

    if(currentDate < birthDate || currentDate.year() - birthDate.year()  > 120) {
        return false;
    }

    let birthDateIsValid = moment(date, 'YYYY-MM-DD', true).isValid();

    if (!birthDateIsValid) {
        return false;
    }

    return true;
}

module.exports = validateBirthDate