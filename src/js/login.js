const authorization = document.querySelector(".authorization");
const emailInput = document.querySelector(".authorization-input-email");
const passwordInput = document.querySelector(".authorization-input-password");
const form = document.querySelector(".authorization-form");
const authorizationBtn = document.querySelector(".authorization-btn");

if (authorizationBtn !== null) {
  authorizationBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    fetch("https://shfe-diplom.neto-server.ru/login", {
      method: "POST",
      body: JSON.stringify({ login: email, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
          
        } else {
          throw new Error("Ошибка авторизации");
        }
        
      })
      .then((result) => {
       
        if (result.success) { 
          window.location.href = "admin.html";
          authorization.style.display = "none";
        } else {
          console.error("Ошибка: неверный логин или пароль");
          alert("Ошибка: неверный логин или пароль");
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);

      });
    
  });
}