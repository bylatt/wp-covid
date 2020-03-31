#!/usr/bin/env node

const Table = require("cli-table3");
const colors = require("colors/safe");
const argv = require("yargs").argv;
const getStat = require("../");
const cli = async country => {
  let table = new Table({
    head: [
      colors.blue("Country"),
      colors.yellow("Confirmed"),
      colors.green("Recovered"),
      colors.red("Deaths")
    ]
  });
  if (country) {
    const stat = (await getStat(country))[0];
    table.push([stat.name, stat.confirmed, stat.recovered, stat.deaths]);
  } else {
    let stats = await getStat();
    stats.sort((a, b) => (a.confirmed < b.confirmed ? 1 : -1));
    for (let stat of stats) {
      table.push([stat.name, stat.confirmed, stat.recovered, stat.deaths]);
    }
  }
  console.log(table.toString());
};
const country = argv.country;
cli(country);
