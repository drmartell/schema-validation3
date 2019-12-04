const Validator = require('./Validator.js');

class Schema {
  constructor(schemaDefinition) {
    this.validators =
      Object.entries(schemaDefinition)
        .map(entry => new Validator(entry[0], entry[1]));
    this.schemaDefinition = schemaDefinition;
  }
  validate(object) {
    const errors = [];

    for(let key in this.schemaDefinition) {
      if(this.schemaDefinition[key].required && !object[key]) errors.push(`required field >>${key}<< missing`);
    }

    const result = Object.entries(object).reduce((acc, cur) => {
      try {
        const validator = this.validators
          .find(validator => validator.field === cur[0]);
        acc[cur[0]] = validator.validate(object);
      }
      catch(e) {
        errors.push(e);
      }
      return acc;
    }, {});
    if(errors.length > 0) throw (`Invalid schema ${errors.join(', ')}`);
    return result;
  }
}

module.exports = Schema;
