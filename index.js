const inquirer = require("inquirer");
const pool = require("./db/pool");
const {
  readVaults,
  createVault,
  readRoles,
  createRole,
  readEmployees,
  createEmployee,
  updateRole,
} = require("./db/db.js");

pool.connect();

async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Menu:",
      choices: [
        "View dwellers",
        "Add dweller",
        "Update a dwellers role",
        "View roles",
        "Add role",
        "View all vaults",
        "Add vault",
        "Quit",
      ],
    },
  ]);

  switch (action) {
    case "View all vaults":
      await readVaults();
      break;
    case "View roles":
      await readRoles();
      break;
    case "View dwellers":
      await readEmployees();
      break;
    case "Add vault":
      await createVault();
      break;
    case "Add role":
      await createRole();
      break;
    case "Add dweller":
      await createEmployee();
      break;
    case "Update a dwellers role":
      await updateRole();
      break;
    case "Quit":
      console.log("Goodbye!");
      process.exit();
  }

  mainMenu();
}

function init() {
  console.log(`
  ________             ________
  ________VAULT MANAGER________`);
  mainMenu();
}

init();
