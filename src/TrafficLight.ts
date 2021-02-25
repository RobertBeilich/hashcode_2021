import {Car} from "./Car";
import {Street} from "./Street";

export class TrafficLight {
  queue: Car[];
  greenPhase: number;
  street: Street;

  constructor(street: Street) { 
    this.street = street;
    this.queue = [];
  }

  queueUpCar(car: Car) {
    this.queue.push(car);
  }

  processGreenPhase() {
    //remove from queue
  }

  setGreenPhase() {

  }
}
