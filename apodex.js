//given by nasa after registration on https://api.nasa.gov/
let key = "jdXTBjcvZ9yrTeVVvfAa1U6zukOXiPgOaZOZn0vx";

//the Astronomy Picture Of the Day started on 16th of June 1995
let firstImageDate = "1995-06-16";

//defining date of today (in fact today minus 1 day, because of time difference between France and the US,
//we assume we can only have image of yesterday whatever the hour in France.
let currentDate = new Date(Date.parse(new Date()) - 86400000);

//test affichage avec video
// let currentDate = new Date("2021-02-23");

//test affichage avec date du jour
// let currentDate = new Date();

//extracting year, month and day of today as numbers
let currentYear = currentDate.getFullYear(); //used for drop down list of years
let currentMonth = currentDate.getMonth() + 1; //in new Date, January = 0, December = 11
let currentDay = currentDate.getDate();
// console.log("currentDate : " + typeof currentDate); //return object
// console.log("currentYear : " + typeof currentYear); //return number
// console.log("currentMonth : " + typeof currentMonth); //return number
// console.log("currentDay : " + typeof currentDay); //return number
// console.log(
//   `currentDate au format nombre : ${currentYear} ${currentMonth} ${currentDay}`
// );

//initialiazing the date to display
let dateToDisplay = currentDate;
// let dateToDisplay = new Date("2021-03-01");

//defining variables that store date to display before clicking button next/previous date
let yearToDisplayRecorded;
let monthToDisplayRecorded;

//defining variables set by the user
let dayUser;
let monthUser;
let yearUser;
let dateUser;

//extracting year, month and day of the date to display as numbers to use in selected option in drop down lists
let yearToDisplay = dateToDisplay.getFullYear();
let monthToDisplay = dateToDisplay.getMonth() + 1; //in new Date, January = 0, December = 11
let dayToDisplay = dateToDisplay.getDate();
// console.log("dateToDisplay : " + typeof dateToDisplay); //return object
// console.log("yearToDisplay : " + typeof yearToDisplay); //return number
// console.log("monthToDisplay : " + typeof monthToDisplay); //return number
// console.log("dayToDisplay : " + typeof dayToDisplay); //return number
// console.log(
//   `currentDate au format nombre : ${yearToDisplay} ${monthToDisplay} ${dayToDisplay}`
// );

//display media (image or video) of the day with information
displayInfo(dateToDisplay);

//generate the drop down lists with preselected options
generateSelectDayValues(dayToDisplay);
generateSelectMonthValues(monthToDisplay);
generateSelectYearValues(yearToDisplay);

function recordDateToDisplay() {
  //recording yearToDisplay and monthToDisplay before changing dateToDisplay
  yearToDisplayRecorded = dateToDisplay.getFullYear();
  monthToDisplayRecorded = dateToDisplay.getMonth() + 1; //in new Date, January = 0, December = 11
}

//date is given by chosing a date in a drop down list
function chooseDate() {
  // getting day, month and year given by user,
  dayUserString = document.getElementById("selectDay").value;
  monthUserString = document.getElementById("selectMonth").value;
  yearUserString = document.getElementById("selectYear").value;
  dateUser = new Date(`${yearUserString}-${monthUserString}-${dayUserString}`);
  if (Date.parse(dateUser) < Date.parse(firstImageDate)) {
    //the date is prior to 1995-06-16
    dateUser = new Date(firstImageDate);
    dateToDisplay = dateUser;
    window.alert("il n'y a pas de média avant le 16 juin 1995");
  } else if (Date.parse(dateUser) > Date.parse(currentDate)) {
    dateUser = new Date(currentDate);
    dateToDisplay = dateUser;
    window.alert("il n'y a pas de média après la date courante");
  } else if (
    //the date is valid
    Date.parse(dateUser) <= Date.parse(currentDate) &&
    Date.parse(dateUser) >= Date.parse(firstImageDate)
  ) {
    dateToDisplay = dateUser;
  } else {
    //the date is invalid
    window.alert("date invalide");
    dateToDisplay = currentDate;
  }
  updateInfo();

  // dayUserNumber = Number(dayUserString);
  // monthUserNumber = Number(monthUserString) - 1;
  // yearUserNumber = Number(yearUserString);
  // console.log(new Date(yearUserNumber, monthUserNumber, dayUserNumber));
}

//date is given by clicking button "Précédent"
function previousDate() {
  recordDateToDisplay();

  //dateToDisplay is set to previous day (8 640 000 ms = 24 hours)
  dateToDisplay = new Date(Date.parse(dateToDisplay) - 86400000);

  //Test the date that can't be prior to 16th of June 1995
  if (Date.parse(dateToDisplay) < Date.parse(firstImageDate)) {
    dateToDisplay = new Date(firstImageDate);
    window.alert("il n'y a pas de média avant le 16 juin 1995");
  }

  updateInfo();
}

