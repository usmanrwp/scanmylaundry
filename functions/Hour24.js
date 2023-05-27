export default Hour24 = () => {
  return new Promise(resolve => {
    let record = [];
    let time = "4-7 PM";
    record.push({
      id: 1,
      time: time
    });
    record.push({
      id: 2,
      time: "7-10 PM"
    });
    // for (let i = 5; i < 11; i++) {
    //   let time = i + ":00 PM";
    //   record.push({
    //     id: parseInt(1) + parseInt(i),
    //     time: time
    //   });
    // }
    // let time1 = "12:00 PM";
    // record.push({
    //   id: 13,
    //   time: time1
    // });
    // for (let i = 1; i < 12; i++) {
    //   let time = i + ":00 PM";
    //   record.push({
    //     id: parseInt(13) + parseInt(i),
    //     time: time
    //   });
    // }

    resolve(record);
    return record;
  });
};
