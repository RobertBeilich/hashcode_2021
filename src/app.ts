import {Car} from "./Car";
import {Intersection} from "./Intersection";
import {Street} from "./Street";

console.log("hello world")
//readline -> duration, countIntersections, countStreets, countCars, score
const intersections = [];
const streets = [];
const cars = [];
for (let i = 0; i < countStreets; i++) {
  //readline -> startId, endId, name, length
  // only create if new
  const start = new Intersection(startId);
  const end = new Intersection(endId);
  intersections.push(start);
  intersections.push(end);
  streets.push(new Street(name, length, start, end))
}

for (let i= 0; i < countCars; i++) {
  //readline -> lengthPath, path
  cars.push(new Car(path));
}
