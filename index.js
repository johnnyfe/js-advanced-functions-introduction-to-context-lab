// Your code here
function createEmployeeRecord (row) { 
    return {
        firstName:row[0],
        familyName:row[1],
        title:row[2],
        payPerHour:row[3],
        timeInEvents:[],
        timeOutEvents:[],
    }
};
function createEmployeeRecords (employeeRowData){
    return employeeRowData.map(function (row){
        return createEmployeeRecord(row)
    })   
}
function createTimeInEvent (employee,newDate){
    let [date,hour]=newDate.split(' ')
    employee.timeInEvents.push({
        type:"TimeIn",
        hour:parseInt(hour,10),
        date,
    })
    return employee
}
function createTimeOutEvent (employee,newDate) {
    let [date, hour]=newDate.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour,10),
        date,
    })
    return employee
}
function hoursWorkedOnDate (employee, showDate){
    let inEvent = employee.timeInEvents.find(function (e){
        return e.date === showDate
    })
    let outEvent = employee.timeOutEvents.find(function (e){
        return e.date === showDate
    })
    return (outEvent.hour - inEvent.hour)/100
}
function wagesEarnedOnDate (employee, showDate){
    let rawWage = hoursWorkedOnDate(employee,showDate)*employee.payPerHour;
    return parseFloat(rawWage.toString())
}
function allWagesFor (employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate (employee, d)
    },0)
    return payable
}
function calculatePayroll (arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    },0)
}
function findEmployeeByFirstName (srcArray,firstName){
    return srcArray.find(function(rec){
        return rec.firstName===firstName
    })
}