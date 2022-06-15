const inquirer = require('inquirer');

function userChoices(){
    return inquirer.prompt([
//User is presented with the initial list of choices.
        {
            type: "list",
            message: "What would you like to do?",
            name: "toDo",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update Employee Role",
                "Quit",
            ],
        },

        {
            type: "",
            message: "",
            name: "viewDepartments",
        },
        {
            type: "",
            message: "",
            name: "viewRoles",
        },
        {
            type: "",
            message: "",
            name: "viewEmployees",
        },
        {
            type: "",
            message: "",
            name: "addDepartment",
        },
        {
            type: "",
            message: "",
            name: "addRole",
        },
        {
            type: "",
            message: "",
            name: "addEmployee",
        },
        {
            type: "",
            message: "",
            name: "updateRoles",
        },
        {
            type: "",
            message: "",
            name: "quit",
        },
    ]);
};
