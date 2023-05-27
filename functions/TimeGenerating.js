import moment from "moment";

export default timeFrom = (number_of_days, number_of_days_forward_from_now) => {

  
  const X = number_of_days;
  let ski = number_of_days_forward_from_now;

  var dates = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var today = new Date();
  // const date = new Date();
  // const year = date.getFullYear();
    // const month = date.getMonth();
    // const day = date.getDate();
  // var today = new Date(year, month, day  + 1);

  for (let I = 0; I < Math.abs(X); I++) {
    var myObject = {};
    if (ski === 0 || ski === "" || ski === null || ski === "null") {
      if (I === 0) {
        today = new Date();
        myObject["Select"] = true;
      } else {
        const cal =
          parseInt(24) *
          parseInt(60) *
          parseInt(60) *
          parseInt(1000) *
          parseInt(I);
        today = new Date(new Date().getTime() + cal);
        myObject["Select"] = false;
      }
    } else {
      if (I === 0) {
        const cal = parseInt(48) * parseInt(60) * parseInt(60) * parseInt(1000);
        today = new Date(new Date().getTime() + cal);
        myObject["Select"] = true;
      } else {
        const j = parseInt(I) + parseInt(2);

        const cal =
          parseInt(24) * parseInt(60) * parseInt(60) * parseInt(1000) * j;
        today = new Date(new Date().getTime() + cal);
        myObject["Select"] = false;
      }
    }

    // let dateToday =
    //   today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + nom; // today.getDate();
    let dateToday = moment(today).format("MM/D/YY");

    myObject["id"] = I;
    myObject["Date"] = today.getDate();
    myObject["Day"] = days[today.getDay()];
    myObject["Complete"] = dateToday; //moment(dateToday).format("l");

    myObject["Available"] = true;
    dates.push(myObject);
  }

  console.warn("dates complete for collection\n", dates);

  return dates;
};

//for future call(-7)
//for past call(7)
