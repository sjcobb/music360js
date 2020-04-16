// import * as THREE from 'three';
import Store from './Store.js';

export default class Recording {

    constructor() {
        // super();
    }

    init() {
        console.log('Recording -> init()');
        // https://www.html5rocks.com/en/tutorials/webaudio/intro/

        function BufferLoader(context, urlList, callback) {
            this.context = context;
            this.urlList = urlList;
            this.onload = callback;
            this.bufferList = new Array();
            this.loadCount = 0;
        }
        
        BufferLoader.prototype.loadBuffer = function(url, index) {
            // Load buffer asynchronously
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
        
            var loader = this;
        
            request.onload = function() {
            // Asynchronously decode the audio file data in request.response
            loader.context.decodeAudioData(
                request.response,
                function(buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount == loader.urlList.length)
                    loader.onload(loader.bufferList);
                },
                function(error) {
                console.error('decodeAudioData error', error);
                }
            );
            }
        
            request.onerror = function() {
            alert('BufferLoader: XHR error');
            }
        
            request.send();
        }
        
        BufferLoader.prototype.load = function() {
            for (var i = 0; i < this.urlList.length; ++i)
            this.loadBuffer(this.urlList[i], i);
        }

        // 

        // window.onload = initRecording;
        var context;
        var bufferLoader;

        function initRecording() {
            // Fix up prefixing
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            context = new AudioContext();

            bufferLoader = new BufferLoader(
                context,
                [
                    './assets/song/aintno_vocals_01.wav',
                ],
                finishedLoading
            );

            bufferLoader.load();
        }

        function finishedLoading(bufferList) {
            // Create two sources and play them both together.
            var source1 = context.createBufferSource();
            var source2 = context.createBufferSource();
            source1.buffer = bufferList[0];
            source2.buffer = bufferList[1];

            source1.connect(context.destination);
            source2.connect(context.destination);
            source1.start(0);
            source2.start(0);
        }

        initRecording();
    }

}