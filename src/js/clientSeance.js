
document.addEventListener("DOMContentLoaded", function () {
 const cinemaEntryBtn = document.querySelector(".go_cinema-entry");
  if (cinemaEntryBtn !== null){
  cinemaEntryBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
};

  let date = new Date();
  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  const seanceDays = document.querySelectorAll(".seance_day");

  seanceDays.forEach((seanceDay, i) => {
    let nextDate = new Date(date);
    nextDate.setDate(date.getDate() + i);

    const dayOfWeek = days[nextDate.getDay()];
    const dateNext = nextDate.getDate();

    const seanceDayWeek = document.createElement("div");
    seanceDayWeek.className = "seance_day-week";
    seanceDayWeek.innerHTML = `
          <span class="seance_day-week_today">${i === 0 ? "Сегодня" : ""}</span>
          <div class="seance_day-week_text-today"> 
              <span class="seance_day-week_text">${dayOfWeek}</span>
              <span class="seance_day-data">${dateNext}</span>
          </div>`;

    seanceDay.append(seanceDayWeek);
    //сеасы открытых залов

   
    if (i === 0) {
      toggleClickClasses(seanceDay);
    }

    seanceDay.addEventListener("click", () => {
      // Убираем классы у всех дней сеансов
      seanceDays.forEach((day) => toggleClickClasses(day, false));

      // Добавляем классы к текущему кликнутому дню
      toggleClickClasses(seanceDay);
    });
  

  function toggleClickClasses(seanceDay, toggle = true) {
    const method = toggle ? "add" : "remove";

    seanceDay.classList[method]("seance_day-click");
    const weekToday = seanceDay.querySelector(".seance_day-week_today");
    if (weekToday) {
      weekToday.classList[method]("seance_day-week_today-click");
    }
    const weekText = seanceDay.querySelector(".seance_day-week_text");
    if (weekText) {
      weekText.classList[method]("seance_day-week_text-click");
    }
    const dateData = seanceDay.querySelector(".seance_day-data");
    if (dateData) {
      dateData.classList[method]("seance_day-data-click");
    }
  }
    fetch("https://shfe-diplom.neto-server.ru/alldata")
      .then((response) => response.json())
      .then((data) => {
        const hallClient = document.querySelector(".hall-client");
        hallClient.innerHTML = "";
        // открываем только открытые залы
        data.result.halls.forEach((hall) => {
          if (hall.hall_open == 1) {
            let hallId = hall.id;
            // находим id залa
            data.result.seances.forEach((seance, i) => {
              if (seance.seance_hallid == `${hallId}`) {
                let filmSeanceId = seance.seance_filmid;
                let hallName = hall.hall_name;
                // находим данные сеанса
                data.result.films.forEach((film, i) => {
                  if (film.id == `${filmSeanceId}`) {
                    let filmName = film.film_name;
                    let filmPoster = film.film_poster;
                    let filmDiscription = film.film_description;
                    let filmDuration = film.film_duration;
                    let filmOrigin = film.film_origin;

                    const hallClient = document.querySelector(".hall-client");
                    const sectionMovie = document.createElement("section");
                    sectionMovie.classList.add("section_movie");
                    const movieInfo = document.createElement("div");
                    movieInfo.classList.add("movie_info" + i);
                    movieInfo.innerHTML = `
                        <img class="movie_poster" src="${filmPoster}">  
         
                        <div class="movie_discription">
                          <div class="movie_name">
                            <span class="movie_name-text">${filmName}</span>
                          </div> 
                          <div class="movie_synopsis">
                            <span class="movie_synopsis-text">${filmDiscription}</span>
                          </div>   
                          <div class="movie_data">
                            <span class="movie_duration">${filmDuration} минут</span>
                            <span class="movie_origin">${filmOrigin}</span>
                          </div>   
                        </div>    
                       
                       <div class="list"></div>`;
                    data.result.seances.forEach((seance, i) => {
                      if (seance.seance_hallid == `${hallId}`) {
                        let seanceTime = seance.seance_time;
                        const list = document.createElement("div");
                        list.classList.add("list" + i);
                        list.innerHTML = `
         
                        <span class="movie_seances-text">${hallName}</span>
         
                               <div class="item">
                                <button class="link"> 
                                <span class="link-text">${seanceTime}</span>
                                   </button>
                          </div>`;

                        sectionMovie.append(list);
                        sectionMovie.prepend(movieInfo);
                        hallClient.append(sectionMovie);

                        const currentDate = new Date();
                        const hours = currentDate
                          .getHours()
                          .toString()
                          .padStart(2, "0");
                        const minutes = currentDate
                          .getMinutes()
                          .toString()
                          .padStart(2, "0");

                        const timeNow = `${hours}:${minutes}`;

                        const links =
                          sectionMovie.querySelectorAll(".link, .link-text");

                        links.forEach((link) => {
                          link.addEventListener("click", (event) => {
                            const target = event.target.classList.contains('link') 
                       ? event.target.querySelector('.link-text') : event.target;

        let textButton = target.textContent;

                            function extrMovie() {
                              const movieElement =
                                event.target.closest(".section_movie");
                              if (movieElement) {
                                // Находим элемент с текстом имени фильма
                                const movieNameElement =
                                  movieElement.querySelector(
                                    ".movie_name-text"
                                  );
                                if (movieNameElement) {
                                  const movieName =
                                    movieNameElement.textContent;
                                  return movieName;
                                }
                              }
                            }

                            if (timeNow < textButton) {
                              data.result.films.forEach((film) => {
                                let movieNameText = extrMovie();

                                if (film.film_name === movieNameText) {
                                  let filmID = film.id;
                                  console.log(filmID);

                                  data.result.seances.forEach((seance) => {
                                    if (seance.seance_filmid == `${filmID}` && seance.seance_time == textButton) {
                                      let seanceId = seance.id;
                                      window.localStorage.setItem(
                                        "seanceId",
                                        `${seanceId}`
                                      );
                                     window.location.href = "clientHall.html";
                                    }
                                  });
                                }
                              });
                            } else alert("Сеанс закончился");
                          });
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      });
    //});
  });
});
export function exportSeanceId() {
  const seanceId = window.localStorage.getItem("seanceId");
  return seanceId;
}
