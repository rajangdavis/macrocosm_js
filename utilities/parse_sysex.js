// Function to parse command to binary
const parseSysexToBinary = (commandArg) => {
  let firstPass = cleanNewlines(commandArg);
  let parsedCommand = convertToBinary(firstPass);
  let commandStructure = mapToCommandStructure(parsedCommand);
  commandStructure.raw = firstPass;
  return commandStructure;
};

// Removes newlines and splits on spaces
let cleanNewlines = (commandArg) => {
  return commandArg.trim().replace(/\n/g, " ").replace(/\t/g, "").split(" ");
};

// Cuts strings in half
// Parses them to integers
// Removes the header and footer
let convertToBinary = (firstPassArg) => {
  return firstPassArg
    .map((x) => {
      let firstHalf = x.slice(0, 2);
      let secondHalf = x.slice(2);
      return [firstHalf, secondHalf];
    })
    .flat()
    .filter((x) => {
      return x != "";
    })
    .map((x) => {
      return parseInt(x, 16);
    })
    .filter((x) => {
      let skipThese = [240, 247];
      return !skipThese.includes(x);
    });
};

// Builds the command structure for
// Sending the arguments
let mapToCommandStructure = (parsedCommand) => {
  var commandStructure = {
    manufacturer: [],
    data: [],
  };
  parsedCommand.map((x, i) => {
    if (i <= 2) {
      commandStructure.manufacturer.push(x);
    } else {
      commandStructure.data.push(x);
    }
  });
  return commandStructure;
};

export default parseSysexToBinary;
