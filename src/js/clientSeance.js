document.addEventListener("DOMContentLoaded", function () {
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
if (seanceDay !== null) {
  seanceDay.addEventListener("click", function () {
    fetch("https://shfe-diplom.neto-server.ru/alldata")
      .then((response) => response.json())
      .then((data) => {
        const hallClient = document.querySelector(".hall-client");
        hallClient.innerHTML ='';
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
                    movieInfo.classList.add('movie_info'+i);
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
                        console.log(timeNow);

                        const links = sectionMovie.querySelectorAll('.link, .link-text');
                          
                        links.forEach((link) => {
                          link.addEventListener("click", (event) => {
                            function extrMovie(){
                              
         let textButton = link.textContent.trim();
         const movieElement = event.target.closest('.section_movie');
         if (movieElement) {
           // Находим элемент с текстом имени фильма
           const movieNameElement = movieElement.querySelector('.movie_name-text');
           if (movieNameElement) {
             const movieName = movieNameElement.textContent;
           return movieName;   
           }
         }
    
      }
        
                          //  if (timeNow < `${seanceTime}`) {
                               
                           data.result.films.forEach((film) => {
                         let movieNameText = extrMovie();
                         console.log(movieNameText);
                              if (film.film_name === movieNameText) {
                                let filmID = film.id;
                                console.log(filmID);
                               
                                
                                  window.localStorage.setItem("hallId", hallId);
                                
                                 data.result.seances.forEach((seance) => {
                                  if (seance.seance_filmid == `${filmID}`) {
                                   let hallId = seance.seance_hallid;
                                  let seanceId = seance.id;
                              //  console.log(hallId);
                                console.log(seanceId);
                                window.localStorage.setItem("seanceId", `${seanceId}`);
                                 window.location.href = "clientHall.html";
                              }
                                 })
                               }
                            });
                           //} else alert("Сеанс закончился"); ///
                          });
                       });
                      }
                    });
                  }
                });
              }
            });
            console.log(data);
          }
        });
      });
  });
}
 });
});
export function exportSeanceId() {
  const seanceId = window.localStorage.getItem("seanceId");
  return seanceId;
}
