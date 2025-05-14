import * as OBC from "@thatopen/components";
import Stats from "stats.js";
// You have to import * as FRAGS from "@thatopen/fragments"
// import * as FRAGS from "../node_modules/@thatopen/fragments/dist/index";
// const FRAGS = require('../node_modules/@thatopen/fragments/dist/index');
import { IfcImporter, FragmentsModels } from "@thatopen/fragments";

console.log('Hello world!')

const serializer : IfcImporter = new IfcImporter();
serializer.wasm = { absolute: true, path: 'node_modules/web-ifc/' };
// A convenient variable to hold the ArrayBuffer data loaded into memory
let fragmentBytes: ArrayBuffer | null = null;
let onConversionFinish = () => { 

    console.log("Conversion finished") 
};

const convertIFC = async () => {
  const url = "https://thatopen.github.io/engine_fragment/resources/ifc/school_str.ifc";
  const ifcFile = await fetch(url);
  const ifcBuffer = await ifcFile.arrayBuffer();
  const ifcBytes = new Uint8Array(ifcBuffer);
  fragmentBytes = await serializer.process({ bytes: ifcBytes });
  onConversionFinish();
};

var test = convertIFC();
