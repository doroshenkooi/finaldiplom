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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   exportSeanceId: () => (/* binding */ exportSeanceId)\n/* harmony export */ });\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function () {\r\n const cinemaEntryBtn = document.querySelector(\".go_cinema-entry\");\r\n  if (cinemaEntryBtn !== null){\r\n  cinemaEntryBtn.addEventListener(\"click\", () => {\r\n    window.location.href = \"login.html\";\r\n  });\r\n};\r\n\r\n  let date = new Date();\r\n  const days = [\"Вс,\", \"Пн,\", \"Вт,\", \"Ср,\", \"Чт,\", \"Пт,\", \"Сб,\"];\r\n\r\n  const seanceDays = document.querySelectorAll(\".seance_day\");\r\n\r\n  seanceDays.forEach((seanceDay, i) => {\r\n    let nextDate = new Date(date);\r\n    nextDate.setDate(date.getDate() + i);\r\n\r\n    const dayOfWeek = days[nextDate.getDay()];\r\n    const dateNext = nextDate.getDate();\r\n\r\n    const seanceDayWeek = document.createElement(\"div\");\r\n    seanceDayWeek.className = \"seance_day-week\";\r\n    seanceDayWeek.innerHTML = `\r\n          <span class=\"seance_day-week_today\">${i === 0 ? \"Сегодня\" : \"\"}</span>\r\n          <div class=\"seance_day-week_text-today\"> \r\n              <span class=\"seance_day-week_text\">${dayOfWeek}</span>\r\n              <span class=\"seance_day-data\">${dateNext}</span>\r\n          </div>`;\r\n\r\n    seanceDay.append(seanceDayWeek);\r\n    //сеасы открытых залов\r\n    if (dayOfWeek === \"Вс,\" || dayOfWeek === \"Сб,\") {\r\n      seanceDayWeek.querySelector('.seance_day-week_text').style.color = \"red\";\r\n      seanceDayWeek.querySelector('.seance_day-data').style.color = \"red\";\r\n    }\r\n    if (i === 6) {\r\n      const seanceDayWeekTextElements = document.querySelectorAll('.seance_day-week');\r\n      if (seanceDayWeekTextElements.length > 6) {\r\n        seanceDayWeekTextElements[6].classList.add('seance_day-week_text-today-six');\r\n        seanceDayWeekTextElements[6].textContent = '>';\r\n      }\r\n    }\r\n    if (i === 0) {\r\n      toggleClickClasses(seanceDay);\r\n      seanceDayWeek.style.marginTop = \"10px\" ;\r\n      document.querySelector('.seance_day-week_text-today').style.flexDirection = \"row\";\r\n    }\r\n\r\n    seanceDay.addEventListener(\"click\", () => {\r\n      // Убираем классы у всех дней сеансов\r\n      seanceDays.forEach((day) => toggleClickClasses(day, false));\r\n\r\n      // Добавляем классы к текущему кликнутому дню\r\n      toggleClickClasses(seanceDay);\r\n    });\r\n  \r\n\r\n  function toggleClickClasses(seanceDay, toggle = true) {\r\n    const method = toggle ? \"add\" : \"remove\";\r\n\r\n    seanceDay.classList[method](\"seance_day-click\");\r\n    const weekToday = seanceDay.querySelector(\".seance_day-week_today\");\r\n    if (weekToday) {\r\n      weekToday.classList[method](\"seance_day-week_today-click\");\r\n    }\r\n    const weekText = seanceDay.querySelector(\".seance_day-week_text\");\r\n    if (weekText) {\r\n      weekText.classList[method](\"seance_day-week_text-click\");\r\n    }\r\n    const dateData = seanceDay.querySelector(\".seance_day-data\");\r\n    if (dateData) {\r\n      dateData.classList[method](\"seance_day-data-click\");\r\n    }\r\n  }\r\n    fetch(\"https://shfe-diplom.neto-server.ru/alldata\")\r\n      .then((response) => response.json())\r\n      .then((data) => {\r\n        const hallClient = document.querySelector(\".hall-client\");\r\n        hallClient.innerHTML = \"\";\r\n        // открываем только открытые залы\r\n        data.result.halls.forEach((hall) => {\r\n          if (hall.hall_open == 1) {\r\n            let hallId = hall.id;\r\n            // находим id залa\r\n            data.result.seances.forEach((seance, i) => {\r\n              if (seance.seance_hallid == `${hallId}`) {\r\n                let filmSeanceId = seance.seance_filmid;\r\n                let hallName = hall.hall_name;\r\n                // находим данные сеанса\r\n                data.result.films.forEach((film, i) => {\r\n                  if (film.id == `${filmSeanceId}`) {\r\n                    let filmName = film.film_name;\r\n                    let filmPoster = film.film_poster;\r\n                    let filmDiscription = film.film_description;\r\n                    let filmDuration = film.film_duration;\r\n                    let filmOrigin = film.film_origin;\r\n\r\n                    const hallClient = document.querySelector(\".hall-client\");\r\n                    const sectionMovie = document.createElement(\"section\");\r\n                    sectionMovie.classList.add(\"section_movie\");\r\n                    const movieInfo = document.createElement(\"div\");\r\n                    movieInfo.classList.add(\"movie_info\" + i);\r\n                    movieInfo.innerHTML = `\r\n                        <img class=\"movie_poster\" src=\"${filmPoster}\">  \r\n         \r\n                        <div class=\"movie_discription\">\r\n                          <div class=\"movie_name\">\r\n                            <span class=\"movie_name-text\">${filmName}</span>\r\n                          </div> \r\n                          <div class=\"movie_synopsis\">\r\n                            <span class=\"movie_synopsis-text\">${filmDiscription}</span>\r\n                          </div>   \r\n                          <div class=\"movie_data\">\r\n                            <span class=\"movie_duration\">${filmDuration} минут</span>\r\n                            <span class=\"movie_origin\">${filmOrigin}</span>\r\n                          </div>   \r\n                        </div>    \r\n                       \r\n                       <div class=\"list\"></div>`;\r\n                    data.result.seances.forEach((seance, i) => {\r\n                      if (seance.seance_hallid == `${hallId}`) {\r\n                        let seanceTime = seance.seance_time;\r\n                        const list = document.createElement(\"div\");\r\n                        list.classList.add(\"list\" + i);\r\n                        list.innerHTML = `\r\n         \r\n                        <span class=\"movie_seances-text\">${hallName}</span>\r\n         \r\n                               <div class=\"item\">\r\n                                <button class=\"link\"> \r\n                                <span class=\"link-text\">${seanceTime}</span>\r\n                                   </button>\r\n                          </div>`;\r\n\r\n                        sectionMovie.append(list);\r\n                        sectionMovie.prepend(movieInfo);\r\n                        hallClient.append(sectionMovie);\r\n\r\n                        const currentDate = new Date();\r\n                        const hours = currentDate\r\n                          .getHours()\r\n                          .toString()\r\n                          .padStart(2, \"0\");\r\n                        const minutes = currentDate\r\n                          .getMinutes()\r\n                          .toString()\r\n                          .padStart(2, \"0\");\r\n\r\n                        const timeNow = `${hours}:${minutes}`;\r\n\r\n                        const links =\r\n                          sectionMovie.querySelectorAll(\".link, .link-text\");\r\n\r\n                        links.forEach((link) => {\r\n                          link.addEventListener(\"click\", (event) => {\r\n                            const target = event.target.classList.contains('link') \r\n                       ? event.target.querySelector('.link-text') : event.target;\r\n\r\n        let textButton = target.textContent;\r\n\r\n                            function extrMovie() {\r\n                              const movieElement =\r\n                                event.target.closest(\".section_movie\");\r\n                              if (movieElement) {\r\n                                // Находим элемент с текстом имени фильма\r\n                                const movieNameElement =\r\n                                  movieElement.querySelector(\r\n                                    \".movie_name-text\"\r\n                                  );\r\n                                if (movieNameElement) {\r\n                                  const movieName =\r\n                                    movieNameElement.textContent;\r\n                                  return movieName;\r\n                                }\r\n                              }\r\n                            }\r\n\r\n                            if (timeNow < textButton) {\r\n                              data.result.films.forEach((film) => {\r\n                                let movieNameText = extrMovie();\r\n\r\n                                if (film.film_name === movieNameText) {\r\n                                  let filmID = film.id;\r\n                                  console.log(filmID);\r\n\r\n                                  data.result.seances.forEach((seance) => {\r\n                                    if (seance.seance_filmid == `${filmID}` && seance.seance_time == textButton) {\r\n                                      let seanceId = seance.id;\r\n                                      window.localStorage.setItem(\r\n                                        \"seanceId\",\r\n                                        `${seanceId}`\r\n                                      );\r\n                                     window.location.href = \"clientHall.html\";\r\n                                    }\r\n                                  });\r\n                                }\r\n                              });\r\n                            } else alert(\"Сеанс закончился\");\r\n                          });\r\n                        });\r\n                      }\r\n                    });\r\n                  }\r\n                });\r\n              }\r\n            });\r\n          }\r\n        });\r\n      });\r\n    //});\r\n  });\r\n});\r\nfunction exportSeanceId() {\r\n  const seanceId = window.localStorage.getItem(\"seanceId\");\r\n  return seanceId;\r\n}\r\n\n\n//# sourceURL=webpack://finaldiploma/./src/js/clientSeance.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/clientSeance.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;