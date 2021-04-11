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
// - Breadth-First Search
    // algorithm uses a queue abstraction instead of an array abstraction for storing visited vertices. The algorithm works as follows:
    // 1. Find an unvisited vertex that is adjacent to the current vertex, add it to the list of visited vertices, and add it to the queue.
    // 2. Take the next vertex, v, from the graph and add it to the list of visited vertices.
    // 3. Add all unmarked vertices that are are adjacent to v and add them to the queue.
// - Shortest Path
    // When we perform a breadth-first search, we are automatically finding the shortest paths from one vertex to another connected vertex. 
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

    this.hasPathTo = hasPathTo;
    this.pathTo = pathTo;

    this.bfs = bfs;
    this.edgeTo = [];

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
    this.marked[v] = true;

    if (this.adj[v] != undefined) {
        console.log("Visited vertex: " + v);
        // for each (var w in this.adj[v]) {
        for (var i = 0; i < this.adj[v].length; i++) {
            var w = this.adj[v][i];
            if (!this.marked[w]) {
                this.dfs(w);
            }
        }
    }
}

// // // 

// https://github.com/oreillymedia/data_structures_and_algorithms_using_javascript/blob/96a8d91efd91d8c7d15f559e72b5f9453e651600/Chapter11/Chap11-6.js#L101
function bfs(s) {
    var queue = [];
    this.marked[s] = true;
    queue.push(s); // add to back of queue
    while (queue.length > 0) {
        var v = queue.shift();

        if (this.adj[v] != undefined) {
            console.log("Visited vertex: " + v);

            // for each (var w in this.adj[v]) {
            for (var i = 0; i < this.adj[v].length; i++) {
                var w = this.adj[v][i];
                if (!this.marked[w]) {
                    this.edgeTo[w] = v; 
                    this.marked[w] = true; 
                    queue.push(w);
                }
            }
        }
    }
}

function pathTo(v) {
    var source = 0;
    if (!this.hasPathTo(v)) {
        return undefined;
    }
    var path = [];
    for (var i = v; i != source; i = this.edgeTo[i]) {
        path.push(i);
    }
    path.push(source);
    return path;
}

function hasPathTo(v) {
    return this.marked[v];
}

// // //

const g = new Graph(5); 
g.addEdge(0,1); 
g.addEdge(0,2); 
g.addEdge(1,3); 
g.addEdge(2,4); 
g.showGraph();
// g.dfs(0); // 0, 1, 3, 2, 4
// g.dfs(1); // 1, 0, 2, 4, 3
// g.dfs(2); // 2, 0, 1, 3, 4
// g.dfs(3); // 3, 1, 0, 2, 4
// g.dfs(4); // 4, 2, 0, 1, 3

// // 

g.bfs(0); // 0, 1, 2, 3, 4
// g.bfs(1); // 1, 0, 3, 2, 4
// g.bfs(2); // 2, 0, 4, 1, 3
// g.bfs(3); // 3, 1, 0, 2, 4
// g.bfs(4); // 4, 2, 0, 1, 3

// // //

let pathString = '';

// var vertex = 4;    // 0-2-4
var vertex = 3;    // 0-1-3
// var vertex = 2;    // 0-2
// var vertex = 1;    // 0-1
// var vertex = 0;    // 0

var paths = g.pathTo(vertex); 
// console.log(paths);

if (paths !== undefined) {
    while (paths.length > 0) {
        if (paths.length > 1) { 
            // putstr(paths.pop() + '-');
            pathString += (paths.pop() + '-');
        } else {
            // putstr(paths.pop()); 
           pathString += (paths.pop());
        }
    }
    console.log(pathString); 
}


///////////////////
// ECHARTS GRAPH //
///////////////////

// https://echarts.apache.org/en/option.html#series-graph.type

// https://echarts.apache.org/en/option.html#series-graph.layout
// - 'none' No any layout, use x, y provided in node as the position of node.
// - 'circular' Adopt circular layout, see the example Les Miserables: https://echarts.apache.org/examples/en/editor.html?c=graph-circular-layout
// - 'force' Adopt force-directed layout, see the example Force, the detail about configrations of layout are in graph.force: https://echarts.apache.org/examples/en/editor.html?c=graph-force2

//
let circleFifthsId = document.getElementById('circle-of-fifths');
var graphCircleFifths = echarts.init(circleFifthsId);

const nodes = [
    { name: "C", value: 100, category: 0, id: 0, symbolSize: 60 },
    { name: "G", value: 50, category: 0, id: 1 },
    { name: "D", value: 5, category: 0, id: 2 },
    { name: "Am", value: 30, category: 1, id: 3 },
    { name: "Em", value: 15, category: 1, id: 4 },

    // 

    // { name: "AnalyserNode", value: 1, category: 4, id: 0 },
    // { name: "AudioNode", value: 1, category: 4, id: 1 },
    // { name: "HTMLSpanElement", value: 1, category: 0, id: 200 },

    // 

    // { category: 0, id: "1", label: {show: false}, name: "Napoleon", symbolSize: 2.6666666666666665, value: 4, x: -418.08344, y: 446.8853 },
];

// https://echarts.apache.org/en/option.html#series-graph.categories
const categories = [
    { name: "Major"},
    { name: "Minor"},
    // {name: "HTMLElement", keyword: {}, base: "HTMLElement"},
    // {name: "WebGL", keyword: {}, base: "WebGLRenderingContext"},
    // {name: "SVG", keyword: {}, base: "SVGElement"},
    // {name: "CSS", keyword: {}, base: "CSSRule"},
    // {name: "Other", keyword: {}},
];

const edges = [
    { source: 0, target: 1}, // C -> G
    { source: 0, target: 3}, // C -> Am
    { source: 1, target: 2}, // G -> D
    { source: 1, target: 4}, // G -> Em
    // { source: 3, target: 0}, // Am -> C
    //

    // { source: 0, target: 1},
    // { source: 0, target: 2},
    // { source: 0, target: 3},
];

const option = {
    legend: {
        data: ["Major", "Minor"],
        // data: ["HTMLElement", "WebGL", "SVG", "CSS", "Other"],
    },
    // https://echarts.apache.org/en/option.html#series-graph.draggable
    series: [
        {
            type: "graph",
            layout: "force",
            // layout: "circular",
            // https://echarts.apache.org/en/option.html#series-graph.force
            force: {
                initLayout: 'circular',
                // edgeLength: 5,
                // gravity: 0.2,
                // repulsion: 20,
                gravity: 0.1,
                edgeLength: 100,
                repulsion: 200,
            },
            draggable: true,
            symbolSize: 40,
            label: {
                show: true
            },
            data: nodes,
            categories: categories,
            edges: edges,
        }
    ]
};

graphCircleFifths.setOption(option);
