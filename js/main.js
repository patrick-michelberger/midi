window.onload = function() {
    var channel1 = document.getElementById('channel1');
    var channel2 = document.getElementById('channel2');

    channel1.addEventListener("click", function(ev) {
        alert("channel1");
        connectToDevice();
    });

    channel2.addEventListener("click", function(ev) {
        alert("channel2");
        connectToDevice();
    });


    function connectToDevice() {
        // request MIDI access
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess({
                sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
            }).then(onMIDISuccess, onMIDIFailure);
        } else {
            alert("No MIDI support in your browser.");
        }

        // midi functions
        function onMIDISuccess(midiAccess) {
            // when we get a succesful response, run this code
            console.log('MIDI Access Object', midiAccess);
            sendMIDIMessage(midiAccess);
        }

        function onMIDIFailure(e) {
            // when we get a failed response, run this code
            console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
        }
    }

    function sendMIDIMessage(midiAccess) {
        var noteOnMessage = [0x90, 60, 0x7f]; // note on, middle C, full velocity
        var output = midiAccess.outputs.get(portID);
        output.send(noteOnMessage); //omitting the timestamp means send immediately.
        output.send([0x80, 60, 0x40], window.performance.now() + 1000.0); // Inlined array creation- note off, middle C,
    }

};
