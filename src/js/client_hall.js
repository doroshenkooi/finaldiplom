import { exportHallId } from "./clientSeance.js";

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://shfe-diplom.neto-server.ru/alldata")
    .then((response) => response.json())
    .then((data) => {
      data.result.seances.forEach((seance) => {
        const hallId = exportHallId();
        console.log(hallId);
        if (seance.seance_hallid == `${hallId}`) {
          let seanceID = seance.id;
          let filmId = seance.seance_filmid;

          let seanceTime = seance.seance_time;
          console.log(seanceID);
          window.localStorage.setItem("seanceID", `${seanceID}`);

          window.localStorage.setItem("hallId", `${hallId}`);
          data.result.films.forEach((film) => {
            if (film.id == `${filmId}`) {
              let filmName = film.film_name;

              data.result.halls.forEach((hall) => {
                if (hall.id == `${hallId}`) {
                  let hallName = hall.hall_name;
                  let hallConfig = hall.hall_config;
                  let hallPrice = hall.hall_price_standart;
                  let hallPriceVip = hall.hall_price_vip;
                  console.log(hallPrice);
                  window.localStorage.setItem("hallConfig", `${hallConfig}`);
                  window.localStorage.setItem("hallPrice", `${hallPrice}`);
                  window.localStorage.setItem(
                    "hallPriceVip",
                    `${hallPriceVip}`
                  );

                  const buvingInfo = document.querySelector(".buving_info");
                  const buyingInfoDescription = document.createElement("div");
                  buyingInfoDescription.className = "buying_info-description";
                  buyingInfoDescription.innerHTML = `
                    <div class="buying_info-description">
            <div class="name_film">
                <span class="name_film_text">${filmName}</span>
            </div>
            <span class="session_time-text">Начало сеанса ${seanceTime}</span>
            <div class="name_hall">
                <span class="name_hall_text">${hallName}</span>
            </div>

        </div>`;
                  function buyingInfoDescript() {
                    buvingInfo.append(buyingInfoDescription);
                  }
                  buyingInfoDescript();

                  const typeChairs = document.querySelector(".type_chairs");
                  const colType = document.createElement("div");
                  colType.className = "col_type";
                  colType.innerHTML = `
<div class="col_type">
    <div class="place_free">
        <div class="place_free_img">
        </div>
        <span class="place_free_text">Свободно (${hallPrice}руб)</span>
    </div>
    <div class="place_free_vip">
        <div class="place_free_vip_img">
        </div>
        <span class="place_free_vip_text">Свободно VIP (${hallPriceVip}руб)</div>`;
                  typeChairs.append(colType);
                }
              });
            }
          });
        }
      });
    });
});

const buyingSchemeWrapper = document.querySelector(".buying-scheme_wrapper");
const seanceID = window.localStorage.getItem("seanceID");
let todayDate = new Date();
console.log(todayDate);
fetch(
  `https://shfe-diplom.neto-server.ru/hallconfig?seanceId=${seanceID}&date=${todayDate} `
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    buyingSchemeWrapper.innerHTML = "";
    const tickets = [];
    data.result.forEach((row, rowIndex) => {
      const buyingSchemeRow = document.createElement("div");
      buyingSchemeRow.className = "buying-scheme_row";
      row.forEach((seat, seatIndex) => {
        if (seat === "vip") {
          const buyingSchemeChairVip = document.createElement("div");
          buyingSchemeChairVip.className = "buying-scheme_chair-vip";
          buyingSchemeChairVip.textContent = "";
          buyingSchemeRow.append(buyingSchemeChairVip);
          buyingSchemeChairVip.addEventListener("click", function (event) {
            if (event.target.classList.contains("buying-scheme_chair-vip")) {
              event.target.classList.remove("buying-scheme_chair-vip");
              event.target.classList.add("buying-scheme_chair-vip-occupied");
              const coasts = window.localStorage.getItem("hallPriceVip");
              const coast = parseInt(coasts);
              let row = rowIndex + 1;
              let place = seatIndex + 1;
              tickets.push({
                row: row,
                place: place,
                coast: coast,
              });
            }
          });
        } else if (seat === "standart") {
          const buyingSchemeChair = document.createElement("div");
          buyingSchemeChair.className = "buying-scheme_chair";
          buyingSchemeChair.textContent = "";
          buyingSchemeRow.append(buyingSchemeChair);
          buyingSchemeChair.addEventListener("click", function (event) {
            if (event.target.classList.contains("buying-scheme_chair")) {
              event.target.classList.remove("buying-scheme_chair");
              event.target.classList.add("buying-scheme_chair-occupied");

              const coasts = window.localStorage.getItem("hallPrice");
              const coast = parseInt(coasts);
              let row = rowIndex + 1;
              let place = seatIndex + 1;

              tickets.push({
                row: row,
                place: place,
                coast: coast,
              });

              console.log(tickets);
            }
          });
        }

        if (buyingSchemeRow !== null) {
          buyingSchemeWrapper.append(buyingSchemeRow);
        } else {
          console.error("Элемент не найден или равен null");
        }
      });
    });

    const orderButton = document.querySelector(".order_button");
    orderButton
      .addEventListener("click", function () {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        const formattedDate = `${year}.${month}.${day}`;

        const seanceID = window.localStorage.getItem("seanceID");
        console.log(seanceID);
        const params = new FormData();
        params.set("seanceId", seanceID);
        params.set("ticketDate", JSON.stringify(formattedDate));
        params.set("tickets", JSON.stringify(tickets));

        fetch("https://shfe-diplom.neto-server.ru/ticket", {
          method: "POST",
          body: params,
        })
          .then((response) => response.json())
          .then((data) => {
            data.result.forEach((item) => {
              let ticket = {
                id: item.id,
                date: item.ticket_date,
                filmname: item.ticket_filmname,
                hallname: item.ticket_hallname,
                place: item.ticket_place,
                price: item.ticket_price,
                row: item.ticket_row,
                time: item.ticket_time,
              };
              console.log(ticket);
              const Arraytickets = [];
              Arraytickets.push(ticket);
              console.log(Arraytickets);
              window.localStorage.setItem(
                "Arraytickets",
                JSON.stringify(Arraytickets)
              );
            });
            console.log(data);
          })
          .catch((error) => {
            console.error("Ошибка:", error.message);
          });

        setTimeout(() => {
          window.location.href = "clientpayment.html";
        }, 1000);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
      });
  });
export function exportArraytickets() {
  const Arraytickets = JSON.parse(localStorage.getItem("Arraytickets"));
  return Arraytickets;
}
