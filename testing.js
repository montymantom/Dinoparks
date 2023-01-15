
let grid = generateGrid();

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
  this.location = A1;
  this.fed = 0;
}

function gridBlock(block) {
  //working
  this.block = block;
  this.lastMaintenance = "2022-11-27T19:33:11.668Z";
  this.dino = false;
  this.reqMaintenance = 0;
}

// Functions below
function dinoLocation(inBlock) {
  var index = grid.findIndex((obj) => obj.block === inBlock);
  grid[index].dino = true;
}

function checkMaintenance() {
  // working
  for (item in grid) {
    let lastMain = Date.parse(grid[item].lastMaintenance);
    if ((uptime - lastMain) / (1000 * 60 * 60 * 24) > 30) {
      console.log("Maintenance required");
    }
  }
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
