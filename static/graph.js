/*
 *** GRAPH (Music Theory) ***
*/
// https://github.com/ivanarandac/Free-Algorithm-Books-1
// book: Data Structures & Algorithms with JavaScript
// NOTES:
// Representing a graph using just objects can quickly become inefficient
// The Vertex class needs two data members: one for identifying the vertex and the other to store a Boolean value indicating whether or not the vertex has been visited.
// Edges describe the structure of a graph
// Store as adjacency list, where edges are stored as a vertex-indexed array of lists (arrays) of the vertices adjacent to each vertex.
// when we reference a vertex, we can efficiently access the list of all the vertices it is connected to

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
        this.adj[i].push(""); 
    }

    this.addEdge = addEdge;
    this.showGraph = showGraph;
    this.toString = toString; 
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

// // //

const g = new Graph(5); 
g.addEdge(0,1); 
g.addEdge(0,2); 
g.addEdge(1,3); 
g.addEdge(2,4); 
g.showGraph();







let circleFifthsId = document.getElementById('circle-of-fifths');

