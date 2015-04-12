var Simulation = {
    initialize : function() {
        // Init rotors
        Rotors.initialize(['A', 'A', 'A']);
        
        // Init display
        Display.initialize();
        Display.update();
    },
};

var Display = {
    initialize : function() {
        this.rotor_disp = [];

        // Function to call when rotor up or down clicked
        var adjust_rotor = function(event) {
            var rtr = event.target.parentNode.id.charAt(6) - 1;
            Rotors.change_init_pos(rtr, (event.target.className == "up") ? -1 : 1);
            Display.update();
        }

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
            up_d.onclick = adjust_rotor;
            parent_d.appendChild(up_d);

            // Create rotor disp
            var rotor_d = document.createElement("div");
            this.rotor_disp[i - 1] = rotor_d;
            parent_d.appendChild(rotor_d);

            // Create down arrow
            var down_d = document.createElement("div");
            down_d.innerHTML = '↓';
            down_d.className = "down";
            down_d.onclick = adjust_rotor;
            parent_d.appendChild(down_d);
        }
    },

    update : function() {
        // Update rotor letters
        for (var i = 0; i < 3; i++)
            this.rotor_disp[i].innerHTML = Rotors.get_rts()[i];
    }
};

var Rotors = {
    initialize : function(init_pos) {
        // Init rotors
        this.rts = [init_pos[0], init_pos[1], init_pos[2]];
    },

    change_init_pos : function(rtr, change_by) {
        // Set rotor
        if (change_by == 1 && this.rts[rtr] == 'Z')
            this.update(rtr, 'A')
        else if (change_by == -1 && this.rts[rtr] == 'A')
            this.update(rtr, 'Z');
        else
            this.update(rtr, String.fromCharCode(this.rts[rtr].charCodeAt()
                        + change_by));
    },

    update : function(rtr, new_value) {
        // Update value
        this.rts[rtr] = new_value;
    },

    get_rts() {
        return this.rts;
    }
};
