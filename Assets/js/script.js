// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
let today = dayjs();
let currentDay = document.getElementById('currentDay');
currentDay.textContent = today.format('MMMM DD, YYYY');
let htmlMain = document.getElementById('htmlMain');
let hoursInDay = 9;
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





for (let hourIndex=0; hourIndex < hoursInDay; hourIndex++) {
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
  textArea.className = "col-8 col-md-10 description";
  textArea.rows = '3';
  
  let saveButton = document.createElement('button');
  saveButton.className = 'btn saveBtn col-2 col-md-1';
  saveButton.setAttribute('aria-label', 'save');
  
  let iElement = document.createElement('i');
  iElement.className = 'fas fa-save';
  iElement.setAttribute('aria-hidden', 'true');
  saveButton.appendChild(iElement);
  hourSection.appendChild(hourDiv); 
  hourSection.appendChild(textArea);
  hourSection.appendChild(saveButton);
  htmlMain.appendChild(hourSection);
  
  if (time24 < currentTime24){
    textArea.className += "";
    textArea.className += "col-8 col-md-10 description past";
  } else if (time24 == currentTime24) {
    textArea.className += "";
    textArea.className += "col-8 col-md-10 description present";
  } else if (time24 > currentTime24) {
    textArea.className += "";
    textArea.className += "col-8 col-md-10 description future";
  }
}

