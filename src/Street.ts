import {Intersection} from "./Intersection";

export class Street {
  name: string;
  length: number;
  start: Intersection;
  end: Intersection;

  constructor(name: string, length: number, start: Intersection, end: Intersection) {
    this.id = id;
    this.name = name;
    this.length = length;
    this.start = start;
    this.end = end;
  }
}
