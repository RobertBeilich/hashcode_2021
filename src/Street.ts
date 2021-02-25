import {Intersection} from "./Intersection";
import {TrafficLight} from "./TrafficLight";

export class Street {
  name: string;
  length: number;
  start: Intersection;
  end: Intersection;
  trafficLight: TrafficLight;

  constructor(name: string, length: number, start: Intersection, end: Intersection) {
    this.name = name;
    this.length = length;
    this.start = start;
    this.end = end;
    this.trafficLight = new TrafficLight();
  }
}
