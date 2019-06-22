const path = require('path');

module.exports = {
    entry: {
        'bundle.js': [
            path.resolve(__dirname, 'src/js/globals.js'),
            path.resolve(__dirname, 'src/js/threex.js'),
            path.resolve(__dirname, 'src/js/Physics.js'),
            path.resolve(__dirname, 'src/js/drums.js'),
            path.resolve(__dirname, 'src/js/InstrumentMappings.js'),
            path.resolve(__dirname, 'src/js/Fire.js'),
            path.resolve(__dirname, 'src/js/Light.js'),
            path.resolve(__dirname, 'src/js/app.js'),
            path.resolve(__dirname, 'src/js/audio.js'),
            path.resolve(__dirname, 'src/js/ui.js')
        ]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'dist'),
    }
};
