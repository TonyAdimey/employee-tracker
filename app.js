const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost', 
  port: 3306, 
  user: 'root', 
  password: 'root', 
  database: 'employee_db' 
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
  start();
});

function start() {
  inquirer
    .prompt({
      name: 'menu',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View all employees', 'View roles', 'View all departments', 'Add role', 'Add employee', 'Add department', 'Exit']
    })
    .then((answer) => {
      switch (answer.menu) {
        case 'View all employees':
            viewAllEmployees();
            break;
        case 'View Roles':
            viewRoles();
            break;
        case 'View all departments':
            viewAllDepartments();
            break;
        case 'Add role':
            addRole();
            break;
        case 'Add employee':
            addEmployee();
            break;
        case 'Add department':
            addDepartment();
            break;
        case 'Exit':
          connection.end();
          break;
        };
    });
};

function viewAllEmployees() {
    db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id', function (err, results) {
        console.table(results);
        start();
    });
};

function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
      console.table(results);
      start();
    });
};

function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
      start();
    });
};

function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "What is their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "What is their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "What is their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          startPrompt()
      });
  });
};

function addRole() {
    db.query('SELECT * FROM department', (err, results) => {
      let departName = results.map((department) => {
        return {
          name: department.name,
          value: department.id,
        };
      });
  
      inquirer.prompt([
        {
          type: 'input',
          message: 'What is the role name?',
          name: 'role_name',
        },
        {
          type: 'input',
          message: 'What is the role salary?',
          name: 'role_salary',
        },
        {
          type: 'list',
          message: 'What department is this role in?',
          name: 'department_name',
          choices: departName
        }
      ]).then((answers) => {
          db.query('INSERT INTO role SET ?',
            {
              title: answers.role_name,
              salary: answers.role_salary,
              department_id: answers.department_name
            },
            function (err) {
              if (err) throw err;
            }
          );
          viewAllRoles()
        });
    });
};

function addDepartment() {
    inquirer.prompt([
      {
        type: 'input',
        message: 'What is the department name?',
        name: 'department_name',
      }
    ]).then((answers) => {
        db.query('INSERT INTO department(name) VALUES(?)', answers.department_name, function (err, results) {
          console.table(results);
          start();
        });
    });
};

start();