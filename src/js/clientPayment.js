
let tickets = JSON.parse(localStorage.getItem("Arraytickets"));
console.log(tickets);
 let arrayPayTicket = [];
tickets.forEach((ticket) => {
  
   arrayPayTicket.push(ticket);
   console.log(arrayPayTicket);
  const paymentFrame = document.querySelector(".payment-frame");
  const ticketInfoWrapper = document.createElement("div");
  ticketInfoWrapper.className = "ticket__info-wrapper";
  ticketInfoWrapper.innerHTML = `<div class="ticket__info-wrapper">
                <div class="ticket__info-film_name">
                    <span class="ticket__info-film-name_text">На фильм: ${ticket.ticket_filmname}</span>
                </div>
                <div class="ticket__info-seats">
                    <span class="ticket__info-seats_text">Места: ряд ${ticket.ticket_row}, место ${ticket.ticket_place}</span>
                </div>
                <div class="ticket__info-hall">
                    <span class="ticket__info-hall_text">В зале:  ${ticket.ticket_hallname}</span>
                </div>
                <div class="ticket__info-seance_begin">
                    <span class="ticket__info-seance_begin-text">Начало сеанса: ${ticket.ticket_time}</span>
                </div>
                <div class="ticket__info-cost">
                    <span class="ticket__info-cost_text">Стоимость: ${ticket.ticket_price}</span>
                </div>
                <button class="payment-button">
                    <span class="payment-button_text">Получить код бронирования</span>
                </button>
                <div class="ticket__hint">
                    <span class="ticket__hint-text">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</span>
                </div>
                <div class="ticket__hint-wish">
                    <span class="ticket__hint-wish_text">Приятного просмотра!</span>
                </div>
            </div>`;

  paymentFrame.append(ticketInfoWrapper);

  // Поиск кнопки внутри созданного элемента ticketInfoWrapper
  const paymentButton = ticketInfoWrapper.querySelector(".payment-button");
  paymentButton.addEventListener("click", function () {
   window.location.href = "client_ticket.html";
  });
});
