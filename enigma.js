var Simulation = {
    initialize : function() {
        // Init rotors
        this.rotors = [];
        for (var i = 0; i < 3; i++) {
            this.rotors[i] = new Rotor();
        }
        
        // Init display
        Display.initialize();
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
    },

    update : function() {
        // Update rotor letters
        for (var i = 0; i < 3; i++)
            this.rotor_disp[i].innerHTML = Simulation.rotors[i].pos;
    }
};

function Rotor() {
    // Rotor position
    this.pos = 'A';
    
    this.change_init_pos = function(change_by) {
        // Set rotor starting position
        if (change_by == 1 && this.pos == 'Z')
            this.pos = 'A';
        else if (change_by == -1 && this.pos == 'A')
            this.pos = 'Z';
        else
            this.pos = String.fromCharCode(this.pos.charCodeAt() + change_by);
    };
}
