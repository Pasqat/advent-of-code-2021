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
  (start: string): number;
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

Caves.prototype.walk = function (start: string) {
  let total = this.total;
  const adjacencyList = this.adjacencyList;
  let visited: Visited = {};

  (function walk(node: string) {
    if (node === "end") {
      total++;
      return;
    }
    if (visited[node]) {
      return;
    }
    if (node === node.toLowerCase()) {
      visited[node] = true;
    }

    adjacencyList[node].forEach((neighbor) => {
      if (!visited[neighbor]) {
        walk(neighbor);
      }
    });
    visited[node] = false;
  })(start);

  return total;
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

  const result = caves.walk("start");

  console.log(result);
  return result;
}

main();
