import {Car} from "./Car";
import {Intersection} from "./Intersection";
import {Street} from "./Street";
import fs from 'fs'; 
import {Simulation} from "./Simulation";

const getMatchingIntersectionOrNew = (intersections: Intersection[], id: number): Intersection => {
  if(!intersections[id]) {
    intersections[id] = new Intersection(id);
  }
  return intersections[id];
}

const readInput = () => {
  let i = 0; 
  const filename: string = process.argv[2];
  const file = fs.readFileSync(filename, "utf-8"); 
  const lines = file.split("\n");

  const [duration, countIntersection, countStreets, countCars, score] = lines[i].split(" ").map(x => parseInt(x)); 
  i++; 

  const intersections: Intersection[] = new Array<Intersection>(countIntersection);
  const streets = [];
  const cars = [];

  for(; i <= countStreets; i++) {
    const [startId, endId, name, length] = lines[i].split(" ").map((x, index) => index !== 2 ? parseInt(x) : x);
    const start = getMatchingIntersectionOrNew(intersections, startId as number);
    const end = getMatchingIntersectionOrNew(intersections, endId as number);
    const street = new Street(name as string, length as number, start, end);
    streets.push(street);
    end.lights.push(street.trafficLight);
  }
  
  for (; i <= countCars + countStreets; i++) {
    const [pathLengthStr, ...streetNames] = lines[i].split(" ");
    let path: Street[] = []; 
    for (const name of streetNames) {
      path.push(streets.filter(x => x.name == name)[0]);
    }
    cars.push(new Car(path));
  }
  return new Simulation(duration, streets, intersections, cars);
}

const simulation = readInput(); 
simulation.start();
