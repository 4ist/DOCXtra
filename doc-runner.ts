const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const fs = require('fs');
const path = require('path');
module.exports = {
  // The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
  replaceErrors(key, value) {
    if (value instanceof Error) {
      return Object.getOwnPropertyNames(value).reduce(function (error, key) {
        error[key] = value[key];
        return error;
      }, {});
    }
    return value;
  },

  errorHandler(error) {
    console.log(JSON.stringify({ error: error }, this.replaceErrors));

    if (error.properties && error.properties.errors instanceof Array) {
      const errorMessages = error.properties.errors
        .map(function (error) {
          return error.properties.explanation;
        })
        .join('\n');
      console.log('errorMessages', errorMessages);
      // errorMessages is a humanly readable message looking like this :
      // 'The tag beginning with "foobar" is unopened'
    }
    throw error;
  },

  replaceDocData(inputFile, outputFile, substitutionData) {
    //Load the docx file as a binary
    var content = fs.readFileSync(path.resolve(__dirname, inputFile), 'binary');

    var zip = new PizZip(content);
    var doc;
    try {
      doc = new Docxtemplater(zip);
    } catch (error) {
      // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
      this.errorHandler(error);
    }

    //set the templateVariables
    doc.setData(substitutionData);

    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render();
    } catch (error) {
      // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
      this.errorHandler(error);
    }

    var buf = doc.getZip().generate({ type: 'nodebuffer' });

    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(path.resolve(__dirname, outputFile), buf);
  },
};
