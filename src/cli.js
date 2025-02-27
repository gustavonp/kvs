const jsonfile = require('jsonfile');
const file = 'tmp/data.json';

/**
 * Adds a key from the Json storage
 * @param {string[]} args User imput arguments
 */
function addKey(args) {
  if (args.length < 3) {
    console.log('Error: please, type the key name and its value');
  } else {

    var allJson = jsonfile.readFileSync(file);

    allJson.push(
      {
        key: args[1],
        value: args[2]
      });

    jsonfile.writeFile(file, allJson, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log('New key added to the storage.');
      }
    });
  }
}

/**
 * Removes a key from the Json storage
 * @param {string[]} args User imput arguments
 */
function removeKey(args) {
  if (args.length < 2) {
    console.log('Error: please, type the key to be removed');
  } else {
    const allJson = jsonfile.readFileSync(file);
    var index = null;
    for (let i = 0; i < allJson.length; i++) {
      if (allJson[i]['key'] == args[1]) {
        index = allJson[i];
        allJson.splice(index, 1);

        jsonfile.writeFile(file, allJson, function (err) {
          if (err) {
            console.error(err);
          } else {
            console.log('Key removed');
          }
        });
      }
    }

    delete allJson[args[1]];
  }
}

/**
 * Finds a key from the Json storage
 * @param {string[]} args User imput arguments
 */
function getKey(args) {
  if (args.length < 2) {
    console.log('Error: please, type the name of the key.');
  } else {
    const allJson = jsonfile.readFileSync(file);
    let found = false;
    for (let i = 0; i < allJson.length; i++) {
      if (allJson[i]['key'] == args[1]) {
        found = true;
        console.log('Key: ' + allJson[i]['key']);
        console.log('Value: ' + allJson[i]['value']);
      }
    }
    if (found != true) {
      console.log('Key "' + args[1] + '" not found!');
    }
  }
}

/**
 * Initializer
 * @param {string[]} args User imput arguments
 */
export function cli(args) {
  let options = args.slice(2);

  switch (options[0]) {
    case 'add': {
      addKey(options);
      break;
    }
    case 'remove': {
      removeKey(options);
      break;
    }
    case 'get': {
      getKey(options);
      break;
    }
    default: {
      console.log('Please, enter one of the following options: add, remove or get');
      break;
    }
  }
}