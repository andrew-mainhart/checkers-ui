import {Chip} from "./Chip";
import {Coord} from "./Coord";
import {User} from "./User";

export class Move {
  chip: Chip;
  fromSpot: Coord;
  toSpot: Coord;
  intermediateSpots: Coord[];
  byPlayer: User;
}
