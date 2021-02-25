import {Street} from "./Street";

export class Car {
  path: Street[];

  constructor(path: Street[]) {
    this.path = path;
    this.path[0].trafficLight.queueUpCar(this);
  }
}
