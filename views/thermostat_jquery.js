$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();
  getWeather();

$('#temperature-up').click(function(){
  thermostat.increase();
  updateTemperature();
})

$('#temperature-down').click(function(){
  thermostat.decrease();
  updateTemperature();
})

$('#temperature-reset').click(function(){
  thermostat.reset();
  updateTemperature();
})

$('#power-saving').click(function(){
  thermostat.switchMode();
  $('#ps').text(thermostat.checkPowerSavingMode());
  updateTemperature();
})

 function updateTemperature(){
   $('#temperature').text(thermostat.checkCurrentTemperature());
 };

 function getWeather(){
   $.get("http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=15910454694d5f5407a95b7c04abe2a9&units=metric", function(data) {
     $('#get-weather-desc').text(data.weather[0].description);
     $('#get-weather-temp').text(data.main.temp + "°");
     console.log(data);
   })
 }
});
