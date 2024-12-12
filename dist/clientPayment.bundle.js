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

/***/ "./src/js/clientPayment.js":
/*!*********************************!*\
  !*** ./src/js/clientPayment.js ***!
  \*********************************/
/***/ (() => {

eval("\r\nlet tickets = JSON.parse(localStorage.getItem(\"Arraytickets\"));\r\nconsole.log(tickets);\r\n let arrayPayTicket = [];\r\ntickets.forEach((ticket) => {\r\n  \r\n   arrayPayTicket.push(ticket);\r\n   console.log(arrayPayTicket);\r\n  const paymentFrame = document.querySelector(\".payment-frame\");\r\n  const ticketInfoWrapper = document.createElement(\"div\");\r\n  ticketInfoWrapper.className = \"ticket__info-wrapper\";\r\n  ticketInfoWrapper.innerHTML = `<div class=\"ticket__info-wrapper\">\r\n                <div class=\"ticket__info-film_name\">\r\n                    <span class=\"ticket__info-film-name_text\">На фильм: ${ticket.ticket_filmname}</span>\r\n                </div>\r\n                <div class=\"ticket__info-seats\">\r\n                    <span class=\"ticket__info-seats_text\">Места: ряд ${ticket.ticket_row}, место ${ticket.ticket_place}</span>\r\n                </div>\r\n                <div class=\"ticket__info-hall\">\r\n                    <span class=\"ticket__info-hall_text\">В зале:  ${ticket.ticket_hallname}</span>\r\n                </div>\r\n                <div class=\"ticket__info-seance_begin\">\r\n                    <span class=\"ticket__info-seance_begin-text\">Начало сеанса: ${ticket.ticket_time}</span>\r\n                </div>\r\n                <div class=\"ticket__info-cost\">\r\n                    <span class=\"ticket__info-cost_text\">Стоимость: ${ticket.ticket_price}</span>\r\n                </div>\r\n                <button class=\"payment-button\">\r\n                    <span class=\"payment-button_text\">Получить код бронирования</span>\r\n                </button>\r\n                <div class=\"ticket__hint\">\r\n                    <span class=\"ticket__hint-text\">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</span>\r\n                </div>\r\n                <div class=\"ticket__hint-wish\">\r\n                    <span class=\"ticket__hint-wish_text\">Приятного просмотра!</span>\r\n                </div>\r\n            </div>`;\r\n\r\n  paymentFrame.append(ticketInfoWrapper);\r\n\r\n  // Поиск кнопки внутри созданного элемента ticketInfoWrapper\r\n  const paymentButton = ticketInfoWrapper.querySelector(\".payment-button\");\r\n  paymentButton.addEventListener(\"click\", function () {\r\n   window.location.href = \"client_ticket.html\";\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack://finaldiploma/./src/js/clientPayment.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/clientPayment.js"]();
/******/ 	
/******/ })()
;