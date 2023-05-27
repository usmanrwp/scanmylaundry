// 'not_seen','seen','assigned','coming_pick','picked','reached','processing','coming_drop','dropped'

export default OrderStatusEssex = OrderStatus => {
  return new Promise(async function(res, rej) {
    const status = OrderStatus;
    let response = [];

    if (!(status === null || status === "null")) {
      //seen
      if (status === "seen") {
        response.push({
          colorStatus: "#28730a",
          textStatus: "Seen",
          orderStatus: status
        });
      } //not_seen
      else if (status === "not_seen") {
        response.push({
          colorStatus: "#35b0f2",
          textStatus: "Not seen",
          orderStatus: status
        });
      } //assigned
      else if (status === "assigned") {
        response.push({
          colorStatus: "#F6A93D",
          textStatus: "Assigned",
          orderStatus: status
        });
      } //coming_pick
      else if (status === "coming_pick") {
        response.push({
          colorStatus: "#9c0606",
          textStatus: "Coming for Collecting",
          orderStatus: status
        });
      } //picked
      else if (status === "picked") {
        response.push({
          colorStatus: "#35b0f2",
          textStatus: "Picked",
          orderStatus: status
        });
      } //reached
      else if (status === "reached") {
        response.push({
          colorStatus: "#35b0f2",
          textStatus: "Reached at laundry house",
          orderStatus: status
        });
      } //processing
      else if (status === "processing") {
        response.push({
          colorStatus: "#35b0f2",
          textStatus: "Booked",
          orderStatus: status
        });
      } //coming_drop
      else if (status === "coming_drop") {
        response.push({
          colorStatus: "#35b0f2",
          textStatus: "Coming for delivering",
          orderStatus: status
        });
      } //dropped
      else if (status === "dropped") {
        response.push({
          colorStatus: "#35b0f2",
          textStatus: "Completed",
          orderStatus: status
        });
      } //else
      else {
        response.push({
          colorStatus: "#35b0f2",
          textStatus: "No Match",
          orderStatus: "no_match"
        });
      }
    } else {
      response.push({
        colorStatus: "#35b0f2",
        textStatus: "NA",
        orderStatus: "NA"
      });
    }

    res(response[0]);
    return response[0];
  });
};

// response.push({
//     colorStatus:'#',
//     textStatus:'',
// })
