/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  // apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
  // authDomain: "time-sheet-55009.firebaseapp.com",
  // databaseURL: "https://time-sheet-55009.firebaseio.com",
  // storageBucket: "time-sheet-55009.appspot.com"

    // apiKey: "AIzaSyCLaJZkcoKtnnRlCGUOU0LuMcwlnY6pKWo",
    // authDomain: "train-scheduler-8b1e2.firebaseapp.com",
    // databaseURL: "https://train-scheduler-8b1e2.firebaseio.com",
    // projectId: "train-scheduler-8b1e2",
    // storageBucket: "train-scheduler-8b1e2.appspot.com",
    // messagingSenderId: "20132806187"

    apiKey: "AIzaSyDmLqSqiPJ2Jr9NM-da9E6HK80qJCxxVQM",
    authDomain: "myawesomeproject-a0664.firebaseapp.com",
    databaseURL: "https://myawesomeproject-a0664.firebaseio.com",
    projectId: "myawesomeproject-a0664",
    storageBucket: "myawesomeproject-a0664.appspot.com",
    messagingSenderId: "768651652703"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#firstTrain-input").val().trim(), "DD/MM/YY").format("X");
  var frequency = $("#frequency-input").val().trim();
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destionation = childSnapshot.val().role;
  // var firstTrain = childSnapshot.val().start;
  var frequency = childSnapshot.val().rate;
  var nextArrival = childSnapshot.val().rate;
  var minutesAway = childSnapshot.val().rate;

  // Train Info
  console.log(trainName);
  console.log(destination);
  // console.log(firstTrain);
  console.log(frequency);
  console.log(nextArrival);
  console.log(minutesAway);

    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  // var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
  // var tMinutes = tFrequency - tRemainder;

  // // To calculate the arrival time, add the tMinutes to the currrent time
  // var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
  // console.log(tMinutes);
  // console.log(tArrival);

  // console.log(moment().format("hh:mm A"));
  // console.log(tArrival);
  // console.log(moment().format("X"));

  // Add each train's data into the table 
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + tRemainder + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");






  // Prettify the train start
  // var trainStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  // console.log(empMonths);

  // // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // // Add each train's data into the table
  // $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + empRole + "</td><td>" +
  // trainStartPretty + "</td><td>" + trainMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
