const inquirer = require("inquirer");
const pool = require("./pool");

async function readVaults() {
  try {
    const query = "SELECT * FROM vaults";
    const { rows } = await pool.query(query);
    console.log("Vault List:");
    console.table(rows);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function createVault() {
  try {
    const vaultInfo = await inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the vault?",
        name: "vaultName",
      },
    ]);
    const { vaultName } = vaultInfo;
    const query = "INSERT INTO vaults (name) VALUES ($1)";
    await pool.query(query, [vaultName]);
    console.log("Vault added successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function readRoles() {
  try {
    const query = `SELECT 
    roles.id,
    roles.title,
    roles.salary,
    Vaults.name AS vault
    FROM roles
    JOIN vaults ON roles.vault_id = vaults.id;`;
    const { rows } = await pool.query(query);
    console.log("Role List:");
    console.table(rows);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function createRole() {
  try {
    const vaultQuery = "SELECT id, name FROM vaults";
    const vaultResult = await pool.query(vaultQuery);
    const vaultChoices = vaultResult.rows.map((row) => ({
      name: row.name,
      value: row.id,
    }));

    questions = [
      {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary of the role?",
        name: "roleSalary",
      },
      {
        type: "list",
        message: "What vault does the role belong to?",
        name: "roleVault",
        choices: vaultChoices,
      },
    ];

    const newRoleInfo = await inquirer.prompt(questions);

    const { roleName, roleSalary, roleVault } = newRoleInfo;

    const query = `
            INSERT INTO roles (title, salary, vault_id) 
            VALUES ($1, $2, $3)
        `;
    await pool.query(query, [roleName, roleSalary, roleVault]);

    console.log("Role created successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function readEmployees() {
  try {
    const query = `SELECT 
    employees.id,
    employees.first_name,
    employees.last_name,
    roles.title, 
    vaults.name AS vault,
    roles.salary,
    CONCAT(manager.first_name,' ',manager.last_name) AS manager_name
    FROM vaults
    JOIN roles
    ON vaults.id=roles.vault_id
    JOIN employees
    ON roles.id=employees.role_id
    LEFT JOIN employees manager
    ON employees.manager_id=manager.id;`;
    const { rows } = await pool.query(query);
    console.log("Employee List:");
    console.table(rows);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function createEmployee() {
  try {
    const managerQuery = `SELECT id, CONCAT(employees.first_name, ' ', employees.last_name) AS manager_name FROM employees`;
    const managerResult = await pool.query(managerQuery);
    if (managerResult.rows.length === 0) {
      console.log(
        "There are no managers available. Please add managers before adding employees."
      );
      mainMenu();
      return;
    }
    const employeeChoices = [
      { name: "None", value: null },
      ...managerResult.rows.map((row) => ({
        name: row.manager_name,
        value: row.id,
      })),
    ];

    const roleQuery = "SELECT id, title FROM roles";
    const roleResult = await pool.query(roleQuery);
    const roleChoices = roleResult.rows.map((row) => ({
      name: row.title,
      value: row.id,
    }));

    const questions = [
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "roleId",
        choices: roleChoices,
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        name: "managerId",
        choices: employeeChoices,
      },
    ];

    const employeeInfo = await inquirer.prompt(questions);

    const { firstName, lastName, roleId, managerId } = employeeInfo;

    const query = `
      INSERT INTO employees (first_name, last_name, role_id, manager_id) 
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [firstName, lastName, roleId, managerId]);

    console.log("Employee added successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function updateRole() {
  try {
    // Fetch employee choices
    const employeeQuery = `SELECT id, CONCAT(employees.first_name, ' ', employees.last_name) AS employee_name FROM employees`;
    const employeeResult = await pool.query(employeeQuery);
    const employeeChoices = employeeResult.rows.map((row) => ({
      name: row.employee_name,
      value: row.id,
    }));

    // Fetch role choices
    const roleQuery = "SELECT id, title FROM roles";
    const roleResult = await pool.query(roleQuery);
    const roleChoices = roleResult.rows.map((row) => ({
      name: row.title,
      value: row.id,
    }));

    const questions = [
      {
        type: "list",
        message: "Which employee's role would you like to update?",
        name: "roleUpdate",
        choices: employeeChoices,
      },
      {
        type: "list",
        message:
          "Which role would you like to assign to the selected employee?",
        name: "assignRole",
        choices: roleChoices,
      },
    ];

    const roleInfo = await inquirer.prompt(questions);

    const { roleUpdate, assignRole } = roleInfo;

    const query = `
      UPDATE employees
      SET role_id = $1
      WHERE id = $2;
    `;
    await pool.query(query, [assignRole, roleUpdate]);

    console.log("Role updated successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = {
  readVaults,
  createVault,
  readRoles,
  createRole,
  readEmployees,
  createEmployee,
  updateRole,
};
