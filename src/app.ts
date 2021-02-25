import {Car} from "./Car";
import {Intersection} from "./Intersection";
import {Street} from "./Street";
import fs from 'fs'; 

const readInput = () => {
  let i = 0; 
  const filename: string = process.argv[1];
  const file = fs.readFileSync(filename, 'UTF-8'); 
  const lines = file.split("\n");
  const [duration, countIntersection, countStreets, countCars, score] = lines[i].split(" ").map(x => parseInt(x)); 
  const intersections: Intersection[] = [];
  const streets = [];
  const cars = [];
  i++; 

  for(; i <= countStreets; i++) {
    const [startId, endId, name, length] = lines[i].split(" ").map((x, index) => index !== 2 ? parseInt(x) : x);
    let matchingIntersections = intersections.filter(x => x.id == startId);
    const start = matchingIntersections[0] || new Intersection(startId as number);
    matchingIntersections = intersections.filter(x => x.id == endId);
    const end = matchingIntersections[0] || new Intersection(endId as number);
    intersections.push(start);
    intersections.push(end);
    streets.push(new Street(name as string, length as number, start, end))
  }
  
  for (; i <= countCars + countStreets; i++) {
    const [pathLengthStr, ...streetNames] = lines[i].split(" ");
    let path: Street[] = []; 
    for (const name of streetNames) {
      path.push(streets.filter(x => x.name == name)[0]);
    }
    cars.push(new Car(path));
  }
}

readInput(); 


