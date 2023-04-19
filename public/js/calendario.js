const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");
let currentDay;
let changedMonth = false;
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
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="day ${isToday}" onClick="crearDiv(this)">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
  if (!changedMonth) {
    console.log(document.querySelector(".day.active"));
    crearDiv(document.querySelector(".day.active"));
  }
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
getObras();
async function crearDiv(ele) {
  let borrarDiv = document.querySelectorAll(".temp");
  borrarDiv.forEach((elem) => elem.parentNode.removeChild(elem));

  let borrarActivos = document.querySelectorAll(".day");
  borrarActivos.forEach((elem) => elem.classList.remove("active"));

  ele.classList.add("active");

  currentDay = currYear + "-" + (currMonth + 1) + "-" + ele.innerHTML;
  const delDia = await getObras(currentDay);
  console.log(delDia);
  let main = document.getElementById("main");
  let divReferencia = document.getElementById("ref");
  let calendario = document.getElementById("calendar");

  let obras = [];
  for (let i = 0; delDia.length > i; i++) {
    if (!obras.includes(delDia[i].direccion)) {
      obras.push(delDia[i].direccion);
    }
  }
  console.log(obras);
  let newDiv;
  for (let i = 0; obras.length > i; i++) {
    newDiv = document.createElement("div");
    newDiv.classList.add("table-responsive", "temp");
    let newH2 = document.createElement("h2");
    newH2.appendChild(document.createTextNode(obras[i]));
    newDiv.appendChild(newH2);
    let newTable = document.createElement("table");
    newTable.classList.add("table", "table-striped", "table-sm");
    let tHead = document.createElement("thead");
    let row = tHead.insertRow();
    for (let j = 0; j < 4; j++) {
      const cell = row.insertCell();
      cell.setAttribute("scope", "col");
      switch (j) {
        case 0:
          cell.appendChild(document.createTextNode("Legajo"));
          break;
        case 1:
          cell.appendChild(document.createTextNode("Nombre"));
          break;
        case 2:
          cell.appendChild(document.createTextNode("Hora de entrada"));
          break;
        case 3:
          cell.appendChild(document.createTextNode("Hora de salida"));
          break;
      }
    }
    newTable.appendChild(tHead);
    let tBody = document.createElement("tbody");
    newTable.appendChild(tBody);
    /*    <div class="table-responsive">
                <h2> obras[i] </h2>
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th scope="col">Legajo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Hora de entrada</th>
                        <th scope="col">Hora de salida</th>
                        </tr>
                    </thead>
                    <tbody> */
    for (let k = 0; delDia.length > k; k++) {
      if (delDia[k].direccion == obras[i]) {
        let row2 = tBody.insertRow();
        for (let a = 0; a < 4; a++) {
          const cell = row2.insertCell();
          switch (a) {
            case 0:
              cell.appendChild(document.createTextNode(delDia[k].legajo));
              break;
            case 1:
              cell.appendChild(document.createTextNode(delDia[k].nombre));
              break;
            case 2:
              cell.appendChild(document.createTextNode(delDia[k].entrada));
              break;
            case 3:
              cell.appendChild(document.createTextNode(delDia[k].salida));
              break;
          }
        }
        /*     <tr>
                                <td> asistencias[j].legajo</td>
                                <td> asistencias[j].nombre</td>
                                <td> asistencias[j].entrada</td>
                                <td> asistencias[j].salida</td>
                            </tr> */
      }
    }
    newDiv.appendChild(newTable);
  }
  main.insertBefore(newDiv, divReferencia);
  /* </tbody>
            </table>
        </div> */
}

function mostrarObras() {
  document.querySelector("#obras").innerHTML = "";
}

/*const days = document.querySelectorAll(".day");
days.forEach(day => {
    day.addEventListener("click", () => {selectDay(day)});
    day.addEventListener("click", () => {mostrarObras()});
})
*/
