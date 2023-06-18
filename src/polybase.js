/* This file conatins initial setup for the polybase db */

// Imports

import { Polybase } from "@polybase/client";

// Namespace setup

const db = new Polybase({
  defaultNamespace:
    "pk/0x9a7d1183211b4015f163d5b709304911e4cd5cae9299cbc9065f04640c055f20aae422630147d4f1c41b52e898afd80b7bb39be81b2e1523307136ebd59ebed9/ArtAquire",
});
export default db;
