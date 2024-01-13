async function fetchData(entiteit, halte) {
  const apiKey = 'ddb68605719d4bb8b6444b6871cefc7a'; // Replace 'YOUR_API_KEY' with your actual API key


  const apiUrl = `https://api.delijn.be/DLKernOpenData/api/v1/haltes/${entiteit}/${halte}/real-time?maxAantalDoorkomsten=5`; // Replace with your API endpoint
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    createApplication(data);
  } catch (error) {
    console.log('Error fetching data:', error);
    const leftContainerbottom = document.getElementById('leftContainerbottom');
    if (leftContainerbottom.innerText != "There are no busses for this stop at the moment.") {
      leftContainerbottom.innerHTML = '<p class=lijninfo>Could not fetch data, please try again later...</p>';
    }

  }

}

function createApplication(data) {

  if (!data.halteDoorkomsten[0]) {
    leftContainerbottom.innerHTML = '<p class=lijninfo>There are no busses for this stop at the moment.</p>';
  }
  let doorkomstlength = data.halteDoorkomsten[0].doorkomsten.length
  const bestemmingen = []
  const lijnnummers = []
  const richting = []
  const dienstregelingTijdstip = []
  const real_timeTijdstip = []

  //let stringToInt = parseInt("06")
  for (let i = 0; i < doorkomstlength; i++) {
    bestemmingen.push(data.halteDoorkomsten[0].doorkomsten[i].bestemming)
  }
  for (let i = 0; i < doorkomstlength; i++) {
    lijnnummers.push(data.halteDoorkomsten[0].doorkomsten[i].lijnnummer)
  }
  for (let i = 0; i < doorkomstlength; i++) {
    if (data.halteDoorkomsten[0].doorkomsten[i].richting == "HEEN") {
      richting.push("naar")
    } else (
      richting.push("van")
    )

  }
  for (let i = 0; i < doorkomstlength; i++) {
    if (data.halteDoorkomsten[0].doorkomsten[i].dienstregelingTijdstip != undefined) {
      dienstregelingTijdstip.push(data.halteDoorkomsten[0].doorkomsten[i].dienstregelingTijdstip)
    } else {
      dienstregelingTijdstip.push("Geen dienstregelingtijd voor deze rit")
    }
  }
  for (let i = 0; i < doorkomstlength; i++) {
    if (data.halteDoorkomsten[0].doorkomsten[i]["real-timeTijdstip"] != undefined) {
      real_timeTijdstip.push(data.halteDoorkomsten[0].doorkomsten[i]["real-timeTijdstip"])
    } else {
      real_timeTijdstip.push("none")
    }
  }
  if (leftContainer == null) {
    return
  }

  for (let i = 0; i < doorkomstlength; i++) {

    const date = new Date(dienstregelingTijdstip[i]);
    const currentdate = new Date();
    const currenthour = currentdate.getHours();
    const currentminute = currentdate.getMinutes();
    const hour = date.getHours();
    let minute = date.getMinutes();
    const totalMinutes = hour * 60 + minute;
    const totalMinutescurrent = currenthour * 60 + currentminute;


    if (real_timeTijdstip[i] != "none") {

      const realtimedate = new Date(real_timeTijdstip[i]);

      const hourrealtime = realtimedate.getHours();
      let minuterealtime = realtimedate.getMinutes();
      const totalMinutesrealtime = hourrealtime * 60 + minuterealtime;
      let timeDifference = totalMinutesrealtime - totalMinutes;
      let timetilldep = totalMinutesrealtime - totalMinutescurrent;
      minute = minute.toString().padStart(2, '0');
      if (timetilldep < -1000) {
        timetilldep += 1440
      }
      if (timeDifference == 0) {
        timeDifference = "On time"
      } else if (timeDifference > 0) {
        timeDifference = "+" + timeDifference;
      }

      div = document.createElement("div");

      div.innerHTML = `<div class=lijncards>
        <div class="top">
        <h2 class=lijncardstitle>${lijnnummers[i]}</h2>
    <div class="topright">
        <h3 class=lijncardsdestin>${bestemmingen[i]}</h3>
        <p class="timedifference">${timeDifference}
        </p>
    </div>
        </div>

        <div class="times">
        <span class="time">
        ${hour}:${minute} </span>
        <span class="intime">${timetilldep} Min.
        </span>
        </div></div>`
      leftContainerbottom.appendChild(div);
    }

    else if (i == 0) {
      const timeDifference = "Komt aan"
      minute = minute.toString().padStart(2, '0');
      div = document.createElement("div");
      div.innerHTML = `<div class="lijncards">
        <div class="top">
        <h2 class="lijncardstitle"></h2><h3 class="lijncardsdestin"></h3></div><span class="timedifference">
        </span><div class="times"><span class="time">
        </span><span class="intime">Now
        </span></div></div>`
      div.querySelector(".lijncardstitle").innerText = lijnnummers[i];
      div.querySelector(".lijncardsdestin").innerText = bestemmingen[i];
      div.querySelector(".time").innerText = timeDifference;
      leftContainerbottom.appendChild(div);
    } else {
      const timeDifference = "No data"
      minute = minute.toString().padStart(2, '0');
      div = document.createElement("div");
      div.innerHTML = `<div class="lijncards">
        <div class="top">
        <h2 class="lijncardstitle"></h2><h3 class="lijncardsdestin"></h3></div><span class="timedifference">
        </span><div class="times"><span class="time">
        </span><span class="intime">/
        </span></div></div>`
      div.querySelector(".lijncardstitle").innerText = lijnnummers[i];
      div.querySelector(".lijncardsdestin").innerText = bestemmingen[i];
      div.querySelector(".time").innerText = timeDifference;
      leftContainerbottom.appendChild(div);
    }

  }
  lastdiv = document.createElement("div");
  lastdiv.innerHTML = `<div class=lastdiv><a href="https://www.delijn.be/nl/contact/attest-aanvraag/" target="_blank">Late?</a></div>`
  leftContainerbottom.appendChild(lastdiv);
}