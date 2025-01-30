import { exportSeanceId, exporttextButton } from "./clientSeance.js";

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://shfe-diplom.neto-server.ru/alldata")
    .then((response) => response.json())
    .then((data) => {
      data.result.seances.forEach((seance) => {
        const seanceId = exportSeanceId();
        console.log(seanceId);
        const textButton = exporttextButton();
        if (seance.id == `${seanceId}`) {
          
          let filmId = seance.seance_filmid;
          let hallId = seance.seance_hallid;
          let seanceTime = textButton;
          console.log(seanceId);
         

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
        
               
                    buvingInfo.append(buyingInfoDescription);
          
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

function getTodayDate() {
  return getFormattedDate(); 
}

async function fetchData(seanceId, todayDate) {
  console.log(todayDate);
  const response = await fetch(`https://shfe-diplom.neto-server.ru/hallconfig?seanceId=${seanceId}&date=${todayDate}`);
  return await response.json();
}

function createChair(seatType, rowIndex, seatIndex, tickets) {
  const chair = document.createElement("div");
  chair.className = seatType === "vip" ? "buying-scheme_chair-vip" : "buying-scheme_chair";

  chair.addEventListener("click", function (event) {
      const className = seatType === "vip" ? "buying-scheme_chair-vip" : "buying-scheme_chair";
      const occupiedClassName = seatType === "vip" ? "buying-scheme_chair-vip-occupied" : "buying-scheme_chair-occupied";

      if (event.target.classList.contains(className)) {
          event.target.classList.toggle(className);
          event.target.classList.add(occupiedClassName);

          const coastKey = seatType === "vip" ? "hallPriceVip" : "hallPrice";
          const coast = parseInt(window.localStorage.getItem(coastKey));

          const ticket = {
              row: rowIndex + 1,
              place: seatIndex + 1,
              coast: coast
          };
          tickets.push(ticket);

          console.log(tickets);
      }
  });

  return chair;
}

function appendRowsToWrapper(data) {
  const tickets = [];
  const buyingSchemeWrapper = document.querySelector(".buying-scheme_wrapper");

  data.result.forEach((row, rowIndex) => {
      const buyingSchemeRow = document.createElement("div");
      buyingSchemeRow.className = "buying-scheme_row";

      row.forEach((seat, seatIndex) => {
          let chair = null;
          if (seat === "vip") {
              chair = createChair("vip", rowIndex, seatIndex, tickets);
          } else if (seat === "standart") {
              chair = createChair("standart", rowIndex, seatIndex, tickets);
          }

          if (chair !== null) {
              buyingSchemeRow.append(chair);
          }
      });

      if (buyingSchemeWrapper !== null) {
          buyingSchemeWrapper.append(buyingSchemeRow);
      } else {
          console.error("Element not found or is null");
      }
  });

  return tickets;
}

function setupOrderButton(tickets, todayDate) {
  const orderButton = document.querySelector(".order_button");
  orderButton.addEventListener("click", function () {
      const seanceId = exportSeanceId();
      const params = new FormData();
      params.set("seanceId", seanceId);
      params.set("ticketDate", JSON.stringify(todayDate));
      params.set("tickets", JSON.stringify(tickets));

      postOrderData(params);
  });
}

function getFormattedDate() {
let selectedDates = window.localStorage.getItem('selectedDates');
    return selectedDates;
}
//отправляем данные на сервер
function postOrderData(params) {
  fetch("https://shfe-diplom.neto-server.ru/ticket", {
      method: "POST",
      body: params,
  })
      .then((response) => response.json())
      .then((data) => {
          storeTicketData(data);

         
             window.location.href = "clientpayment.html";
         
      });
}
//сохраняем массив с данными места
function storeTicketData(data) {
  if (data && Array.isArray(data.result)) {
    const Arraytickets = data.result.map((item) => {
      const textButton = exporttextButton();
      const updatedItem = { ...item, ticket_time: textButton };

      console.log(updatedItem);
      return updatedItem; 
    });

    window.localStorage.setItem("Arraytickets", JSON.stringify(Arraytickets));
  } else {
    console.error("Invalid data format", data);
  }

}

function initializeApp() {
  const seanceId = exportSeanceId();
  const todayDate = getTodayDate(); 
  console.log(todayDate);

  fetchData(seanceId, todayDate)
      .then(data => {
          console.log(data); 
          console.log(todayDate);
          const tickets = appendRowsToWrapper(data);
          setupOrderButton(tickets, todayDate);
      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });
}

initializeApp();

  
