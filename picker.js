var valueChange = new valueChanger(10);

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

            $("#currentValue").val(this.currentValue);
            console.log($("#currentValue"));

            return true;
        }
    }
}


var htm="";

function statPickerInit() {
    var currentValueLabel=$("<input/>", { "id":"currentValue", "value": 0, 
    "disabled":"disabled" , "size":2});

    var container=$("<div/>",{"id":"stats"});
    $("#statPicker").append(currentValueLabel);

    console.log(htm);
    [ "Strength","Wisdom", "Charisma", "Loyalty"].forEach((stat)=>makeStats(stat, container));
    console.log(htm);
    
    var submitButton=$("<input/>", { "id":"submitButton", "value": "submit stats" , type:"submit"});
    var newline=$("<br/>")
    container.append([newline,submitButton]);
    console.log($("#submitButton"))
    
    htm+=container[0].outerHTML;

    $("#statPicker").append(htm)
    $("#submitButton").on("click",submitStats)
    $('#stats input[type="number"]').niceNumber({
        onIncrement: ($currentInput, amount, settings) => change($currentInput, amount, settings, 1), 
        onDecrement: ($currentInput, amount, settings) => change($currentInput, amount, settings, -1), 
    });
}

function submitStats(){
    var niceNumber = $(".nice-number input");
    var stats = {}
    niceNumber.each((index,item)=>{
        var jqItem = $(item);
        var statType = $(item).attr("id");
        var statValue = $(item).val();
        stats[statType]=statValue
    })
    console.log(stats);
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

function makeStats(item, container) {

    var label=$("<div/>",{"html":item});
    var picker=$("<input/>", { "id":item,"type": "number", "value": 0 });
    // htm+=label[0].outerHTML+picker[0].outerHTML;
    container.append([label, picker]);
}
