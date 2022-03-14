const inquirer = require("inquirer");
const path = require("path");
const fse = require("fs-extra");
const { execSync } = require("child_process");

// Run the process...
run().then(
    () => { process.exit(0); },
    (error) => {
      console.error(error);
      process.exit(1);
    }
  );
  

// create-plasma-app...
async function run() {

  // List of prompts for the user...
  const questions = [
    { 
      type: "input", name: "dir", message: "Where would you like to create your app?", default: "./my-plasma-app" 
    },

    { 
      type: "list", name: "userContext", message: "Who will be using this app?", choices: ["Patients", "Clinicians"], filter(val) { return val.toLowerCase(); } 
    },

    { 
      type: "checkbox", name: "platforms", message: "What platforms do you want to support?", choices: ["Epic", "Cerner"], default: ["Epic", "Cerner"]
    },

    { 
      type: "list", name: "templateType", message: "Would you like to start with a template, or create a blank app?", choices: ["Template", "Blank"], filter(val) { return val.toLowerCase(); } 
    },
  ];

  // Prompt user...
  console.log("🔥 🎇Welcome to PlasmaFHIR! Let's create a new project!🎇");
  console.log("");
  const answers = await inquirer.prompt(questions);

  // Create directory...
  const projectDir = path.resolve(process.cwd(), answers.dir);
  const relativeProjectDir = path.relative(process.cwd(), projectDir);
  const projectDirIsCurrentDir = relativeProjectDir === "";
  if (!projectDirIsCurrentDir) {
    if (fse.existsSync(projectDir)) {
      console.log(`️"${relativeProjectDir}" already exists. Please try again with a different directory.`);
      process.exit(1);
    } else {
      await fse.mkdir(projectDir);
    }
  }

  // Copy the template...
  const templateName = getTemplateName(answers.userContext, answers.templateType);
  const sharedTemplate = path.resolve(__dirname, "templates", templateName);
  await fse.copy(sharedTemplate, projectDir);

  // Install packages...
  execSync("npm install", { stdio: "inherit", cwd: projectDir });

  // Finished...
  console.log("Done! Check out the README for information on how to launch your app!");
}

/**
 * Returns the name of the template folder based on the inputs
 * @param {userContext} "patients", "clinicians"
 * @param {templateType} "blank", "template"
 */
function getTemplateName(userContext, templateType) {

  // Patient...
  if (userContext === "patients") {
    if (templateType === "template") { return "patient-portal-starter"; }
    else if (templateType === "blank") { return "patient-portal-blank"; }
  }

  // Provider...
  if (userContext === "clinicians") {
    if (templateType === "template") { return "provider-portal-starter"; }
    else if (templateType === "blank") { return "provider-portal-blank"; }
  }

  return "";
}