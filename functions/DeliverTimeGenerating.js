import moment from "moment";

export default DeliverTimeGenerating = (number_of_days, date) => {
  const X = number_of_days;

  var dates = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var mydate = new Date(date);

  for (let I = 2; I < Math.abs(X + 2); I++) {
    var myObject = {};

    var nextDay = new Date(mydate);
    nextDay.setDate(mydate.getDate() + I);
    if (I === 2) {
      myObject["Select"] = true;
    } else {
      myObject["Select"] = false;
    }
    myObject["id"] = I - 2;
    myObject["Date"] = nextDay.getDate();
    myObject["Day"] = days[nextDay.getDay()];
    myObject["Complete"] = moment(nextDay).format("MM/D/YY");

    dates.push(myObject);
  }

  return dates;
};

//for future call(-7)
//for past call(7)
