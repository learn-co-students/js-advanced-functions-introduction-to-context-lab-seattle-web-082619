function createEmployeeRecord (array) {
  const record = new Object();
  record.firstName = array[0];
  record.familyName = array[1];
  record.title = array[2];
  record.payPerHour = array[3];
  record.timeInEvents = [];
  record.timeOutEvents = [];
  return record;
}

function createEmployeeRecords(arrayOfArrays) {
  const recordsArray = [];
  for (const array of arrayOfArrays) {
    recordsArray.push(createEmployeeRecord(array))
  };
  return recordsArray
}

// add an Object with keys to the timeInEvents Array on the record Object:
// type: Set to "TimeIn"
// hour: Derived from the argument
// date: Derived from the argument
// date stamp ("YYYY-MM-DD HHMM")

function createTimeInEvent(record, dateTimeString) {
  const timeIn = new Object();
  timeIn.type = "TimeIn";
  timeIn.hour = parseInt(dateTimeString.slice(-4), 10)
  timeIn.date = dateTimeString.slice(0, 10)
  record.timeInEvents.push(timeIn)
  return record;
}

function createTimeOutEvent(record, dateTimeString) {
  const timeOut = new Object();
  timeOut.type = "TimeOut";
  timeOut.hour = parseInt(dateTimeString.slice(-4), 10)
  timeOut.date = dateTimeString.slice(0, 10)
  record.timeOutEvents.push(timeOut)
  return record;
}

function hoursWorkedOnDate(record, dateString) {
  const dateHourIn = record.timeInEvents.find( timeInObj => {
    return timeInObj.date === dateString;
  }).hour;
  const dateHourOut = record.timeOutEvents.find( timeOutObj => {
    return timeOutObj.date === dateString;
  }).hour;
  return (dateHourOut - dateHourIn) / 100
}

function wagesEarnedOnDate(record, dateString) {
  const hours = hoursWorkedOnDate(record, dateString);
  return hours * record.payPerHour
}

function allWagesFor(record) {
  const datesArray = record.timeInEvents.map( timeInObj => {
    return timeInObj.date
  });
  const wagesArray = [];
  for (const date of datesArray) {
    wagesArray.push(wagesEarnedOnDate(record, date))
  };
  const totalWages = wagesArray.reduce(function(sum, wage) {
    return sum + wage;
  }, 0);
  return totalWages;
}

function calculatePayroll(arrayOfRecords) {
  const allWages = []
  for (const record of arrayOfRecords) {
    allWages.push(allWagesFor(record))
  };
  const totalPayroll = allWages.reduce((sum, wagesTotal) => {
    return sum + wagesTotal;
  });
  return totalPayroll;
}

function findEmployeeByFirstName(srcArray, firstName) {
  for (const record of srcArray) {
    if (record.firstName === firstName) {
      return record;
    }
  }

}
