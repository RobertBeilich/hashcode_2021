import fs from "fs";
import {Car} from "./Car";
import {Intersection} from "./Intersection";
import {Street} from "./Street";
import {TrafficLight} from "./TrafficLight";

export class Simulation {
  filename: string;
  duration: number;
  streets: Street[];
  intersections: Intersection[];
  cars: Car[];

  constructor(filename: string, duration: number, streets: Street[], intersections: Intersection[], cars: Car[]) {
    this.filename = filename;
    this.duration = duration;
    this.streets = streets;
    this.intersections = intersections;
    this.cars = cars;
  }

  start() {
    const pathLengths = this.getPathLengths();
    const lengths = [];

    const schedule: TrafficLight[] = [];

    for(const length of pathLengths.keys()) {
      lengths.push(length);
    }
    lengths.sort();
    for(const length of lengths) {
      for(const car of pathLengths.get(length) as Car[]) {
        for(const street of this.streets) {
          if (street.trafficLight.queue.indexOf(car) > 0) {
            schedule.push(street.trafficLight);
          }
        }
      }
    }

    for (const intersection of this.intersections) {
      intersection.lights.sort((a, b) => {
        if (schedule.indexOf(a) < schedule.indexOf(b)) {
          return -1;
        }
        if (schedule.indexOf(a) > schedule.indexOf(b)) {
          return 1;
        }
        return 0;
      });
    }

    this.printResult();
  }

  printResult() {
    const lines = [];
    lines.push(this.intersections.length);
    for(const intersection of this.intersections) {
      lines.push(intersection.id);
      lines.push(intersection.lights.length);
      for(const light of intersection.lights) {
        const street = this.getStreetOfLight(light);
        lines.push(`${street.name} ${light.greenPhase}`)
      }
    }
    fs.writeFileSync(`output/${this.filename}`, lines.join("\n"), "utf-8");
  }

  getStreetOfLight(light: TrafficLight): Street {
    return this.streets.filter(x => x.trafficLight == light)[0];
  }

  getPathLengths(): Map<number, Car[]> {
    const pathLengths = new Map<number, Car[]>();
    for(const car of this.cars) {
      let duration = 0;
      for(const street of car.path) {
        duration += street.length;
      }
      const addedCars = pathLengths.get(duration) || [];
      pathLengths.set(duration, [...addedCars,car]);
    }
    return pathLengths;
  }
}
