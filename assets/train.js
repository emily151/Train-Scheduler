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

    console.log(trainN);
    console.log(destinationVar);
    console.log(firsTrainTim);
    console.log(trainFrequency);

    //console.log("submit click");
  });
});
