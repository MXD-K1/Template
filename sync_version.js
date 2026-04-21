// This file is used to update the game version in wavedash.toml automatically

import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));

let toml = fs.readFileSync("wavedash.toml", "utf-8");

// replace version line
toml = toml.replace(
    /version\s*=\s*"\d+\.\d+(\.\d+)?"/, // does not account for suffixes
    `version = "${pkg.version}"`,
);

fs.writeFileSync("wavedash.toml", toml);