//date is given by clicking button "Suivant"
function nextDate() {
  recordDateToDisplay();

  //dateToDisplay is set to next day (8 640 000 ms = 24 hours)
  dateToDisplay = new Date(Date.parse(dateToDisplay) + 86400000);

  //Test the date that can't be after currentDate
  if (Date.parse(dateToDisplay) > Date.parse(currentDate)) {
    dateToDisplay = new Date(currentDate);
    window.alert("il n'y a pas de média après la date courante");
  }

  updateInfo();
}

//update the selected options in drop down lists and display new media with information
function updateInfo() {
  //generating new selectDayValues
  dayToDisplay = dateToDisplay.getDate();
  generateSelectDayValues(dayToDisplay);

  //generating new selectMonthValues if necessary
  monthToDisplay = dateToDisplay.getMonth() + 1; //in new Date, January = 0, December = 11
  if (monthToDisplay != monthToDisplayRecorded) {
    generateSelectMonthValues(monthToDisplay);
    // window.alert("mois qui change");
  }

  //generating new selectYearValues if necessary
  yearToDisplay = dateToDisplay.getFullYear();
  if (yearToDisplay != yearToDisplayRecorded) {
    generateSelectYearValues(yearToDisplay);
    // window.alert("année qui change");
  }

  displayInfo(dateToDisplay);
  // console.log(dateToDisplay);
}

//generating values for displaying drop-down list of days
function generateSelectDayValues(dayPreSelected) {
  //erase previous content
  document.getElementById("selectDay").innerHTML = "";
  for (let i = 1; i < 32; i++) {
    if (i == dayPreSelected) {
      document.getElementById(
        "selectDay"
      ).innerHTML += `<option value="${i}" selected>${i}</option>`;
    } else {
      document.getElementById(
        "selectDay"
      ).innerHTML += `<option value="${i}">${i}</option>`;
    }
  }
}

//generating values for displaying drop-down list of month
function generateSelectMonthValues(monthPreSelected) {
  //erase previous content
  document.getElementById("selectMonth").innerHTML = "";
  for (let i = 1; i < 13; i++) {
    let month;
    switch (i) {
      case 1:
        month = "janvier";
        break;
      case 2:
        month = "février";
        break;
      case 3:
        month = "mars";
        break;
      case 4:
        month = "avril";
        break;
      case 5:
        month = "mai";
        break;
      case 6:
        month = "juin";
        break;
      case 7:
        month = "juillet";
        break;
      case 8:
        month = "août";
        break;
      case 9:
        month = "septembre";
        break;
      case 10:
        month = "octobre";
        break;
      case 11:
        month = "novembre";
        break;
      case 12:
        month = "décembre";
        break;
    }
    if (i == monthPreSelected) {
      document.getElementById(
        "selectMonth"
      ).innerHTML += `<option value="${i}" selected>${month}</option>`;
    } else {
      document.getElementById(
        "selectMonth"
      ).innerHTML += `<option value="${i}">${month}</option>`;
    }
  }
}

//generating values for displaying drop-down list of years
function generateSelectYearValues(yearPreSelected) {
  //erase previous content
  document.getElementById("selectYear").innerHTML = "";
  for (let i = 1995; i < currentYear + 1; i++) {
    if (i == yearPreSelected) {
      document.getElementById(
        "selectYear"
      ).innerHTML += `<option value="${i}" selected>${i}</option>`;
    } else {
      document.getElementById(
        "selectYear"
      ).innerHTML += `<option value="${i}">${i}</option>`;
    }
  }
}

//parameter is date as an object
function displayInfo(date) {
  //date is put as format YYYY-MM-DD
  let dateString = date.toISOString().slice(0, 10);

  //get data from NASA API with date in format YYYY-MM-DD
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${dateString}`)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
        document.getElementById(
          "showDateError"
        ).innerHTML = `Il n'y a pas de média pour cette date`;
      }
      return response.json();
    })

    //display data
    .then(function (json) {
      //test the type of media and display video or image
      if (json.media_type == "video") {
        document.getElementById(
          "media"
        ).innerHTML = ` <div class="video-responsive">
                            <iframe src="${json.url}" title="video"
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                            <p>Votre navigateur ne prend pas en charge les vidéos HTML5.
                            Voici <a href="${json.url}">un lien pour télécharger la vidéo</a>.
                            </p>
                            </iframe>
                          </div>`;
      } else {
        document.getElementById(
          "media"
        ).innerHTML = `<img src="${json.url}" width="20%" alt="${json.title}">`;
      }
      //display name of the author only if copyright exists
      if (json.copyright != undefined) {
        document.getElementById("copyright").innerHTML =
          "copyright: " + json.copyright;
      } else {
        document.getElementById("copyright").innerHTML = "";
      }

      //display date of the media
      // document.getElementById("date").innerHTML = json.date;

      //display title of the media
      document.getElementById("title").innerHTML = json.title;

      //display explanation of the media
      document.getElementById("explanation").innerHTML = json.explanation;
    })
    .catch(function (error) {
      var p = document.createElement("p");
      //procéder à l'effacement des infos et afficher un message d'erreur
      //
      //
      //
      //

      p.appendChild(
        document.createTextNode("Il n'existe pas de média pour cette date")
      );
      //null must be put as 2nd parameter
      document.body.insertBefore(p, null);
    });
}
