// https://echarts.apache.org/examples/en/editor.html?c=bar-polar-stack-radial
option = {
    legend: {},
    tooltip: {},
    dataset: {
        source: [
            ['product', 'count', '2015', '2016', '2017'],
            ['Matcha Latte', 1, 43.3, 85.8, 93.7],
            ['Milk Tea', 2, 100, 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 3, 86.4, 65.2, 82.5],
            ['Walnut Brownie', 4, 72.4, 53.9, 39.1]
        ]
    },
    // xAxis: {type: 'category'},
    // yAxis: {},
    angleAxis: {
        type: 'category',
    },
    radiusAxis: {
    },
    polar: {
    },
    series: [
        {
            type: 'bar', 
            stack: 'all',
            coordinateSystem: 'polar',
            name: 'A',
        },
        {
            type: 'bar', 
            stack: 'all',
            coordinateSystem: 'polar',
            name: 'B',
        },
        {
            type: 'bar', 
            stack: 'all',
            coordinateSystem: 'polar',
            name: 'C',
        }
    ]
};
