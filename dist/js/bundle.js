!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n(1);var o=n(2);function i(){var t=document.getElementById("header"),e=document.getElementById("start-panel"),n=document.getElementById("game-container");t.classList.toggle("hidden"),e.classList.toggle("hidden"),n.classList.toggle("hidden")}function r(){document.querySelectorAll(".map-item").forEach(function(t){return t.classList.remove("map-item_correct")}),i()}window.addEventListener("DOMContentLoaded",function(){document.getElementById("btn_start").addEventListener("click",function(){i(),a.init()})});var a={timeContainer:document.getElementById("time"),pointsContainer:document.getElementById("points"),gameCountry:document.getElementById("game-country"),mapItems:document.querySelectorAll(".map-item"),init:function(){a.stopCounting=!1,a.letClick=!0,a.points=0,a.pointsContainer.textContent=a.points,a.time=100,a.setCounties(),a.mapItems.forEach(function(t){return t.addEventListener("click",a.checkAnswer)})},setCounties:function(){for(var t in a.countriesArr=[],o.EuropePL)o.EuropePL.hasOwnProperty(t)&&a.countriesArr.push(t);a.maxPoints=2*a.countriesArr.length,a.startRound()},setTime:function(){a.time=100},setCountry:function(){var t=Math.floor(Math.random()*(a.countriesArr.length-1));a.currentCountry=a.countriesArr[t],a.gameCountry.classList.remove("game-country_correct"),a.gameCountry.classList.remove("game-country_wrong"),a.gameCountry.textContent=o.EuropePL[a.currentCountry]},removeCountry:function(t){var e=a.countriesArr.indexOf(t);a.countriesArr.splice(e,1)},counting:function(){a.time>=50?(a.timeContainer.classList.add("time_good"),a.timeContainer.classList.remove("time_enough")):a.time<50&&a.time>0?(a.timeContainer.classList.add("time_enough"),a.timeContainer.classList.remove("time_good")):(a.timeContainer.classList.remove("time_good"),a.timeContainer.classList.remove("time_enough")),!a.stopCounting&&a.time>0?(a.time-=1,a.timeContainer.textContent=a.time/10%1==0?a.time/10+".0":a.time/10,setTimeout(a.counting,100)):a.time<=0&&(a.points--,a.pointsContainer.textContent=a.points,a.stopCounting=!0,a.time=100,a.gameCountry.classList.add("game-country_wrong"),window.setTimeout(a.startRound,700))},startRound:function(){a.countriesArr.length>0?(a.stopCounting=!1,a.letClick=!0,a.setCountry(),a.stopCounting=!1,a.setTime(),a.counting()):a.endGame()},checkAnswer:function(t){if(a.stopCounting=!0,a.letClick){a.letClick=!1;var e=t.target.id;e==a.currentCountry?(a.time>=50?a.points+=2:a.points++,t.target.removeEventListener("click",a.checkAnswer),t.target.classList.add("map-item_correct"),a.removeCountry(e),a.gameCountry.classList.add("game-country_correct")):(a.points--,t.target.classList.add("map-item_wrong"),a.gameCountry.classList.add("game-country_wrong"),window.setTimeout(function(){t.target.classList.remove("map-item_wrong")},700)),a.pointsContainer.textContent=a.points,a.stopCounting=!0,window.setTimeout(a.startRound,700)}},endGame:function(){var t=document.createElement("button");t.classList.add("btn_restart"),t.textContent="Zagraj ponownie",t.addEventListener("click",r),a.gameCountry.textContent="Gratulacje, ukończyłeś grę!",a.gameCountry.appendChild(t),a.pointsContainer.textContent=a.points+" / "+a.maxPoints}}},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.EuropePL={AL:"Albania",AD:"Andora",AT:"Austria",BE:"Belgia",BG:"Bułgaria",BA:"Bośnia i Hercegowina",BY:"Białoruś",CH:"Szwajcaria",CZ:"Czechy",CY:"Cypr",DE:"Niemcy",DK:"Dania",EE:"Estonia",FI:"Finlandia",GB:"Wielka Brytania",GR:"Grecja",HR:"Chorwacja",HU:"Węgry",IE:"Irlandia",IS:"Islandia",IT:"Włochy",LI:"Liechtenstein",LT:"Litwa",LU:"Luksemburg",LV:"Łotwa",MD:"Mołdawia",MK:"Macedonia",ME:"Czarnogóra",NL:"Holandia",NO:"Norwegia",PL:"Polska",PT:"Portugalia",RO:"Rumunia",RS:"Serbia",SK:"Słowacja",SI:"Słowenia",SE:"Szwecja",TR:"Turcja",UA:"Ukraina",FR:"Francja",ES:"Hiszpania",XK:"Kosowo"}}]);
//# sourceMappingURL=bundle.js.map