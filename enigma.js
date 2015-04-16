var Simulation = {
    initialize : function() {
        // Init rotors
        this.rotors = [];
        for (var i = 0; i < 3; i++) {
            this.rotors[i] = new Rotor(i);
        }

        // Create key listener
        document.onkeydown = function(event) {
            Simulation.key_press_handler(String.fromCharCode(event.keyCode));
        };

        // Init display
        Display.initialize();
        Display.update();
    },

    encrypt : function(key) {
        // Perform the encryption
        return "A";
    },

    key_press_handler : function(key) {
        // Check if key is in acceptable range
        if (key.charCodeAt() < 65 || key.charCodeAt() > 90)
            return;

        // Set current key
        this.ckey = key;
        // Set current ciphertext key
        this.cct = Simulation.encrypt(key);

        // Update display
        Display.update();
    },

    rotor_set_listener : function(event) {
        // Function to call when rotor up or down clicked
        var rtr = event.target.parentNode.id.charAt(6) - 1;
        Simulation.rotors[rtr].change_init_pos((event.target.className == "up") ? -1 : 1);
        Display.update();
    }
};

var Display = {
    initialize : function() {
        this.rotor_disp = [];

        // Create rotor display
        for (var i = 1; i < 4; i++) {

            // Create rotor div
            var parent_d = document.createElement("div");
            parent_d.className = "rotor";
            parent_d.id = "rotor_" + i;
            document.getElementById("rotor_pane").appendChild(parent_d);

            // Create up arrow
            var up_d = document.createElement("div");
            up_d.innerHTML = '↑';
            up_d.className = "up";
            up_d.onclick = Simulation.rotor_set_listener;
            parent_d.appendChild(up_d);

            // Create rotor disp
            var rotor_d = document.createElement("div");
            this.rotor_disp[i - 1] = rotor_d;
            parent_d.appendChild(rotor_d);

            // Create down arrow
            var down_d = document.createElement("div");
            down_d.innerHTML = '↓';
            down_d.className = "down";
            down_d.onclick = Simulation.rotor_set_listener;
            parent_d.appendChild(down_d);

        }
        // Create keys display
        for (var i = 0; i < 26; i++) {
            var key = document.createElement("div");
            var letter = String.fromCharCode(65 + i);
            key.id = "key_" + letter;
            key.innerHTML = letter;
            key.onclick = function(event) {
                Simulation.key_press_handler(event.target.id.charAt(4));
            }
            document.getElementById("key_pane").appendChild(key);
        }
    },

    update : function() {
        // Update rotor letters
        for (var i = 0; i < 3; i++)
            this.rotor_disp[i].innerHTML = Simulation.rotors[i].pos;

        // Remove old highlights
        var prevpt = document.getElementsByClassName("pthighlight");
        if (prevpt[0] != undefined)
            prevpt[0].classList.remove("pthighlight");
        var prevct = document.getElementsByClassName("cthighlight");
        if (prevct[0] != undefined)
            prevct[0].classList.remove("cthighlight");

        // Highlight plaintext
        document.getElementById("key_" + Simulation.ckey).classList.add("pthighlight");

        // Highlight ciphertext
        document.getElementById("key_" + Simulation.cct).classList.add("cthighlight");

        // Add text to text panes
        document.getElementById("tp_pt").innerHTML =
            document.getElementById("tp_pt").innerHTML + " " + Simulation.ckey;
        document.getElementById("tp_ct").innerHTML =
            document.getElementById("tp_ct").innerHTML + " " + Simulation.cct;
    }
};

function Rotor(id) {
    // Rotor position
    this.pos = 'A';
    
    // Rotor wiring, from rotor_wiring.js
    this.wiring = rotor_wirings[id];
    
    this.change_init_pos = function(change_by) {
        // Set rotor starting position
        if (change_by == 1 && this.pos == 'Z')
            this.pos = 'A';
        else if (change_by == -1 && this.pos == 'A')
            this.pos = 'Z';
        else
            this.pos = String.fromCharCode(this.pos.charCodeAt() + change_by);
    };

    this.sub_letter = function(letter) {
        // Do the substitution cipher for this rotor
    };
}
