# DOCXtra

This is an application to make text replacements to tokens within docx template documents.

This is a desktop application running in electron. The UI was written in angular, and the backend uses an electron API layer on top of a node processing application. The replacement engine for the backend uses the DOCXtemplater library.

## Preparing the App

Requirements: Git, Node.js

Run `git clone https://github.com/4ist/DOCXtra.git` to pull the source code.

Navigate to the cloned directory with `cd DOCXtra`.

Run `npm install` to download/install the dependencies for the application.

## Running the App

To run the full application, run `npm run start:electron`. This will trigger an Angular build followed by execution of the electron app. If the application is already built, the `electron .` command can be ran to skip the build step.

Since the UI is in Angular, it can be ran and viewed in a broswer with the Run `ng serve` command. Note that this wil just render the UI and that no backend processes are running. 

In the near future, the application will be downloadable as an exe.


