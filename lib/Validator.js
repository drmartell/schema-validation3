const { getCaster } = require('./types.js');

class Validator {
  constructor(field, configuration) {
    this.field = field;
    this.configuration = configuration;
  }
  validate(object) {
    const caster = getCaster(this.configuration.type);
    if(!(this.field in object))
      if(this.configuration.required) throw (`Key >>${this.field}<< was not found in object.`);
      else return null;
    return caster(object[this.field]);
  }
}

module.exports = Validator;
