class valueChanger {
    constructor(currentValue) {
        this.currentValue = currentValue
        this.maxValue = currentValue;
    }
    change(direction, $currentInput) {
        console.log($currentInput);
        var spinValue = parseInt($currentInput.val());

        var testValue = this.currentValue - direction;
        console.log(testValue,this.maxValue,spinValue)
        if (testValue < 0 || testValue > this.maxValue || spinValue < 0) {
            console.log("false");
            return false;
        } else {
            console.log("true");
            this.currentValue -= direction;
            return true;
        }
    }
}
var valueChange = new valueChanger(10);

$(init)
var htm="";
function init() {
    [ "Strength","Wisdom", "Charisma", "Loyalty"].forEach(makeStats)
    $('input[type="number"]').niceNumber({
        onIncrement: ($currentInput, amount, settings) => change($currentInput, amount, settings, 1), 
        onDecrement: ($currentInput, amount, settings) => change($currentInput, amount, settings, -1), 
    });
    console.log(htm)
}
function change($currentInput, amount, settings, direction) {
    if (!valueChange.change(direction, $currentInput)) {
        $currentInput.val($currentInput.val() - direction);
    }
    console.log(settings);
    // if (amount >= 100) {
    //     $currentInput.classList.add('more-than-100');
    // } else {
    //     $currentInput.classList.remove('more-than-100');
    // }
}
function makeStats(item) {
    var label=$("<div/>",{"html":item});
    var picker=$("<input/>", { "id":item,"type": "number", "value": 0 });
    htm+=label[0].outerHTML+picker[0].outerHTML
}