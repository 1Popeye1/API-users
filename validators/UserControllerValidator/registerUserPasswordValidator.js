const containsLowercase = require("../containsLowercase")
const containsNumber = require("../containsNumber")
const containsSpecialCharacter = require("../containsSpecialCharacter")
const containsUppercase = require("../containsUppercase")
const greaterThanEightCharacters = require("../greaterThanEightCharacters")

/**
 * Validate a password to check if is valid or not
 * @param {string} value 
 */
const validator = (value) => {
    
    const validators = new Map()

    validators.set('Must contain at least one lowercase', containsLowercase)
    validators.set('Must contain at least one number', containsNumber)
    validators.set('Must contain at least one special character', containsSpecialCharacter)
    validators.set('Must contain at least one uppercase', containsUppercase)
    validators.set('Must be greater than 8 characters', greaterThanEightCharacters)



    validators.forEach((validator, errorMessage) => {
        if (!validator(value))
        throw new Error(errorMessage)
    })

    return true
}

module.exports = validator