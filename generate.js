'use strict'

const fs = require('fs')
const express = require('express')
const vorpal = require('vorpal')()

/* generate a project with a costom name */
vorpal
  .command('make project <name>', 'Outputs "making project"')
  .action(function(args, callback) {
    const name = args.name
    generateProject(name)

    this.log('makeing project ' + name)
    callback()
  })

/* generate a project with a random name */
vorpal
  .command('make project random name', 'Outputs "making project"')
  .action(function(args, callback) {
    const randomName = genProjectName()
    generateProject(randomName)

    this.log('makeing project ' + randomName)
    callback()
  })

/* do vorpal stuff */
vorpal
  .delimiter('test$')
  .show()

/* function to generate random project names */
function genProjectName() {
  return Math.random();
}

/* function for generating a project */
function generateProject(name) {
  let noRepeat = true;

  /* generate the root directory if it dosen't already exist*/
    /* check if it exists */
  fs.mkdir('./' + name, function(err) {
    if(err) {
      console.log('there ere')
      throw err
    }

    console.log('generted root');
  })

  /* function to generate the other directorys */
  function generateDirectory(dirName) {

    fs.mkdir('./' + name + '/' + dirName, function(err) {
      if(err) {
        throw err
      }

      console.log('generating ' + dirName)
    })
  }

  /* function to generate directory inside another directory */
  function generateDirectoryInDirectory(dirName, rootDir) {
    fs.mkdir('./' + name  + '/' + rootDir + '/' + dirName, function(err) {
      if(err) {
        throw err
      }

      console.log('generating ' + dirName)
    });
  }

  /* generate the directorys */
  const dirs = ['controllers', 'routes', 'models', 'views', 'public']
  const publicFolders = ['css', 'js', 'img']

  /* generate the dirs in root and public folder */
  for(let i = 0; i < dirs.length; i++) {
    generateDirectory(dirs[i]);
  }

  for(let i = 0; i < publicFolders.length; i++) {
    generateDirectoryInDirectory(publicFolders[i], 'public')
  }

  /* function to generate the file for the directorys that are not the root
  directory */
  function generateFile(fileName, rootDir, rootDir2) {
    const path = null;

    if(rootDir2 != 'null') {
      path = './' + name + '/' + rootDir2 + '/' + rootDir + '/' + fileName

    } else {
      path = './' + name + '/' + rootDir + '/' + fileName
    }

    console.log('the path is ' + path)

    fs.writeFile(path, function(err) {
        if(err) {
          throw err;
        }

        console.log('generated file ' + fileName)
    })
  }

  /* function to generate files that are in the root directory */
  function generateRootFile(fileName, fileContent) {

    fs.writeFile('./' + name + '/' + fileName, fileContent, function(err) {
      if(err) {
        throw err;
      }

      console.log('generated file ' + fileName)
    })
  }

  /* all the files */
  const routesFiles = ['indexRoute.js']
  const contollerFiles = ['indexController.js']
  const modelFiles = ['indexModel.js']
  const viewFiles = ['index.html']
  const styleFile = ['style.css']

  const appFile = require('../genFiles/app');
  console.log(appFile);

  /* generate the files */
  /* could do this with a function diden't */
  for(let i = 0; i < routesFiles.length; i++) {
    generateFile(routesFiles[i], 'routes', null)
  }

  for(let i = 0; i < contollerFiles.length; i++) {
    generateFile(contollerFiles[i], 'controllers', null)
  }

  for(let i = 0; i < modelFiles.length; i++) {
    generateFile(modelFiles[i], 'models', null)
  }

  for(let i = 0; i < viewFiles.length; i++) {
    generateFile(viewFiles[i], 'views', null)
  }

  for(let i = 0; i < styleFile.length; i++) {
    generateFile(styleFile[i], 'css', 'public')
  }

}
