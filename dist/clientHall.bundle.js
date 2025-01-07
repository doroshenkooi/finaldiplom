/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/clientSeance.js":
/*!********************************!*\
  !*** ./src/js/clientSeance.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   exportSeanceId: () => (/* binding */ exportSeanceId)\n/* harmony export */ });\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function () {\r\n const cinemaEntryBtn = document.querySelector(\".go_cinema-entry\");\r\n  if (cinemaEntryBtn !== null){\r\n  cinemaEntryBtn.addEventListener(\"click\", () => {\r\n    window.location.href = \"login.html\";\r\n  });\r\n};\r\n\r\n  let date = new Date();\r\n  const days = [\"Вс,\", \"Пн,\", \"Вт,\", \"Ср,\", \"Чт,\", \"Пт,\", \"Сб,\"];\r\n\r\n  const seanceDays = document.querySelectorAll(\".seance_day\");\r\n  let selectedDate = null; \r\n \r\n  seanceDays.forEach((seanceDay, i) => {\r\n    let nextDate = new Date(date);\r\n    nextDate.setDate(date.getDate() + i);\r\n\r\n    const dayOfWeek = days[nextDate.getDay()];\r\n    const dateNext = nextDate.getDate();\r\n\r\n    const seanceDayWeek = document.createElement(\"div\");\r\n    seanceDayWeek.className = \"seance_day-week\";\r\n    seanceDayWeek.innerHTML = `\r\n          <span class=\"seance_day-week_today\">${i === 0 ? \"Сегодня\" : \"\"}</span>\r\n          <div class=\"seance_day-week_text-today\"> \r\n              <span class=\"seance_day-week_text\">${dayOfWeek}</span>\r\n              <span class=\"seance_day-data\">${dateNext}</span>\r\n          </div>`;\r\n\r\n    seanceDay.append(seanceDayWeek);\r\n    //сеасы открытых залов\r\n    if (dayOfWeek === \"Вс,\" || dayOfWeek === \"Сб,\") {\r\n      seanceDayWeek.querySelector('.seance_day-week_text').style.color = \"red\";\r\n      seanceDayWeek.querySelector('.seance_day-data').style.color = \"red\";\r\n    }\r\n    if (i === 6) {\r\n      const seanceDayWeekTextElements = document.querySelectorAll('.seance_day-week');\r\n      if (seanceDayWeekTextElements.length > 6) {\r\n        seanceDayWeekTextElements[6].classList.add('seance_day-week_text-today-six');\r\n        seanceDayWeekTextElements[6].textContent = '>';\r\n      }\r\n    }\r\n    if (i === 0) {\r\n      toggleClickClasses(seanceDay);\r\n      seanceDayWeek.style.marginTop = \"10px\" ;\r\n      document.querySelector('.seance_day-week_text-today').style.flexDirection = \"row\";\r\n    }\r\n\r\n    seanceDay.addEventListener(\"click\", () => {\r\n      // Убираем классы у всех дней сеансов\r\n      seanceDays.forEach((day) => toggleClickClasses(day, false));\r\n\r\n      // Добавляем классы к текущему кликнутому дню\r\n      toggleClickClasses(seanceDay);\r\n\r\n       // Сохраняем выбранную дату\r\n       selectedDate = nextDate.toISOString().split('T')[0];\r\n      \r\n       \r\n       // Добавляем классы к link-text\r\n       const linkTextElements = document.querySelectorAll('.link-text');\r\n       linkTextElements.forEach(linkText => {\r\n         linkText.classList.add(\"selected\"); \r\n       linkText.setAttribute(\"data-selected\", selectedDate); \r\n      \r\n      });\r\n\r\n    });\r\n  \r\n\r\n  function toggleClickClasses(seanceDay, toggle = true) {\r\n    const method = toggle ? \"add\" : \"remove\";\r\n\r\n    seanceDay.classList[method](\"seance_day-click\");\r\n    const weekToday = seanceDay.querySelector(\".seance_day-week_today\");\r\n    if (weekToday) {\r\n      weekToday.classList[method](\"seance_day-week_today-click\");\r\n    }\r\n    const weekText = seanceDay.querySelector(\".seance_day-week_text\");\r\n    if (weekText) {\r\n      weekText.classList[method](\"seance_day-week_text-click\");\r\n    }\r\n    const dateData = seanceDay.querySelector(\".seance_day-data\");\r\n    if (dateData) {\r\n      dateData.classList[method](\"seance_day-data-click\");\r\n    }\r\n  }\r\n  \r\n  function funFetch() {\r\n    fetch(\"https://shfe-diplom.neto-server.ru/alldata\")\r\n      .then((response) => response.json())\r\n      .then((data) => {\r\n        const hallClient = document.querySelector(\".hall-client\");\r\n        hallClient.innerHTML = \"\";\r\n        // открываем только открытые залы\r\n        data.result.halls.forEach((hall) => {\r\n          if (hall.hall_open == 1) {\r\n            let hallId = hall.id;\r\n            // находим id залa\r\n            data.result.seances.forEach((seance, i) => {\r\n              if (seance.seance_hallid == `${hallId}`) {\r\n                let filmSeanceId = seance.seance_filmid;\r\n                let hallName = hall.hall_name;\r\n                // находим данные сеанса\r\n                data.result.films.forEach((film, i) => {\r\n                  if (film.id == `${filmSeanceId}`) {\r\n                    let filmName = film.film_name;\r\n                    let filmPoster = film.film_poster;\r\n                    let filmDiscription = film.film_description;\r\n                    let filmDuration = film.film_duration;\r\n                    let filmOrigin = film.film_origin;\r\n\r\n                    const hallClient = document.querySelector(\".hall-client\");\r\n                    const sectionMovie = document.createElement(\"section\");\r\n                    sectionMovie.classList.add(\"section_movie\");\r\n                    const movieInfo = document.createElement(\"div\");\r\n                    movieInfo.classList.add(\"movie_info\" + i);\r\n                    movieInfo.innerHTML = `\r\n                        <img class=\"movie_poster\" src=\"${filmPoster}\">  \r\n         \r\n                        <div class=\"movie_discription\">\r\n                          <div class=\"movie_name\">\r\n                            <span class=\"movie_name-text\">${filmName}</span>\r\n                          </div> \r\n                          <div class=\"movie_synopsis\">\r\n                            <span class=\"movie_synopsis-text\">${filmDiscription}</span>\r\n                          </div>   \r\n                          <div class=\"movie_data\">\r\n                            <span class=\"movie_duration\">${filmDuration} минут</span>\r\n                            <span class=\"movie_origin\">${filmOrigin}</span>\r\n                          </div>   \r\n                        </div>    \r\n                       \r\n                       <div class=\"list\"></div>`;\r\n                    data.result.seances.forEach((seance, i) => {\r\n                      if (seance.seance_hallid == `${hallId}`) {\r\n                        let seanceTime = seance.seance_time;\r\n                        const list = document.createElement(\"div\");\r\n                        list.classList.add(\"list\" + i);\r\n                        list.innerHTML = `\r\n         \r\n                        <span class=\"movie_seances-text\">${hallName}</span>\r\n         \r\n                               <div class=\"item\">\r\n                                <button class=\"link\"> \r\n                                <span class=\"link-text\">${seanceTime}</span>\r\n                                   </button>\r\n                          </div>`;\r\n\r\n                        sectionMovie.append(list);\r\n                        sectionMovie.prepend(movieInfo);\r\n                        hallClient.append(sectionMovie);\r\n\r\n                        const currentDate = new Date();\r\n                        const day = String(currentDate.getDate()).padStart(2, \"0\");\r\n  const month = String(currentDate.getMonth() + 1).padStart(2, \"0\");\r\n  const year = currentDate.getFullYear();\r\n  let toDayData = `${year}-${month}-${day}`;\r\n                        \r\n                        const hours = currentDate\r\n                          .getHours()\r\n                          .toString()\r\n                          .padStart(2, \"0\");\r\n                        const minutes = currentDate\r\n                          .getMinutes()\r\n                          .toString()\r\n                          .padStart(2, \"0\");\r\n\r\n                        const timeNow = `${hours}:${minutes}`;\r\n\r\n                        const links =\r\n                          sectionMovie.querySelectorAll(\".link, .link-text\");\r\n\r\n                        links.forEach((link) => {\r\n                          link.addEventListener(\"click\", (event) => {\r\n                            const target = event.target.classList.contains('link') \r\n                       ? event.target.querySelector('.link-text') : event.target;\r\n                      let linkText = document.querySelector('.link-text');\r\n                       window.localStorage.setItem(\r\n                        \"linkText\",\r\n                        `${linkText}`\r\n                      );\r\n        let textButton = target.textContent;\r\n\r\n                            function extrMovie() {\r\n                              const movieElement =\r\n                                event.target.closest(\".section_movie\");\r\n                              if (movieElement) {\r\n                                // Находим элемент с текстом имени фильма\r\n                                const movieNameElement =\r\n                                  movieElement.querySelector(\r\n                                    \".movie_name-text\"\r\n                                  );\r\n                                if (movieNameElement) {\r\n                                  const movieName =\r\n                                    movieNameElement.textContent;\r\n                                  return movieName;\r\n                                }\r\n                              }\r\n                            }\r\nlet selectedDates  = linkText.getAttribute(\"data-selected\");\r\n\r\nwindow.localStorage.removeItem('selectedDates');\r\nwindow.localStorage.setItem('selectedDates', JSON.stringify(selectedDates));\r\n\r\nconsole.log(selectedDates);\r\nconsole.log(toDayData);\r\n\r\n                            if (timeNow < textButton || toDayData < selectedDates)\r\n                              {\r\n                              data.result.films.map((film) => {\r\n                                let movieNameText = extrMovie();\r\n\r\n                                if (film.film_name === movieNameText) {\r\n                                  let filmID = film.id;\r\n                                  console.log(filmID);\r\n\r\n                                  data.result.seances.map((seance) => {\r\n                                    if (seance.seance_filmid == `${filmID}` && seance.seance_time == textButton) {\r\n                                      let seanceId = seance.id;\r\n                                      window.localStorage.setItem(\r\n                                        \"seanceId\",\r\n                                        `${seanceId}`\r\n                                      );\r\n                                     window.location.href = \"clientHall.html\";\r\n                                  }\r\n                                  });\r\n                                }\r\n                              });\r\n                            } else alert(\"Сеанс закончился\");\r\n                            alert = function(){};\r\n                            alert(\"test\");\r\n                            \r\n                          });\r\n                        });\r\n                      }\r\n                    });\r\n                  }\r\n                });\r\n              }\r\n            });\r\n          }\r\n        });\r\n      });\r\n    //});  \r\n    \r\n    }\r\n if (i === 0) {\r\n  funFetch();\r\n  } \r\n   \r\n  });\r\n});\r\nfunction exportSeanceId() {\r\n  const seanceId = window.localStorage.getItem(\"seanceId\");\r\n  return seanceId;\r\n}\r\n\n\n//# sourceURL=webpack://finaldiploma/./src/js/clientSeance.js?");

/***/ }),

