const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const connection = mysql.createConnection(
    {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_db",
});

connection.connect(function (err) {
    // if (err) throw err,
    console.log("\n you hacked into the mainframe! \n");
    opening();
});

//User is presented with the initial list of choices.
function opening() {
    inquirer.prompt({
            type: "list",
            message: "What would you like to do?",
            name: "toDo",
            choices:
            [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update Employee Role",
                "Quit"
            ],
            })
        .then((answer) => {
            switch (answer.userAction) {
                case "View All Departments":
                viewDepartments();
                break;

                case "View All Roles":
                viewRoles();
                break;

                case "View All Employees":
                viewEmployees();
                break;

                case "Add a Department":
                addDepartment();
                break;

                case "Add a Role":
                addRole();
                break;

                case "Add an Employee":
                addEmployee();
                break;

                case "Update Employee Role":
                updateRole();
                break;

                case "Quit":
                connection.end();
                break;
            };
        });
    };

    function viewDepartments() {
        const sql = "SELECT * FROM department";
        connection.query(sql, function(err, res) {
            // if (err) throw err;
            console.table(res, "Here are all the departments!");
            opening();
        });
    };

    function viewRoles() {
        const sql = "SELECT * FROM roles";
        connection.query(sql, function(err, res) {
            if (err) throw err;
            console.table(res, "Here are all the roles!");
            opening();
        });
    };
    
    function viewEmployees() {
        const sql = "SELECT * FROM employee";
        connection.query(sql, function(err, res) {
            if (err) throw err;
            console.table(res, "Here are all the employees!");
            opening();
        });
    };

    function addDepartment() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the Department?",
                name: "deptName"
            },
        ])
    .then((final) => {
        connection.query(
            "INSERT INTO department(name) VALUE(?)",
            [final.deptName],
            function(err, res) {
                if (err) throw err;
                console.table(res, "Department added!");
                opening();
            },
        );
    });
    };

    function addRole() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the Role?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is the salary of the Role?",
                name: "salary"
            },
            {
                type: "input",
                message: "What is the ID of the Department the role will be under?",
                name: "id"
            }
        ])
        .then((final) => {
            connection.query(
                "INSERT INTO roles(title, salary, department_id) VALUE(?, ?, ?)",
                [final.roleName, final.salary, final.id],
                function(err, res) {
                    if (err) throw err;
                    console.table(res, "Role added!");
                    opening();
                }
            );
        });
    };
    
    function addEmployee() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "fName"
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "lName"
            },
            {
                type: "input",
                message: "What is the employee's role?",
                name: "roleID"
            },
            {
                type: "input",
                message: "Who is the employee's manager?",
                name: "managerID"
            }
        ])
        .then((final) => {
            connection.query(
                "INSERT INTO employee(first_name, last_name, roles_id, manager_id) VALUE(?, ?, ?, ?)",
                [final.fName, final.lName, final.roleID, final.managerID],
                function(err, res) {
                    if (err) throw err;
                    console.table(res, "Employee added!");
                    opening();
                }
            );
        });
    };

    function updateRole() {
        let employeeArr = [];
        let roleArr = [];
        connection.query("SELECT id,title FROM roles ORDER BY title ASC", function (
          err,
          res
        ){
          if (err) throw err;
          for (i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
          };
          connection.query(
            "SELECT employee.id, concat(employee.first_name, employee.last_name) AS Employee FROM employee ORDER BY employee ASC",
            function (err, res) {
              if (err) throw err;
              for (i = 0; i < res.length; i++) {
                employeeArr.push(res[i].Employee);
              };
              inquirer
                .prompt([
                  {
                    name: "role",
                    type: "list",
                    message: "What is this new role?",
                    choices: roleArr,
                  },
                  {
                    name: "employee",
                    type: "list",
                    message: "What employee would you like to edit?",
                    choices: employeeArr,
                  },
                ])
                .then((final) => {
                  connection.query(
                    `UPDATE employee SET roles_id = ${final.role} WHERE id = ${final.employee}`
                  );
                })
                .catch((err) => console.log(err));
            }
          );
        });
      };