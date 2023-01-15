const url = "https://dinoparks.herokuapp.com/nudls/feed";

let dinoArr = [];
let grid = generateGrid();

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (let i = data.length - 1; i >= 0; i--) {
      switch (data[i].kind) {
        case "dino_added":
          dinoArr = dinoAdd(dinoArr, data[i]);
          break;
        case "dino_removed":
          grid = dinoRemoveGrid(grid, dinoArr, data[i]);
          dinoArr = dinoRemove(dinoArr, data[i]);
          break;
        case "dino_location_updated":
          grid = dinoInGrid(grid, dinoArr, data[i]);
          dinoArr = updateLocation(dinoArr, data[i]);
          break;
        case "dino_fed":
          dinoArr = dinoFed(dinoArr, data[i]);
          break;
        case "maintenance_performed":
          grid = doMaintenance(grid, data[i]);
          break;
      }
    }
  });

//document.getElementById("variable").innerHTML = grid[0];

// Object constructors below
function dino(name, species, gender, id, digestPeriod, herb, time, park_id) {
  this.name = name;
  this.species = species;
  this.gender = gender;
  this.id = id;
  this.digestPeriod = digestPeriod;
  this.herb = herb;
  this.time = time;
  this.park_id = park_id;
  this.location = "A1";
  this.last_fed = time;
}

function gridBlock(block) {
  //working
  this.block = block;
  this.lastMaintenance = "2022-11-27T19:33:11.668Z";
  this.dino = false;
  this.reqMaintenance = false;
  this.isSafe = true;
}

// Functions below
function dinoAdd(arrIn, log) {
  const newDino = new dino(
    log.name,
    log.species,
    log.gender,
    log.id,
    log.digestion_period_in_hours,
    log.herbivore,
    log.time,
    log.park_id
  );
  arrIn.push(newDino);
  return arrIn;
}

function dinoRemoveGrid(gridArrIn, dinoArrIn, log) {
  //working
  try {
    var dinoIndex = dinoArrIn.findIndex((obj) => obj.id === log.dinosaur_id);
    var oldIndex = gridArrIn.findIndex(
      (obj) => obj.block === dinoArrIn[dinoIndex].location
    );
    gridArrIn[oldIndex].dino = false;
    return gridArrIn;
  } catch (err) {
    console.log("Dino does not exist");
    return gridArrIn;
  }
}

//working
function dinoRemove(arrIn, log) {
  //working
  var index = arrIn.findIndex((obj) => obj.id === log.dinosaur_id);
  arrIn.splice(index, 1);
  return arrIn;
}

function dinoFed(arrIn, log) {
  var index = arrIn.findIndex((obj) => obj.id === log.dinosaur_id);
  arrIn[index].last_fed = log.time;
  return arrIn;
}

function dinoInGrid(gridArrIn, dinoArrIn, log) {
  //working
  try {
    var dinoIndex = dinoArrIn.findIndex((obj) => obj.id === log.dinosaur_id);
    var oldIndex = gridArrIn.findIndex(
      (obj) => obj.block === dinoArrIn[dinoIndex].location
    );
    gridArrIn[oldIndex].dino = false;
    var index = gridArrIn.findIndex((obj) => obj.block === log.location);
    gridArrIn[index].dino = true;
    return gridArrIn;
  } catch (err) {
    console.log("Dino does not exist");
    return gridArrIn;
  }
}

function updateLocation(arrIn, log) {
  //working
  try {
    var index = arrIn.findIndex((obj) => obj.id === log.dinosaur_id);
    arrIn[index].location = log.location;
    return arrIn;
  } catch (err) {
    console.log("Dino does not exist");
    return arrIn;
  }
}

function dinoLocation(inBlock) {
  var index = grid.findIndex((obj) => obj.block === inBlock);
  grid[index].dino = true;
}

function doMaintenance(inGrid, log) {
  var index = inGrid.findIndex((obj) => obj.block === log.location);
  inGrid[index].lastMaintenance = log.time;
  return inGrid;
}

function checkSafe(objIn, dinoArrIn) {
  const gridDino =
    dinoArrIn[dinoArrIn.findIndex((obj) => obj.location === objIn.block)];
  const now = new Date();
  if (
    (now - gridDino.last_fed) / (1000 * 60 * 60) <
    gridDino.digestion_period_in_hours
  ) {
    objIn.isSafe = true;
  } else {
    objIn.isSafe = false;
  }
  return objIn;
}

function checkMaintenance(objIn) {
  // working
  let lastMaintenance = Date.parse(objIn.lastMaintenance);
  const now = new Date();
  if ((now - lastMaintenance) / (1000 * 60 * 60 * 24) > 30) {
    objIn.reqMaintenance = true;
  }
  return objIn;
}

function generateGrid() {
  //working
  let grid = [];
  for (let i = 1; i < 17; i++) {
    for (let j = 1; j < 27; j++) {
      var num = i.toString();
      var chr = String.fromCharCode(64 + j);
      const block = new gridBlock(chr + num);
      grid.push(block);
    }
  }
  return grid;
}