/***/ "./src/js/client_hall.js":
/*!*******************************!*\
  !*** ./src/js/client_hall.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _clientSeance_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clientSeance.js */ \"./src/js/clientSeance.js\");\n\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function () {\r\n  fetch(\"https://shfe-diplom.neto-server.ru/alldata\")\r\n    .then((response) => response.json())\r\n    .then((data) => {\r\n      data.result.seances.forEach((seance) => {\r\n        const seanceId = (0,_clientSeance_js__WEBPACK_IMPORTED_MODULE_0__.exportSeanceId)();\r\n        console.log(seanceId);\r\n        \r\n        if (seance.id == `${seanceId}`) {\r\n          \r\n          let filmId = seance.seance_filmid;\r\n          let hallId = seance.seance_hallid;\r\n          let seanceTime = seance.seance_time;\r\n          console.log(seanceId);\r\n         \r\n\r\n          window.localStorage.setItem(\"hallId\", `${hallId}`);\r\n          data.result.films.forEach((film) => {\r\n            if (film.id == `${filmId}`) {\r\n              let filmName = film.film_name;\r\n\r\n              data.result.halls.forEach((hall) => {\r\n                if (hall.id == `${hallId}`) {\r\n                  let hallName = hall.hall_name;\r\n                  let hallConfig = hall.hall_config;\r\n                  let hallPrice = hall.hall_price_standart;\r\n                  let hallPriceVip = hall.hall_price_vip;\r\n                  console.log(hallPrice);\r\n                  window.localStorage.setItem(\"hallConfig\", `${hallConfig}`);\r\n                  window.localStorage.setItem(\"hallPrice\", `${hallPrice}`);\r\n                  window.localStorage.setItem(\r\n                    \"hallPriceVip\",\r\n                    `${hallPriceVip}`\r\n                  );\r\n\r\n                  const buvingInfo = document.querySelector(\".buving_info\");\r\n                  const buyingInfoDescription = document.createElement(\"div\");\r\n                  buyingInfoDescription.className = \"buying_info-description\";\r\n                  buyingInfoDescription.innerHTML = `\r\n                    <div class=\"buying_info-description\">\r\n            <div class=\"name_film\">\r\n                <span class=\"name_film_text\">${filmName}</span>\r\n            </div>\r\n            <span class=\"session_time-text\">Начало сеанса ${seanceTime}</span>\r\n            <div class=\"name_hall\">\r\n                <span class=\"name_hall_text\">${hallName}</span>\r\n            </div>\r\n\r\n        </div>`;\r\n        \r\n               \r\n                    buvingInfo.append(buyingInfoDescription);\r\n          \r\n                  const typeChairs = document.querySelector(\".type_chairs\");\r\n                  const colType = document.createElement(\"div\");\r\n                  colType.className = \"col_type\";\r\n                  colType.innerHTML = `\r\n<div class=\"col_type\">\r\n    <div class=\"place_free\">\r\n        <div class=\"place_free_img\">\r\n        </div>\r\n        <span class=\"place_free_text\">Свободно (${hallPrice}руб)</span>\r\n    </div>\r\n    <div class=\"place_free_vip\">\r\n        <div class=\"place_free_vip_img\">\r\n        </div>\r\n        <span class=\"place_free_vip_text\">Свободно VIP (${hallPriceVip}руб)</div>`;\r\n                  typeChairs.append(colType);\r\n                }\r\n              });\r\n            }\r\n          });\r\n        }\r\n      });\r\n    });\r\n});\r\n\r\nfunction getTodayDate() {\r\n  return getFormattedDate(); \r\n}\r\n\r\nasync function fetchData(seanceId, todayDate) {\r\n  console.log(todayDate);\r\n  const response = await fetch(`https://shfe-diplom.neto-server.ru/hallconfig?seanceId=${seanceId}&date=${todayDate}`);\r\n  return await response.json();\r\n}\r\n\r\nfunction createChair(seatType, rowIndex, seatIndex, tickets) {\r\n  const chair = document.createElement(\"div\");\r\n  chair.className = seatType === \"vip\" ? \"buying-scheme_chair-vip\" : \"buying-scheme_chair\";\r\n\r\n  chair.addEventListener(\"click\", function (event) {\r\n      const className = seatType === \"vip\" ? \"buying-scheme_chair-vip\" : \"buying-scheme_chair\";\r\n      const occupiedClassName = seatType === \"vip\" ? \"buying-scheme_chair-vip-occupied\" : \"buying-scheme_chair-occupied\";\r\n\r\n      if (event.target.classList.contains(className)) {\r\n          event.target.classList.toggle(className);\r\n          event.target.classList.add(occupiedClassName);\r\n\r\n          const coastKey = seatType === \"vip\" ? \"hallPriceVip\" : \"hallPrice\";\r\n          const coast = parseInt(window.localStorage.getItem(coastKey));\r\n\r\n          const ticket = {\r\n              row: rowIndex + 1,\r\n              place: seatIndex + 1,\r\n              coast: coast\r\n          };\r\n          tickets.push(ticket);\r\n\r\n          console.log(tickets);\r\n      }\r\n  });\r\n\r\n  return chair;\r\n}\r\n\r\nfunction appendRowsToWrapper(data) {\r\n  const tickets = [];\r\n  const buyingSchemeWrapper = document.querySelector(\".buying-scheme_wrapper\");\r\n\r\n  data.result.forEach((row, rowIndex) => {\r\n      const buyingSchemeRow = document.createElement(\"div\");\r\n      buyingSchemeRow.className = \"buying-scheme_row\";\r\n\r\n      row.forEach((seat, seatIndex) => {\r\n          let chair = null;\r\n          if (seat === \"vip\") {\r\n              chair = createChair(\"vip\", rowIndex, seatIndex, tickets);\r\n          } else if (seat === \"standart\") {\r\n              chair = createChair(\"standart\", rowIndex, seatIndex, tickets);\r\n          }\r\n\r\n          if (chair !== null) {\r\n              buyingSchemeRow.append(chair);\r\n          }\r\n      });\r\n\r\n      if (buyingSchemeWrapper !== null) {\r\n          buyingSchemeWrapper.append(buyingSchemeRow);\r\n      } else {\r\n          console.error(\"Element not found or is null\");\r\n      }\r\n  });\r\n\r\n  return tickets;\r\n}\r\n\r\nfunction setupOrderButton(tickets, todayDate) {\r\n  const orderButton = document.querySelector(\".order_button\");\r\n  orderButton.addEventListener(\"click\", function () {\r\n      const seanceId = (0,_clientSeance_js__WEBPACK_IMPORTED_MODULE_0__.exportSeanceId)();\r\n      //const formattedDate = getFormattedDate();\r\n     \r\n      const params = new FormData();\r\n      params.set(\"seanceId\", seanceId);\r\n      params.set(\"ticketDate\", JSON.stringify(todayDate));\r\n      params.set(\"tickets\", JSON.stringify(tickets));\r\n\r\n      postOrderData(params);\r\n  });\r\n}\r\n\r\nfunction getFormattedDate() {\r\nlet selectedDates = window.localStorage.getItem('selectedDates');\r\n  if (selectedDates === null) {\r\n  const today = new Date();\r\n  const day = String(today.getDate()).padStart(2, \"0\");\r\n  const month = String(today.getMonth() + 1).padStart(2, \"0\");\r\n  const year = today.getFullYear();\r\n  return `${year}.${month}.${day}`;\r\n  } else {\r\n    return selectedDates;\r\n  }\r\n}\r\n//отправляем данные на сервер\r\nfunction postOrderData(params) {\r\n  fetch(\"https://shfe-diplom.neto-server.ru/ticket\", {\r\n      method: \"POST\",\r\n      body: params,\r\n  })\r\n      .then((response) => response.json())\r\n      .then((data) => {\r\n          storeTicketData(data);\r\n\r\n         \r\n             window.location.href = \"clientpayment.html\";\r\n         \r\n      });\r\n}\r\n//сохраняем массив с данными места\r\nfunction storeTicketData(data) {\r\n  if (data && Array.isArray(data.result)) {\r\n    let Arraytickets = [];\r\n    data.result.forEach((item) => {\r\n      Arraytickets.push(item);\r\n      console.log(item);\r\n    });\r\n    window.localStorage.setItem(\"Arraytickets\", JSON.stringify(Arraytickets));\r\n  } else {\r\n    console.error(\"Invalid data format\", data);\r\n  }\r\n  console.log(data);\r\n}\r\n\r\nfunction initializeApp() {\r\n  const seanceId = (0,_clientSeance_js__WEBPACK_IMPORTED_MODULE_0__.exportSeanceId)();\r\n  const todayDate = getTodayDate(); \r\n  console.log(todayDate);\r\n\r\n  fetchData(seanceId, todayDate)\r\n      .then(data => {\r\n          console.log(data); \r\n          console.log(todayDate);\r\n          const tickets = appendRowsToWrapper(data);\r\n          setupOrderButton(tickets, todayDate);\r\n      })\r\n      .catch(error => {\r\n          console.error(\"Error fetching data:\", error);\r\n      });\r\n}\r\n\r\ninitializeApp();\r\n\r\n  \r\n\n\n//# sourceURL=webpack://finaldiploma/./src/js/client_hall.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/client_hall.js");
/******/ 	
/******/ })()
;