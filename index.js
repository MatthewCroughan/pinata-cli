#!/usr/bin/env node 

const program = require('commander');
const fs = require("fs");
const path = require('path');
const { handleUpload, handleSubmarine, getSubmarineAuth, getAuth, logIn, logInSubmarine } = require('./lib');
program
  .version('1.0.3')
  .name('pinata-cli')
  .description('A command line tool to upload files and folders to Pinata')
  .option('-a, --authFile [jwt]', 'API jwt from Pinata')  
  .option('-as --authFileSubmarine [api key]', 'V2 API Key from Pinata')
  .option('-u, --upload [file or folder]', 'Source folder or file to upload to IPFS')
  .option('-s, --submarine [file or folder]', 'Source folder or file to submarine on Pinata')
  .parse(process.argv)

const main = async () => {
  try {
    const { upload, submarine, authFile, authFileSubmarine } = program.opts();
    if(upload) {
      await getAuth();
      const result = await handleUpload(upload);
      console.log(JSON.stringify(result));;
    }    

    if(submarine) {
      await getSubmarineAuth();
      const result = await handleSubmarine(submarine);
      console.log(JSON.stringify(result));;
    }

    if(authFile) {
      await logIn(fs.readFileSync(authFile));
      console.log("Authenticated");
    }

    if(authFileSubmarine) {
      await logInSubmarine(fs.readFileSync(authFileSubmarine));
      console.log("Authenticated");
    }
  } catch (error) {
    console.log(error)
  }
}

main()
