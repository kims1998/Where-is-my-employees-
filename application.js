const inquirer = require('inquirer');
const mysql = require('mysql');
const table = require('console.table');

const PORT = process.env.PORT || 3306;

var connection = mysql.createConnection(
    {
    host: "localhost",
    database: "company_db",
},
    console.log("You are now connected to the database!"),
);

//User is presented with the initial list of choices.
function opening(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "toDo",
            choices: [
                {
                name: "View All Departments",
                value: "VIEW_DEPARTMENTS"
                },
                {
                name: "View All Roles",
                value: "VIEW_ROLES"
                },
                {
                name: "View All Employees",
                value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add a Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add a Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add an Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                },
            ]},
        ])
        .then((answer) => {
            if(answer.choice === "View All Departments") {
                viewDepartments();
            } else if(answer.choice === "View All Roles") {
                viewRoles();

            } else  if(answer.choice === "View All Employees") {
                viewEmployees();

            } else if(answer.choice === "Add a Department") {
                addDepartment();

            } else if(answer.choice === "Add a Role") {
                addRole();

            } else if(answer.choice === "Add an Employee") {
                addEmployee();

            } else if(answer.choice === "Update Employee Role") {
                updateRole();
                
            } else if(answer.choice === "Quit") {
                connection.end();
        }});
    };

    function viewDepartments() {
        connection.query("SELECT * FROM departments", function(err, res) {
            console.table(res, "Here are all the departments!");
            opening();
        });
    };

    function viewRoles() {
        connection.query("SELECT * FROM roles", function(err, res) {
            console.table(res, "Here are all the roles!");
            opening();
        });
    };
    
    function viewEmployees() {
        connection.query("SELECT * FROM employees", function(err, res) {
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
        .then(function(final) {
            const sql = "INSERT INTO departments(dept_name) VALUE (?)";
            connection.query(sql, final.deptName, function(err, res) {
                if (err) throw err;
                console.log(res, "Department added!");
            });
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
        .then(function(final) {
            const sql = "INSERT INTO roles(role_title, salary, departments_id) VALUE(?,?,?)";
            connection.query(sql, final.roleName, final.salary, final,id, function(err, res) {
                if (err) throw err;
                console.log(res, "Role added!");
            });
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
                name: "role"
            },
            {
                type: "input",
                message: "Who is the employee's manager?",
                name: "manager"
            }
        ])
        .then(function(final) {
            const sql = "INSERT INTO employees(first_name, last_name, department_id, manager)";
            connection.query(sql, final.fName, final.lName, final.role, final.manager, function(err, res) {
            if (err) throw err;
            console.log(res, "Employee added!");
            });
        });
    };


    function updateRole() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the ID of the employee you want to update?",
                name: "id"
            },
            {
                type: "input",
                message: "What is their new role?",
                name: "role"
            },
            {
                type: "input",
                message: "What is their salary?",
                name: "salary"
            },
            {
                type: "input",
                message: "What is the ID of the department they will be in?",
                name: "department"
            }
        ])
        .then (function(final) {
            const sql = "UPDATE roles SET role_title = ?, salary = ?, departments_id = ? WHERE id = ?";
            connection.query(sql, [final.role, final.salary, final.department, parseInt(final.id)], function(err, res) {
                if (err) throw err;
                console.log(res, "Role has been updated!");
            });
        });
    };

    app.use((req, res) => {
        res.status(404).send('Page not found!');
    });

    app.listen(PORT, () => {
        console.log(`Server is listening on PORT: ${PORT}`);
    });