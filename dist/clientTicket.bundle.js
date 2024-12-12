/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/clientTicket.js":
/*!********************************!*\
  !*** ./src/js/clientTicket.js ***!
  \********************************/
/***/ (() => {

eval("\r\ndocument.addEventListener(\"DOMContentLoaded\", function () {\r\n\r\nlet Arraytickets = JSON.parse(localStorage.getItem(\"Arraytickets\"));\r\n  console.log(Arraytickets);\r\nconst arrayQrcode = [];\r\n\r\nconst ticketsInfo = Arraytickets.map((item) => {\r\n    return {\r\n      \"Название фильма\": item.ticket_filmname,\r\n      Зал: item.ticket_hallname,\r\n      Ряд: item.ticket_row,\r\n      Место: item.ticket_place,\r\n      Стоимость: item.ticket_price,\r\n    };\r\n  });\r\n\r\n\r\n  arrayQrcode.push(ticketsInfo);\r\n  arrayQrcode.unshift(\"Билет действителен строго на свой сеанс\");\r\n\r\n  Arraytickets.forEach((ticket) => {\r\n    const paymentFrame = document.querySelector(\".payment-frame\");\r\n    const ticketInfoWrapper = document.createElement(\"div\");\r\n    ticketInfoWrapper.className = \"ticket__info-wrapper\";\r\n    ticketInfoWrapper.innerHTML = `<div class=\"ticket__info-wrapper\">\r\n            <div class=\"ticket__info-film_name\">\r\n                    <span class=\"ticket__info-film-name_text\">На фильм: ${ticket.ticket_filmname}</span>\r\n            </div>\r\n<div class=\"ticket__info-seats\">\r\n    <span class=\"ticket__info-seats-_text\">Места: ряд ${ticket.ticket_row}, место ${ticket.ticket_place}</span>\r\n</div>\r\n<div class=\"ticket__info-hall\">\r\n    <span class=\"ticket__info-hall_text\">В зале:  ${ticket.ticket_hallname}</span>\r\n</div>\r\n<div class=\"ticket__info-seance_begin\">\r\n    <span class=\"ticket__info-seance_begin-text\">Начало сеанса: ${ticket.ticket_time}</span>\r\n</div>\r\n<div class=\"qrcode\" id=\"qrcode1\"></div>\r\n<div class=\"ticket__hint\">\r\n        <span class=\"ticket__hint-text\">Покажите QR-код нашему контроллеру для подтверждения бронирования.</span>\r\n</div>\r\n       \r\n        <div class=\"ticket__hint-wish\">\r\n<span class=\"ticket__hint-wish_text\">Приятного просмотра!</span>\r\n        </div>\r\n  </div> `;\r\n\r\n    paymentFrame.append(ticketInfoWrapper);\r\n  });\r\n  console.log(Arraytickets);\r\n\r\n  console.log(arrayQrcode);\r\n  const qrcode1 = QRCreator(JSON.stringify(arrayQrcode), {\r\n    mode: 4,\r\n    eccl: 0,\r\n    version: -1,\r\n    mask: -1,\r\n    image: \"svg\",\r\n    modsize: -1,\r\n    margin: 0,\r\n  });\r\n  const content = (qrcode) => {\r\n    return qrcode.error\r\n      ? `недопустимые исходные данные ${qrcode.error}`\r\n      : qrcode.result;\r\n  };\r\n\r\n  document.getElementById(\"qrcode1\").append(\"QR - КОД\", content(qrcode1));\r\n});\r\n\n\n//# sourceURL=webpack://finaldiploma/./src/js/clientTicket.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/clientTicket.js"]();
/******/ 	
/******/ })()
;