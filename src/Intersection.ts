import {TrafficLight} from "./TrafficLight";

export class Intersection {
  id: number;
  lights: TrafficLight[];
  schedule: TrafficLight[];

  constructor(id: number) {
    this.id = id;
    this.schedule = [];
    this.lights = [];
  }
}
