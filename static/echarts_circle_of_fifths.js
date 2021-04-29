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
// var graphCircleFifths = echarts.init(circleFifthsId, 'vintage');
// var graphCircleFifths = echarts.init(circleFifthsId, 'dark-blue');
var graphCircleFifths = echarts.init(circleFifthsId, 'tech-blue');

const nodes = [
    { name: "C", value: 100, category: 0, id: 0, symbolSize: 60, x: 0, y: 0, },
    { name: "G", value: 50, category: 0, id: 1 },
    { name: "D", value: 5, category: 0, id: 2 },
    { name: "A", value: 5, category: 0, id: 3 },
    { name: "E", value: 5, category: 0, id: 4 },
    { name: "B", value: 5, category: 0, id: 5 },
    { name: "Gb", value: 5, category: 0, id: 6 },
    { name: "Db", value: 5, category: 0, id: 7 },
    { name: "Ab", value: 5, category: 0, id: 8 },
    { name: "Eb", value: 5, category: 0, id: 9 },
    { name: "Bb", value: 5, category: 0, id: 10 },
    { name: "F", value: 5, category: 0, id: 11, x: -10, y: 10 },

    // { name: "Am", value: 30, category: 1, id: 12 },
    // { name: "Em", value: 15, category: 1, id: 13 },
];

// https://echarts.apache.org/en/option.html#series-graph.categories
const categories = [
    { name: "Major"},
    { name: "Minor"},
];

const edges = [
    { source: 0, target: 1},  // C -> G
    { source: 1, target: 2},  // G -> D
    { source: 2, target: 3},  // D -> A
    { source: 3, target: 4},  // A -> E
    { source: 4, target: 5},  // E -> Bb
    { source: 5, target: 6},  // Bb -> Gb
    { source: 6, target: 7},  // Gb -> Db
    { source: 7, target: 8},  // Db -> Ab
    { source: 8, target: 9},  // Ab -> Eb
    { source: 9, target: 10}, // Eb -> Bb
    { source: 10, target: 11}, // Bb -> F
    { source: 11, target: 0}, // F -> C

    // Minor inner circle
    // { source: 0, target: 12},  // C -> Am
    // { source: 1, target: 13},  // G -> Em
    // TODO: add remaining minor notes

    //

    // { source: 0, target: 1},
    // { source: 0, target: 2},
    // { source: 0, target: 3},
];

const option = {
    legend: {
        data: ["Major", "Minor"],
        selected: {

            'Major': true,
            'Minor': false
        }
    },
    // https://echarts.apache.org/en/option.html#series-graph.draggable
    series: [
        {
            type: "graph",
            // layout: "force",
            layout: "circular",
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
            roam: true,
            draggable: true,
            symbolSize: 40,
            label: {
                show: true
            },
            data: nodes,
            categories: categories,
            edges: edges,
        }
    ],
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {
                show: true,
            },
        }
    }
};

graphCircleFifths.setOption(option);
