
import * as importmapTester from "importmap-tester";
import * as relrel from "./importmap-folder/importmap-test-module.js";

import { setget_layer2_importmap, setget_layer2_relativePath } from "./importmap-folder/Experiment-layer-2.js";
import * as layer2 from "./importmap-folder/Experiment-layer-2.js";



function importSingletonTests(){
    

    console.log("Module import-singleton tests: ");
    // import { importmap_tester_func } from './modules/importmap-tester.js';


    relrel.setX(1);
    console.log("x = " + relrel.getX(), "[set in module 1; relative import]")

    layer2.get_layer2_relativePath();
    layer2.set_layer2_relativePath(2);
    layer2.get_layer2_relativePath();

    console.log("x = " + relrel.getX(), "[get in module 1; relative import]")

    // setget_layer2_relativePath(2);

    
    importmapTester.setX(3);
    console.log("x = " + importmapTester.getX(), "[set in module 1;    importmap   ]")
    
    
    layer2.get_layer2_importmap();
    layer2.set_layer2_importmap(4);
    layer2.get_layer2_importmap();

    
    console.log("Final value check and asserts: ")

    console.log("x = " + relrel.getX(), "[get in module 1; relative import]")
    console.log("x = " + importmapTester.getX(), "[get in module 1;    importmap   ]")
    layer2.get_layer2_relativePath();
    layer2.get_layer2_importmap();

    console.assert(relrel.getX() == 4);
    console.assert(importmapTester.getX() == 4);
    console.assert(layer2.get_layer2_relativePath() == 4);
    console.assert(layer2.get_layer2_importmap() == 4);
}

export {
    importSingletonTests,
}
