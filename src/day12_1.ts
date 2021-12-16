import * as fs from "fs";
import * as path from "path";

// For this problem, it is obvious I need to use graph,
// as tryed by ThePrimeagen itself. The problem is that
// I really don't know how to use graph. I will follow
// https://www.freecodecamp.org/news/8-essential-graph-algorithms-in-javascript/
// and try to implement it.

interface AdjacencyList {
  [key: string]: string[];
}

interface Visited {
  [key: string]: boolean;
}

interface Walk {
  (start: string): string[];
}

interface WalkDfs {
  (start: string): number;
}

interface WalkDfsIterative {
  // (start: string): number;
  (start: string): string[][];
}

class Caves {
  adjacencyList: AdjacencyList;
  walk: Walk;
  walkDfsRecursive: WalkDfs;
  walkIterative: WalkDfsIterative;
  total: number;

  constructor() {
    this.adjacencyList = {};
    this.total = 0;
  }
  addNode(node: string) {
    if (!this.adjacencyList[node]) {
      this.adjacencyList[node] = [];
    }
  }
  addEdge(source: string, destination: string) {
    if (!this.adjacencyList[source]) {
      this.addNode(source);
    }
    if (!this.adjacencyList[destination]) {
      this.addNode(destination);
    }
    this.adjacencyList[source].push(destination);
    this.adjacencyList[destination].push(source);
  }
  removeEdge(source: string, destination: string) {
    this.adjacencyList[source] = this.adjacencyList[source].filter(
      (node) => node !== destination
    );
    this.adjacencyList[destination] = this.adjacencyList[destination].filter(
      (node) => node !== source
    );
  }
  removeNode(node: string) {
    while (this.adjacencyList[node]) {
      const adjacentNode = this.adjacencyList[node].pop();
      adjacentNode !== undefined ? this.removeEdge(node, adjacentNode) : null;
    }
    delete this.adjacencyList[node];
  }
}

// Caves.prototype.walk = function (start: string) {
//   const queue = [start];
//   const result: string[] = [];
//   const visited: Visited = {};
//   visited[start] = true;
//   let currentNode;

//   while (queue.length) {
//     currentNode = queue.shift();
//     if (currentNode === "end") {
//       result.push(currentNode);
//       return result;
//     }
//     if (currentNode !== undefined) {
//       result.push(currentNode);
//       this.adjacencyList[currentNode].forEach((neighbor: string) => {
//         if (!visited[neighbor]) {
//           if (neighbor === neighbor.toLowerCase()) {
//             visited[neighbor] = true;
//           }
//           queue.push(neighbor);
//         }
//       });
//     }
//   }
//   return result;
// };

Caves.prototype.walkDfsRecursive = function (start: string) {
  const result: string[] = [];
  const visited: Visited = {};
  const adjacencyList = this.adjacencyList;
  let total = this.total;

  (function walkDfs(node) {
    console.log(result, visited);
    if (!node) return null;
    if (node === "end") {
      result.push(node);
      visited[node] = true;
      console.log("before total", result);
      console.log("visited", visited);
      return total++;
    }
    if (node === node.toLowerCase()) {
      visited[node] = true;
    }
    result.push(node);
    adjacencyList[node].forEach((neighbor) => {
      if (!visited[neighbor]) {
        return walkDfs(neighbor);
      }
    });
  })(start);

  return total;
};

// Need to be deeply changed in order to have all different paths that
// starts with "start" and ends with "end", taking into account that
// small caves (like "a" and "b") can be walked only once.
Caves.prototype.walkIterative = function (start: string) {
  const result: string[][] = [];
  let path: string[] = [];
  const stack = [start];
  const visited: Visited = {};
  let total = this.total;

  visited[start] = true;
  let currentNode;

  while (stack.length) {
    currentNode = stack.pop();
    if (currentNode === "end") {
      path.push(currentNode);
      result.push(path);
      path = [];
      total++;
    }
    if (currentNode) {
      path.push(currentNode);
      this.adjacencyList[currentNode].forEach((neighbor: string) => {
        if (!visited[neighbor]) {
          if (neighbor === neighbor.toLowerCase()) {
            visited[neighbor] = true;
          }
          stack.push(neighbor);
        }
      });
    }
    console.log(stack, result, visited, total);
  }
  return result;
};

function main() {
  const data = fs
    .readFileSync(path.join(__dirname, "day12.txt"), "utf8")
    .trim()
    .split("\n")
    .map((l) => l.split("-"));

  const caves = new Caves();
  data.forEach(([from, to]) => {
    caves.addEdge(from, to);
  });

  const result = caves.walkIterative("start");

  console.log(result);
  return result;
}

main();
