$(function(){
    addListeners();
    runTest();
    checkBudgetAndColorText();
});

class Employee {
    constructor(firstName, lastName, id, title, annualSalary){
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.title = title;
        this.annualSalary = annualSalary;
    }
}

let employees = [];

function addListeners(){
    $('button').on('click', addEmployee);
    $(document).on('click', '.deleteButton', removeEmployee);
}

function addEmployee(){
    let inputs = $('input');
    let firstName = $(inputs[0]).val();
    let lastName = $(inputs[1]).val();
    let id = $(inputs[2]).val();
    let title = $(inputs[3]).val();
    let annualSalary = $(inputs[4]).val();
    employees.push(new Employee(firstName, lastName, id, title, annualSalary));
    $('input').val('');
    refreshPage();
}

function removeEmployee() {
    let clickedEmployeeId = $(this).children('td:nth-of-type(3)').text();
    let clickedEmployeeIndex = employees.findIndex((employee) => {
        return employee.id == clickedEmployeeId;
    });
    employees.splice(clickedEmployeeIndex, 1);
    $(this).remove();
    refreshPage();
}

function refreshPage(){
    $('table').empty();
    $('table').append(tableHeaders);
    for(employee of employees){
        $('table').append(createTableItemForEmployee(employee));
    }
    $('#budget').text(formatBudget(findRemainingBudget()));
    checkBudgetAndColorText();
}

function findRemainingBudget(){
    let annualCost = 0;
    for(employee of employees){
        annualCost += parseInt(employee.annualSalary);    
    }
    return annualCost/12;
}

function formatBudget(amount){
    return '$' + amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatSalary(amount) {
    return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function checkBudgetAndColorText(){    
    if(findRemainingBudget() > 20000){
        $('#budget').css('color', 'red');        
    } else {
        $('#budget').css('color', 'black');
    }
}

function createTableItemForEmployee(employee){
    let row = 
        '<tr class="employeeRow">' +
            `<td class="firstName">${employee.firstName}</td>` +
            `<td class="lastName">${employee.lastName}</td>` +
            `<td class="id">${employee.id}</td>` +
            `<td class="title">${employee.title}</td>` +
            `<td class="annualSalary">${formatSalary(employee.annualSalary)}</td>` +
            `<td class="deleteButton"><img src="trash-alt.svg" alt=""></td>` +
        `</tr>`;
    return row;
}

let tableHeaders = 
        `<tr>` +
            `<th>First Name</th>` +
            `<th>Last Name</th>` +
            `<th>ID</th>` +
            `<th>Title</th>` +
            `<th>Annual Salary</th>` +
            `<th></th>` +
        `</tr>`;

const testData = [
    {
        firstName: 'Bill',
        lastName: 'Hickey',
        id: '4532',
        title: 'Developer',
        annualSalary: 100000
    },
    {
        firstName: 'Dante',
        lastName: 'Pitera',
        id: '4542',
        title: 'Accountant',
        annualSalary: 100000
    },
    {
        firstName: 'Paul',
        lastName: 'Bobzien',
        id: '2981',
        title: 'Manager',
        annualSalary: 130000
    },
    {
        firstName: 'Connor',
        lastName: 'Reilly',
        id: '9083',
        title: 'Accountant',
        annualSalary: 110000
    }
]

function runTest(){
    for(employee of testData){
        let inputs = $('input');
        $(inputs[0]).val(employee.firstName);
        $(inputs[1]).val(employee.lastName);
        $(inputs[2]).val(employee.id);
        $(inputs[3]).val(employee.title);
        $(inputs[4]).val(employee.annualSalary);
        $('button').click();
    }
}