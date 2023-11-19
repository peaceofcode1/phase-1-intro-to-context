function createEmployeeRecord(employeeData) {
    const [firstName, familyName, title, payPerHour] = employeeData;
  
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map(employeeData => createEmployeeRecord(employeeData));
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date: date
    });
  
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date: date
    });
  
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const timeIn = timeInEvent.hour;
    const timeOut = timeOutEvent.hour;
  
    return (timeOut - timeIn) / 100; 
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
  
    return hoursWorked * payRate;
  }
  
  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
  
    return dates.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => {
      return totalPayroll + allWagesFor(employeeRecord);
    }, 0);
  }
  
  
  const employeesData = [
    ["John", "Doe", "Manager", 25],
    ["Jane", "Smith", "Developer", 20],
    
  ];
  
  const employeeRecords = createEmployeeRecords(employeesData);
  
 
  console.log(employeeRecords);
  
 
  const totalPayroll = calculatePayroll(employeeRecords);
  console.log("Total Payroll:", totalPayroll);
  