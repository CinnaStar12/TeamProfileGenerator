const fs = require("fs")

const inquirer = require("inquirer")


const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")


async function buildTeam() {
    const team = []
    inquirer.prompt([{
        type: "input",
        message: "Hello! Welcome to the Team Profile Builder by Cinnastar12! \n" + "Let's start by adding your manager! \n" + "Please enter the manager's name",
        name: "name"
    },
    {
        type: "input",
        message: "Please enter your manager's id Number",
        name: "id"
    },
    {
        type: "input",
        message: "Please enter your manager's email address.",
        name: "email"
    },
    {
        type: "input",
        message: "Please enter your manager's office number",
        name: "officeNumber"
    }]
    ).then((data) => {
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
        team.push(manager)
        newTeamMember(team)

    }).catch((err) => {
        if (err) throw err;
    })

}


// 
async function newTeamMember(team) {
    try {
        const choice = await inquirer.prompt({
            type: "confirm",
            message: "Would you like to add another member?",
            name: "confirm"
        })

        if (choice.confirm) {
            const role = await inquirer.prompt({
                type: "list",
                message: "What is your new member's position?",
                choices: ["Engineer", "Intern"],
                name: "role"
            })

            if (role.role === "Engineer") {
                ``
                const member = await newEngineer(team)

            }
            else {
                const member = await newIntern(team)

            }

        }
        else {
            generateProfile(team);
        }
    } catch (err) {
        console.log(err)
    }
}

function newEngineer(team) {
    inquirer.prompt([{
        type: "input",
        message: "Please enter your engineer's name.",
        name: "name"
    },
    {
        type: "input",
        message: "Please enter your engineer's ID number.",
        name: "id"
    },
    {
        type: "input",
        message: "Please enter your engineer's email address.",
        name: "email"
    },
    {
        type: "input",
        message: "Please enter your engineer's gitHub username",
        name: "github"
    }]
    ).then((data) => {
        const engineer = new Engineer(data.name, data.id, data.email, data.github)
        team.push(engineer)
        newTeamMember(team)
    }).catch((err) => { if (err) throw err })

}

function newIntern(team) {
    inquirer.prompt([{
        type: "input",
        message: "Please enter your intern's name.",
        name: "name"
    },
    {
        type: "input",
        message: "Please enter your intern's ID number.",
        name: "id"
    },
    {
        type: "input",
        message: "Please enter your intern's email address.",
        name: "email"
    },
    {
        type: "input",
        message: "Please enter your intern's school.",
        name: "school"
    }]
    ).then((data) => {
        const intern = new Intern(data.name, data.id, data.email, data.school)
        team.push(intern)
        newTeamMember(team)
    }).catch((err) => { if (err) throw err })
}

function generateProfile(team) {
    const startHtml = `<!DOCTYPE html>
    <html lang="en-us">
    
    <head>
        <meta charset="UTC-8">
        </meta>
        <title>Team Profile Generator</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <script src="https://kit.fontawesome.com/5bc96e206d.js" crossorigin="anonymous"></script>
    </head>
    
    <body>
        <div class="container">
            <div class="row">`
    fs.appendFile("./output/index.html", startHtml, (err) => {
        if (err) throw err
    })


    for (let member of team) {
        if (member.getRole() === "Manager") {
            const html = `<div class="col-md text-center">
            <div class="card">
                <div class="card-header">
                    <h5>${member.name}</h5>
                    <h5><i class="fab fa-black-tie"></i>Manager</h5>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${member.id}
                        </li>
                        <li class="list-group-item">Email: ${member.email}</li>
                        <li class="list-group-item">Office Number: ${member.officeNumber}</li>
                    </ul>
                </div>
            </div>
            </div>`
            fs.appendFile("./output/index.html", html, (err) => {
                if (err) throw err;
            })

        }
        else if (member.getRole() === "Engineer") {
            const html = `<div class="col-md text-center">
            <div class="card">
            <div class="card-header">
                <h5>${member.name}</h5>
                <h5><i class="fas fa-tools"></i>Engineer</h5>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${member.id}
                    </li>
                    <li class="list-group-item">Email: ${member.email}</li>
                    <li class="list-group-item">Github: <a href=https://github.com/${member.github}>${member.github}</a></li>
                </ul>
            </div>
        </div>
        </div>`
            fs.appendFile("./output/index.html", html, (err) => {
                if (err) throw err;
            })

        }
        else if (member.getRole() === "Intern") {
            const html = `<div class="col-md text-center">
            <div class="card">
            <div class="card-header">
                <h5>${member.name}</h5>
                <h5><i class="fas fa-coffee"></i>Intern</h5>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${member.id}
                    </li>
                    <li class="list-group-item">Email: ${member.email}</li>
                    <li class="list-group-item">School: ${member.school}</li>
                </ul>
            </div>
        </div>
        </div>`
            fs.appendFile("./output/index.html", html, (err) => {
                if (err) throw err;
            })
        }
    }
    const endHtml = `</div>
    </div>
    </div>
    </body>
    
    </html>`
    fs.appendFile("./output/index.html", endHtml, (err) => {
        if (err) throw err;
        console.log("Team profile generated. Check your output folder.")
    })
}

buildTeam();