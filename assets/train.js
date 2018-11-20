$(document).ready(function() {
  var database = firebase.database();

  $("#addTrain").click(function() {
    event.preventDefault();

    var trainN = $("#trainName")
      .val()
      .trim();

    var destinationVar = $("#destination")
      .val()
      .trim();

    var firsTrainTim = $("#firstTime")
      .val()
      .trim();

    var trainFrequency = $("#frequency")
      .val()
      .trim();

    //console.log(trainN);
    //console.log(destinationVar);
    //console.log(firsTrainTim);
    //console.log(trainFrequency);

    var newTrainObj = {
      name: trainN,
      destination: destinationVar,
      firstTrain: firsTrainTim,
      frequency: trainFrequency
    };

    // Uploads train data to the database
    database.ref().push(newTrainObj);

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTime").val("");
    $("#frequency").val("");

    alert("Train successfully added to the Database!");

    //console.log("submit click");
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var trainFirstTrain = childSnapshot.val().firstTrain;

    let trainTime = moment(trainFirstTrain, "HH:mm");
    console.log(trainTime);
    let currentTime = moment().format("HH:mm");
    console.log(currentTime);
    let maxTime = moment.max(moment(), trainTime);
    console.log(maxTime);

    let arriveTime;
    let minuteleft;

    if (maxTime === trainTime) {
      arriveTime = trainTime.format("HH:mm");
      minuteleft = trainTime.diff(moment(), "minutes");
    } else {
      let differenceTimes = moment().diff(trainTime, "minutes");
      var trainRemainder = differenceTimes % trainFrequency;
      minuteleft = trainFrequency - trainRemainder;
      // To calculate the arrival time, add the tMinutes to the current time
      arriveTime = moment()
        .add(minuteleft, "m")
        .format("HH:mm");
    }

    addNewRow(
      trainName,
      trainDestination,
      trainFrequency,
      arriveTime,
      minuteleft
    );
  });

  function addNewRow(nameInput, destInput, freqInput, arrivalInput, minInput) {
    // 1. create a row , first you will need to grab id then you will

    // Step 1: Grab the table
    let tableBody = $("#tableBody");

    // Step2: Take a look at the html code, how we make a new row?
    let newRow = $("<tr>");

    let newTdName = $("<td>").text(nameInput);
    let newDestination = $("<td>").text(destInput);
    let newFrequency = $("<td>").text(freqInput);

    // New Arrival time
    let newArrival = $("<td>").text(arrivalInput);

    // Minute from now
    let newMinutes = $("<td>").text(minInput);

    newRow.append(
      newTdName,
      newDestination,
      newFrequency,
      newArrival,
      newMinutes
    );

    tableBody.append(newRow);
  }
});
