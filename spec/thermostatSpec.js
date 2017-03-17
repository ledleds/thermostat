'use strict';

describe('Thermostat', function() {
  var thermostat;
  var maxMessage;
  var minMessage;

  beforeEach(function() {
    thermostat = new Thermostat();
    maxMessage = ('Maximum temperature is reached!');
    minMessage = ('Minimum temperature 10!');
  });

  it('starts at 20 degrees', function() {
    expect(thermostat._temperature).toEqual(20);
  });

  it('has a minimum temperature', function() {
    expect(thermostat._minTemperature).toEqual(10);
  });

  it('has a maximum temperature', function() {
   expect(thermostat._maxTemperature).toEqual(32);
  });

  it('return the current temperature', function() {
    expect(thermostat.checkCurrentTemperature()).toEqual(20);
  });

  it("can reset temperature to 20", function() {
    thermostat.increase();
    thermostat.reset();
    expect(thermostat._temperature).toEqual(20);
  });

  describe('Increase', function(){

    it('increases the temperature by 1', function() {
      thermostat.increase();
      expect(thermostat._temperature).toEqual(21);
    });

    it('wont\'t allow to increase past max temperature', function() {
      thermostat.switchMode();
      thermostat._temperature = 32;
      expect(function(){thermostat.increase();}).toThrowError(maxMessage);
    });
  });

  describe('Decrease', function(){

    it('decreases temperature by 1', function() {
      thermostat.increase();
      thermostat.decrease();
      expect(thermostat._temperature).toEqual(20);
    });

    it('wont\'t allow to decrease past min temperature', function() {
      thermostat._temperature = 10;
      expect(function(){thermostat.decrease();}).toThrowError(minMessage)
    });
  });

  describe("power saving mode", function() {

    it('checks the maximum temp when ON', function() {
      expect(thermostat.checkMaxTemp()).toEqual(25);
    });

    it('checks the maximum temp when OFF', function() {
      thermostat.switchMode();
      expect(thermostat.checkMaxTemp()).toEqual(32);
    });

    it('is on to begin', function() {
      expect(thermostat.checkPowerSavingMode()).toEqual(true);
    });

    it('wont\'t allow to increase past max temperature when ON', function() {
      thermostat._temperature = 25;
      expect(function(){thermostat.increase();}).toThrowError(maxMessage);
    });

    it("can be switched on or off", function() {
    thermostat.switchMode();
    expect(thermostat.checkPowerSavingMode()).toEqual(false);
    thermostat.switchMode();
    expect(thermostat.checkPowerSavingMode()).toEqual(true);
    });
  });

  describe("usage", function() {

    it("confirms low-usage if temperature is below 18", function() {
      thermostat._temperature = 17;
      expect(thermostat.checkUsage()).toEqual("Low-usage");
    });

    it("confirms medium-usage if temperature is below 25", function() {
      expect(thermostat.checkUsage()).toEqual("Medium-usage");
    });

    it("confirms high-usage if temperature is 25 or above", function() {
      thermostat._temperature = 25;
      expect(thermostat.checkUsage()).toEqual("High-usage");
    });
  });
});
