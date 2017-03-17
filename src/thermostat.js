'use strict';

function Thermostat (){
  this._temperature = 20;
  this._minTemperature = 10;
  this._maxTemperature = 32;
  this._psMaxTemperature = 25;
  this._powerSaving = true;
}

Thermostat.prototype.checkCurrentTemperature = function () {
  return this._temperature;
};

Thermostat.prototype.checkPowerSavingMode = function () {
  return this._powerSaving;
};

Thermostat.prototype.checkMaxTemp = function(){
  return this.checkPowerSavingMode() ? this._psMaxTemperature : this._maxTemperature;
};

Thermostat.prototype.switchMode = function () {
  this._powerSaving = !this._powerSaving;
  if (this._temperature > this._psMaxTemperature) {
    this._temperature = this._psMaxTemperature;
  };
};

Thermostat.prototype.reset = function () {
  this._temperature = 20
}

Thermostat.prototype.increase = function () {
  if (this._temperature < this.checkMaxTemp()) {
    this._temperature += 1;
  } else {
    throw new Error('Maximum temperature is reached!');
  }
};

Thermostat.prototype.decrease = function() {
  if (this._temperature > this._minTemperature) {
    this._temperature -= 1;
  } else {
    throw new Error('Minimum temperature 10!');
  }
};

Thermostat.prototype.checkUsage = function () {
  var usage;
  if (this._temperature < 18) {
    usage = "Low-usage";
  } else if (this._temperature < 25) {
    usage = "Medium-usage";
  } else {
    usage = "High-usage";
  };
  return usage;
};
