#!/usr/bin/env node

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
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

  // Check if a folder was passed as an argument...
  let dir = "";
  if (process.argv.length > 2) { dir = process.argv[2]; }

  // List of prompts for the user...
  const questions = [
    { 
      type: "input", name: "dir", message: "Where would you like to create your app?", default: "./my-plasma-app", when: () => (dir === "") 
    },

    { 
      type: "list", name: "userContext", message: "Who will be using this app?", choices: ["Patients", "Providers"], filter(val) { return val.toLowerCase(); } 
    },

    //{
    //  type: "list", name: "isStandalone", message: "Will this app be a standalone app or integrated (e.g. EHR Launch)?", choices: ["Standalone", "Integrated"], filter(val) { return val === "Standalone"; }
    //}

    {
      type: "list", name: "devicePlatform", message: "What type of app is this?", choices: ["Web", "Mobile"], filter(val) { return val.toLowerCase(); }
    },

    //{ 
    //  type: "checkbox", name: "platforms", message: "What platforms do you want to support?", choices: ["Epic", "Cerner"], default: ["Epic", "Cerner"]
    //},

    // TODO: Need to test this one
    //{
    //  type: "input", name: "epicNonProdID", message: "What is your Epic Non-Production Client ID? (Leave blank if you don't have it)", default: "", when: (answers) => (answers.platforms.indexOf("Epic") >= 0)
    //},

    { 
      type: "list", name: "templateType", message: "Would you like to start with a template, or create a blank app?", choices: ["Template", "Blank"], filter(val) { return val.toLowerCase(); } 
    },
  ];

  // Prompt user...
  console.log("🔥 🎇Welcome to PlasmaFHIR! Let's create a new project!🎇");
  console.log("");
  const answers = await inquirer.prompt(questions);
  if (!answers.dir) { answers.dir = dir; }  // Add directory if it was specified in the arguments...

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
  const templateData = getTemplateData(answers.devicePlatform, answers.userContext, answers.templateType);
  const sharedTemplate = path.resolve(__dirname, "templates", templateData.templateDirectory);
  await fse.copy(sharedTemplate, projectDir);

  // Create the config.ts file...
  console.log("Configuring...");
  const exampleConfigFile = path.resolve(projectDir, templateData.exampleConfigFilePath);
  const configFile = path.resolve(projectDir, templateData.configFilePath);
  fs.copyFileSync(exampleConfigFile, configFile);

  // Install the new project...
  console.log("Installing...");
  try {
    execSync(`cd ${projectDir} && npm install`, { stdio: "inherit" });
  } catch (error) { console.log("Unable to install."); }

  // TODO: Add the Epic Non-Production ID (if applicable)...

  // Finished...
  console.log("Done! Check out the README for information on how to launch your app!");
}

/**
 * Returns the name of the template folder based on the inputs
 * @param {devicePlatform} "web", "mobile"
 * @param {userContext} "patients", "clinicians"
 * @param {templateType} "blank", "template"
 * @returns { 
 *   templateDirectory: string, 
 *   exampleConfigFilePath: string 
 *   configFilePath: string
 * }
 * 
 */
function getTemplateData(devicePlatform, userContext, templateType) {
  let templateDirectory = "";
  let exampleConfigFilePath = "";
  let configFilePath = "";
  
  // Web...
  if (devicePlatform === "web") {

    // Patient...
    if (userContext === "patients") {
      if (templateType === "template") { templateDirectory = "patient-standalone-template-portal"; }
      else if (templateType === "blank") { templateDirectory = "patient-standalone-template-blank"; }
    }

    // Provider...
    if (userContext === "providers") {
      if (templateType === "template") { templateDirectory = "provider-ehr-template-portal"; }
      else if (templateType === "blank") { templateDirectory = "provider-ehr-template-blank"; }
    }

    // Compute path of config.example.ts...
    exampleConfigFilePath = `src/config/config.example.ts`;
    configFilePath = `src/config/config.ts`;
  } 

  // Mobile...
  if (devicePlatform === "mobile") {

    // Patient...
    if (userContext === "patients") {
      if (templateType === "template") { templateDirectory = "native-template-portal"; }
      else if (templateType === "blank") { templateDirectory = "native-template-portal"; }
    }

    // Provider...
    if (userContext === "providers") {
      if (templateType === "template") { templateDirectory = "native-template-portal"; }
      else if (templateType === "blank") { templateDirectory = "native-template-portal"; }
    }

    // Compute path of config.example.ts...
    exampleConfigFilePath = `constants/Config.example.ts`;
    configFilePath = `constants/Config.ts`;
  }

  return { 
    templateDirectory: templateDirectory,
    exampleConfigFilePath: exampleConfigFilePath,
    configFilePath: configFilePath
  };
}