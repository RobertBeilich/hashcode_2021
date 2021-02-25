import {Car} from "./Car";

export class TrafficLight {
  queue: Car[] = [];
  greenPhase: number = 1;

  queueUpCar(car: Car) {
    this.queue.push(car);
  }

  processGreenPhase() {
    //remove from queue
  }

  setGreenPhase() {

  }
}
