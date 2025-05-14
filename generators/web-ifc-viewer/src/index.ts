import * as OBC from '@thatopen/components';
import Stats from 'stats.js';
import * as fs from 'fs';
// You have to import * as FRAGS from "@thatopen/fragments"
// import * as FRAGS from "../node_modules/@thatopen/fragments/dist/index";
// const FRAGS = require('../node_modules/@thatopen/fragments/dist/index');
import { IfcImporter, FragmentsModels } from '@thatopen/fragments';

console.log('Hello world!');

async function createFragsModelFromIfc(url: string) {
  const serializer = new IfcImporter();

  serializer.wasm.path = "../../node_modules/web-ifc/";

  let fileFinishedReading = false;
  let previousOffset = -1;

  const input = fs.openSync(url, "r");

  const readCallback = (offset: number, size: number) => {
    if (!fileFinishedReading) {
      console.log(`Reading IFC file: Offset ${offset} Size ${size}`);
      if (offset < previousOffset) {
        fileFinishedReading = true;
        console.log(
          `File reading finished! Starting conversion to fragments...`,
        );
      }
      previousOffset = offset;
    }

    const data = new Uint8Array(size);
    const bytesRead = fs.readSync(input, data, 0, size, offset);
    if (bytesRead <= 0) return new Uint8Array(0);
    return data;
  };

  const exported = await serializer.process({
    readFromCallback: true,
    readCallback,
    raw: false,
  });

  const splitPathToken = url.includes("/") ? "/" : "\\";
  const fileName = url.split(splitPathToken).pop()?.split(".")[0];
  const baseDir = "./resources/frags";
  fs.writeFileSync(`${baseDir}/${fileName}.frag`, exported);
}

createFragsModelFromIfc("./resources/ifc/school_str.ifc");
