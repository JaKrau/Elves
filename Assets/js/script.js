// In case your task bar minimizes, like mine, and you want to know that they past/present/future styling is displaying in accordance to the time
const twelveHourTime = dayjs().format('hA');
console.log(twelveHourTime);

let today = dayjs();
let htmlMain = document.getElementById('htmlMain');
let currentDay = document.getElementById('currentDay');
currentDay.textContent = today.format('MMMM DD, YYYY');

// this variable holds the cap to our for loop
let hoursInDay = 10;

// information for the for loop
let hours = [
  {time: 9, text: "AM", twentyFourHourIndex: 9}, 
  {time: 10, text: "AM", twentyFourHourIndex: 10}, 
  {time: 11, text: "AM", twentyFourHourIndex: 11},
  {time: 12, text: "PM", twentyFourHourIndex: 12}, 
  {time: 1, text: "PM", twentyFourHourIndex: 13}, 
  {time: 2, text: "PM", twentyFourHourIndex: 14}, 
  {time: 3, text: "PM", twentyFourHourIndex: 15}, 
  {time: 4, text: "PM", twentyFourHourIndex: 16}, 
  {time: 5, text: "PM", twentyFourHourIndex: 17}
];

// this loop generates our page contents by pulling from the hours array
for (let hourIndex=0; hourIndex < hoursInDay - 1; hourIndex++) {
  let time24 = hours[hourIndex].twentyFourHourIndex;
  let timeDisplay = hours[hourIndex].time + hours[hourIndex].text;
  let currentTime24 = dayjs().format('H');
  
  let hourSection = document.createElement("section");
  hourSection.className = 'row time-block';
  hourSection.id = "hour-" + hours[hourIndex].time;
  
  let hourDiv = document.createElement('div');
  hourDiv.className = 'hourDiv col-2 col-md-1 hour text-center py-3';
  hourDiv.textContent = timeDisplay;
  
  let textArea = document.createElement('textarea');
  textArea.className = "col-8 col-md-10 description " + timeDisplay;
  textArea.rows = '3';
  textArea.id = timeDisplay;
 
  // grabs values from local storage using the timeDisplay/id as the key and writes it to the corresponding text field
  let storedNote = localStorage.getItem(timeDisplay);
  textArea.textContent = storedNote;


  let saveButton = document.createElement('button');
  saveButton.className = 'btn saveBtn col-2 col-md-1';
  saveButton.setAttribute('aria-label', 'save');

  // save button functionality, adds textArea contents to local storage, using id's for keys
  $(".saveBtn").on("click", function() {
    let hour = $(this).siblings(".description").attr("id");
    let note = $(this).siblings(".description").val();
    localStorage.setItem(hour, note);
  });

  let iElement = document.createElement('i');
  iElement.className = 'fas fa-save';
  iElement.setAttribute('aria-hidden', 'true');
  
  // attaching elements to htmlMain
  saveButton.appendChild(iElement);
  hourSection.appendChild(hourDiv); 
  hourSection.appendChild(textArea);
  hourSection.appendChild(saveButton);
  htmlMain.appendChild(hourSection);
  
  // dynamically setting class names so our styling can colorize each text box based on local(?) time;
  if (time24 < currentTime24){
    textArea.className += " past";
  } else if (time24 == currentTime24) {
    textArea.className += " present";
  } else if (time24 > currentTime24) {
    textArea.className += " future";
  }
}

// this block is my solution to the for loop failing to save 5PM to local storage, I don't know why it's failing but I knew I could generate a quick fix this way. The for loop does succeed in reading/writing for the 5PM time block.
let finalTimeBlockTextArea = htmlMain.children[8].children[1];
let finalTimeBlockSaveButton = htmlMain.children[8].children[2];
$(finalTimeBlockSaveButton).on("click", function () {
  let hour = $(this).siblings(".description").attr("id");
  let note = $(this).siblings(".description").val();
  localStorage.setItem(hour, note);
})


//This was my first run at retrieving local storage, once I had this built I realized I could reduce the code to just two lines inside my for loop!
/*
function getNotes() {
  // initializing variables to hold our localStorage contents
  let timeBlock_9AM = localStorage.getItem("9AM");
  let timeBlock_10AM = localStorage.getItem("10AM");
  let timeBlock_11AM = localStorage.getItem("11AM");
  let timeBlock_12PM = localStorage.getItem("12PM");
  let timeBlock_1PM = localStorage.getItem("1PM");
  let timeBlock_2PM = localStorage.getItem("2PM");
  let timeBlock_3PM = localStorage.getItem("3PM");
  let timeBlock_4PM = localStorage.getItem("4PM");
  let timeBlock_5PM = localStorage.getItem("5PM");

  // initializing variables for each text area
  let textBox_9AM = htmlMain.children[0].children[1];
  let textBox_10AM = htmlMain.children[1].children[1];
  let textBox_11AM = htmlMain.children[2].children[1];
  let textBox_12PM = htmlMain.children[3].children[1];
  let textBox_1PM = htmlMain.children[4].children[1];
  let textBox_2PM = htmlMain.children[5].children[1];
  let textBox_3PM = htmlMain.children[6].children[1];
  let textBox_4PM = htmlMain.children[7].children[1];
  let textBox_5PM = htmlMain.children[8].children[1];

  // connecting our timeBlock variable containing local storage Values to our textBox variables (textArea in the above for loop)
  textBox_9AM.textContent = timeBlock_9AM;
  textBox_10AM.textContent = timeBlock_10AM;
  textBox_11AM.textContent = timeBlock_11AM;
  textBox_12PM.textContent = timeBlock_12PM;
  textBox_1PM.textContent = timeBlock_1PM;
  textBox_2PM.textContent = timeBlock_2PM;
  textBox_3PM.textContent = timeBlock_3PM;
  textBox_4PM.textContent = timeBlock_4PM;
  textBox_5PM.textContent = timeBlock_5PM;
}

getNotes();
*/