const fs = require("fs")

const inquirer = require("inquirer")

const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

function buildTeam(){
    inquirer.prompt({
        type: "input",
        message: "Hello! Welcome to the Team Profile Builder by Cinnastar12! \n" + "Please enter the manager's name",
        name: "name"
    })
}
