// Lock the loading screen
var gameVars;
$(document).ready(function () {

    var isOnline = new RegExp('apps\.tlt\.stonybrook\.edu').test(window.location.href);
    console.log(isOnline)
    if (isOnline) {
        online();

    } else {
        offline();

    }

});

function showVars() {

    console.log("h", SugarCube.State.variables)
}

function offline() {
    var vars = window.gameData;
    console.log(vars)
    for (key in vars) {
        console.log(key, vars[key])
        SugarCube.State.setVar("$" + key, vars[key]);
    }

    console.log(SugarCube.State.variables)
    SugarCube.Engine.play(vars["currentPassage"])
    fade($("body"),1);
}


function online() {

    if (email == "") {
        window.location = "login"

    }
    $.get("roles.php", loadRole);

}



function init() {
    fade($("body"),1);
    setInterval(checkDif, 1000)
}

function setBackground(image) {

    console.log("fd")
    var faction = SugarCube.State.getVar('$faction')
    console.log($('#story'))
    $(() => {
        $('#story').css({
            'background-image': `url('images/Borders/${faction}.png'),url('images/${image}')`
        })

    })
}

function fade(el,destination){


    $({opacity: 1-destination})
    .animate(
        {opacity: destination},
        {
        duration: 2000,
        step: function () {
            $(el).css({
                opacity: this.opacity
            })
        }
    });



}

$(document).on(':passagestart', (ev) => {

console.log("Fade in")
fade($("#passages"),1);








    }
)
/* JavaScript code */




function checkDif() {
    var dif = {};
    var sugarVars = Object.assign({}, SugarCube.State.variables);
    delete sugarVars.role;
    delete sugarVars.faction;
    delete sugarVars.isLeader;
    delete sugarVars.character;
    for (i in sugarVars) {
        if (sugarVars[i] != gameVars[i])
            dif[i] = sugarVars[i];


    }
    gameVars = Object.assign({}, sugarVars);
    if (!$.isEmptyObject(dif)) {
        $.post("updateBatch.php", dif);


    }
}

function makeRoleStats() {
   
    var role = SugarCube.State.getVar("$role");
    var output = "";
    var statTypes = ["Strength", "Wisdom", "Charisma", "Loyalty"]

    statTypes.forEach((stat) => {
        var twineVar = `$${role}_${stat}`
        var val = SugarCube.State.getVar(twineVar)
        if (!val) {
            val = getRandomInt(6) + 1

            SugarCube.State.setVar(twineVar, val);
        }
        output += `${stat}: ${val}\n`

    })




    return output;

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function loadRole(data) {

    //  var email = SugarCube.State.getVar("$email");
    var roles = $.csv.toObjects(data);
    console.log(roles)
    var role = "Player"
    var foundRole = roles.find((item) => item.email == email)

    if (foundRole) {
        role = foundRole.role

    }

    SugarCube.State.setVar("$role", role);

    $.get("roleInfo.php", (data) => loadRoleInfo(data, role))


}

function loadRoleInfo(data, role) {
    var roleInfo = $.csv.toObjects(data);
    var faction = "Observer";
    var isLeader = false;
    var character = "Observer"
    var foundRoleInfo = roleInfo.find((item) => item.Role == role)
    if (foundRoleInfo) {
        console.log(foundRoleInfo)
        faction = foundRoleInfo.Faction;
        isLeader = foundRoleInfo.isLeader.toLowerCase();
        character = foundRoleInfo.Character

    }
    SugarCube.State.setVar("$faction", faction);
    SugarCube.State.setVar("$isLeader", isLeader);
    SugarCube.State.setVar("$character", character);
    $.get("gameState.php", loadGameData);


}



function loadGameData(data) {
    var vars = $.csv.toObjects(data)[0];
    gameVars = vars;

    for (key in vars) {
        var val = parseInt(vars[key]);
        if (!val) {
            val = vars[key]
        }

        SugarCube.State.setVar("$" + key, val);
    }

    console.log(SugarCube.State.variables)
    SugarCube.Engine.play(vars["currentPassage"])
    init();

}