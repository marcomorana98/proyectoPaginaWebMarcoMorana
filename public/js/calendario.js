const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");
let currentDay;
// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();
// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";
  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // da la clase de hoy al dia de hoy
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "hoy"
        : "";
    liTag += `<li class="day ${isToday}" onClick="crearDiv(this)">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};

renderCalendar();

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    changedMonth = true;
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});

function getObras(currentDay) {
  return fetch("dashboard/obtener-obras/?fecha=" + currentDay)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong");
    })
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson; // Do something with the response
    })
    .catch((error) => {
      console.log(error);
    });
}

async function crearDiv(ele) {
  // borra los div con clase "temp"
  let borrarDiv = document.querySelectorAll(".temp");
  borrarDiv.forEach((elem) => elem.parentNode.removeChild(elem));

  // borra la clase "active" a los elementos con la clase "day"
  let borrarActivos = document.querySelectorAll(".day");
  borrarActivos.forEach((elem) => elem.classList.remove("active"));

  // agrega la clase "active"
  ele.classList.add("active");

  // le da el valor del boton presionado a currentDay y lo manda a getObras para que nos de el contenido de la tabla de ese dia
  currentDay = currYear + "-" + (currMonth + 1) + "-" + ele.innerHTML;
  const delDia = await getObras(currentDay);

  // tomamos el main con id "main" para insertarle las estructuras
  let main = document.getElementById("main");

  // funcion que arma el objeto con el contenido de la tabla
  let reducer = function (acc, { direccion, ...resto }) {
    if (!acc[direccion]) acc[direccion] = [resto];
    else acc[direccion].push(resto);

    return acc;
  };

  let resultado = delDia.reduce(reducer, {});

  // toma el objeto creado con el reduce y utiliza sus datos para crear el div que mostrara los datos en el HTML
  const newDiv = Object.keys(resultado)
    .map(
      (key) =>
        `
        <div class= "table-responsive temp">
          <h2> ${key}</h2>
          <table class="table table-striped table-sm"> 
            <thead>
              <tr>
              <th scope="col">Legajo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Hora de entrada</th>
              <th scope="col">Hora de salida</th>
              </tr>
             </thead>
             <tbody>${resultado[key]
               .map(
                 (empleado) =>
                   `
              <tr>
                <td> ${empleado.legajo}</td>
                <td> ${empleado.nombre}</td>
                <td> ${empleado.entrada}</td>
                <td> ${empleado.salida}</td>
              </tr>
             `
               )
               .join("")}</tbody>
          </table>
        </div>
      `
    )
    .join("");

  main.insertAdjacentHTML("beforeend", newDiv);
}

// toma el elemento con la clase "hoy" y le aplica la funcion de crearDiv (muestra los datos del dia de hoy en el HTML)
crearDiv(document.querySelector(".hoy"));
