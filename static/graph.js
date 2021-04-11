/*
 *** GRAPH (Music Theory) ***
*/
// https://github.com/ivanarandac/Free-Algorithm-Books-1
// book: Data Structures & Algorithms with JavaScript
// NOTES:
// - Intro:
    // Representing a graph using just objects can quickly become inefficient
    // The Vertex class needs two data members: one for identifying the vertex and the other to store a Boolean value indicating whether or not the vertex has been visited.
    // Edges describe the structure of a graph
    // Store as adjacency list, where edges are stored as a vertex-indexed array of lists (arrays) of the vertices adjacent to each vertex.
    // when we reference a vertex, we can efficiently access the list of all the vertices it is connected to
// - Depth-First Search
// algorithm: visit a vertex that has not already been visited, mark it as having been visited, then recursively visit the other unvisited vertices that are in the original vertex’s adjacency list.
// we need to add an array to our Graph class that stores visited vertices and initialize it to all false values
// 

console.log('/static/graph.js init...');

function Vertex(label) { 
    this.label = label;
}

function Graph(v) {
    this.vertices = v;
    this.edges = 0;
    this.adj = [];

    for (var i = 0; i < this.vertices; ++i) {
        this.adj[i] = [];
        this.adj[i].push(""); // TODO: why push empty string here?
    }

    this.addEdge = addEdge;
    this.showGraph = showGraph;
    // this.toString = toString; 

    this.dfs = dfs;
    this.marked = [];
    for (var i = 0; i < this.vertices; ++i) {
        this.marked[i] = false; 
    }
}
    
function addEdge(v, w) { 
    // When this function is called with two vertices, A and B, the function finds the adjacency list for vertex A and adds B to the list, then it finds the adjacency list for B and adds A to the list. Finally, the function increments the number of edges by 1.
    this.adj[v].push(w); 
    this.adj[w].push(v); 
    this.edges++;
}

function showGraph() {
    let debugString = '';
    for (var i = 0; i < this.vertices; ++i) {
        // putstr(i + " -> ");
        debugString += (i + " -> ");
        for (var j = 0; j < this.vertices; ++j) {
            if (this.adj[i][j] != undefined) {
                // putstr(this.adj[i][j] + ' ');
                debugString += (this.adj[i][j] + ' ');
            }
        }

        console.log(debugString);
        debugString = '';
    }
}

// https://github.com/oreillymedia/data_structures_and_algorithms_using_javascript/blob/master/Chapter11/Chap11-2.js
// https://stackoverflow.com/questions/33728189/depth-first-traversal-of-a-graph-javascript
function dfs(v) {
    // console.log('dfs param -> v: ', v);
    this.marked[v] = true;

    // console.log('this: ', this); // ["", 1, 2]
    // console.log('this.adj[v]: ', this.adj[v]); // ["", 1, 2]

    if (this.adj[v] != undefined) {
        console.log("Visited vertex: " + v);

        // for each (var w in this.adj[v]) {
        // for (const w in this.adj[v]) {
        for (var i = 0; i < this.adj[v].length; i++) {
            var w = this.adj[v][i];
            if (!this.marked[w]) {
                this.dfs(w);
            }
        }

    }

    // // this.adj[v].forEach((w) => {});
    // // for (let i=0; i<=this.adj.length; i++) {
    // for (let i=1; i<this.adj.length; i++) {
    //     const w = this.adj[i];
    //     if (!this.marked[w]) {
    //         this.dfs(w);
    //     }
    // }
        
    
}

// // //

const g = new Graph(5); 
g.addEdge(0,1); 
g.addEdge(0,2); 
g.addEdge(1,3); 
g.addEdge(2,4); 
g.showGraph();
g.dfs(0);


// // //

let circleFifthsId = document.getElementById('circle-of-fifths');

