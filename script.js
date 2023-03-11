const date_header = document.querySelector("#date-header");
const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;
const temp = document.querySelector("#temp");
const city_el = document.querySelector("#city-name");
const description = document.querySelector("#description");
const city_input_form = document.querySelector("#cityinpform");
const city_input = document.querySelector("#cityinp");
const main_container = document.querySelector(".container");
const h2 = document.querySelector("#err");
const content = document.querySelector(".content");
console.log(h2);

const img = document.querySelector("#wimg");
const get_date = function () {
  const a = new Date();
  const month = a.toLocaleString("default", { month: "long" });
  const dayOfWeekName = new Date().toLocaleString("default", {
    weekday: "long",
  });
  const datestr = `${dayOfWeekName},${a.getDate()}th ${month}`;
  return datestr;
};
const get_weather = function (city) {
  h2.style.display = "none";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      temp.textContent = "";
      city_el.textContent = "";
      date_header.textContent = "";
      description.textContent = "";
      img.setAttribute(`src`, "");

      img.setAttribute(
        `src`,
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );

      temp.textContent = data.main.temp + "°C";
      city_el.textContent = data.name;
      date_header.textContent = get_date();
      description.textContent = data.weather[0].description;
      main_container.style.opacity =1 ; 
    })
    .catch((err) => {
     
      h2.style.display = "block";
      const html = `<h2>Error 404 , Unable to get Weather Data </h2>`;
      h2.innerHTML = html;
      main_container.style.opacity =1 ; 
    });
};

city_input_form.addEventListener("submit", function (e) {
  e.preventDefault();
  get_weather(city_input.value);
  
});
