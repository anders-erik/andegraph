
// import * as imim from "imim";

import * as importmapTester from "importmap-tester";

import * as relrel from "./importmap-test-module.js";



function set_layer2_importmap(_x) {
    importmapTester.setX(_x);
    console.log("x = " + importmapTester.getX(), "[set in module 2;    importmap   ]")
}
function get_layer2_importmap() {
    console.log("x = " + importmapTester.getX(), "[get in module 2;    importmap   ]")
    return importmapTester.getX();
}
function setget_layer2_importmap(_x) {
    importmapTester.setX(_x);
    console.log("x = " + importmapTester.getX(), "[set in module 2;    importmap   ]")
}

function set_layer2_relativePath(_x) {
    relrel.setX(_x);
    console.log("x = " + relrel.getX(), "[set in module 2; relative import]")
}
function get_layer2_relativePath() {
    console.log("x = " + relrel.getX(), "[get in module 2; relative import]")
    return relrel.getX();
}
function setget_layer2_relativePath(_x) {
    relrel.setX(_x);
    console.log("x = " + relrel.getX(), "[set in module 2; relative import]")
}

export {
    setget_layer2_importmap,
    set_layer2_importmap,
    get_layer2_importmap,

    set_layer2_relativePath,
    get_layer2_relativePath,
    setget_layer2_relativePath,
}