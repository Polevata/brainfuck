var CURRENT_PLACE = 0; //Current spot in the formatted text being run
var PREVIOUS_VALUE = ""; //What to check text against every run to ensure no changes have occured
var FORMATTED_TEXT = ""; //Inputted text sans all that other stuff
var ARRAY_SIZE = 100; //Number of cells to work with in array
var INDEX = 0; //Current spot in the array
var INPUT_STRING; //Stores ascii text to be fed in with a 0 following
var NUL;
function $(id)
{
    return document.getElementById(id);
}
function initiate()
{
    for (i=0;i<ARRAY_SIZE;i++)
    {
        $('array').innerHTML+="<td id='a"+i+"'>0</td>";
        $('pointer').innerHTML+="<td id='p"+i+"'> </td>";
    }
    restart();
}

function action(steps)
{
    if ($('code').value != PREVIOUS_VALUE){restart();}
    if (CURRENT_PLACE == 0)
    {
        PREVIOUS_VALUE = $('code').value;
        FORMATTED_TEXT="";
        var properText = PREVIOUS_VALUE.match(/[<>+\-.,[\]]/g);
        var bracketCount = 0;
        for (i=0;i<properText.length;i++)
        {
            if (properText[i] == '[') {bracketCount++;}
            if (properText[i] == ']') {bracketCount--;}
            FORMATTED_TEXT+=properText[i];
        }
        if (bracketCount!=0)
        {
            $('results').value = "ERROR: MISMATCHED SQUARE BRACKETS";
            return;
        }
    }
    for (i=0;(CURRENT_PLACE < FORMATTED_TEXT.length && i<steps) || steps == -1;i++) //Make sure that the instructions haven't been exceeded yet and only do as many steps as asked
    {
        switch (FORMATTED_TEXT[CURRENT_PLACE])
        {
            case '<':
                if (INDEX <= 0) {$('results').value = "ERROR: OUT OF BOUNDS";}
                else
                {
                    $('p'+INDEX).innerHTML = " ";
                    INDEX--;
                    $('p'+INDEX).innerHTML = "^";
                }
                break;
            case '>':
                if (INDEX >= ARRAY_SIZE-1) {$('results').value = "ERROR: OUT OF BOUNDS";}
                else
                {
                    $('p'+INDEX).innerHTML = " ";
                    INDEX++;
                    $('p'+INDEX).innerHTML = "^";
                }
                break;
            case '+':
                if (parseInt($('a'+INDEX).innerHTML) >= 255) {$('a'+INDEX).innerHTML = 0;}
                else {$('a'+INDEX).innerHTML = parseInt($('a'+INDEX).innerHTML)+1;}
                break;
            case '-':
                if (parseInt($('a'+INDEX).innerHTML) <= 0) {$('a'+INDEX).innerHTML = 255;}
                else {$('a'+INDEX).innerHTML = parseInt($('a'+INDEX).innerHTML)-1;}
                break;
            case '.':
                $('results').value+=String.fromCharCode($('a'+INDEX).innerHTML);
                break;
            case ',':
                if(INPUT_STRING.length==0)
                {
                    if (NUL == true) {$('a'+INDEX).innerHTML = 0;NUL = false;break;}
                    else
                    {
                        INPUT_STRING = prompt("Input Text:");
                        if(INPUT_STRING.length==1) {NUL = true;}
                    }
                }
                $('a'+INDEX).innerHTML = INPUT_STRING.charCodeAt(0);
                if(INPUT_STRING.length==1)
                {
                    if (NUL == true) {NUL = false;}
                    else {NUL = true;}
                }
                INPUT_STRING = INPUT_STRING.slice(1);
                break;
            case '[':
                if(parseInt($('a'+INDEX).innerHTML) == 0)
                {
                    var bracketCount = 0;
                    for (j=CURRENT_PLACE;j<FORMATTED_TEXT.length;j++)
                    {
                        if (FORMATTED_TEXT[j] == '[') {bracketCount++;}
                        if (FORMATTED_TEXT[j] == ']') {bracketCount--;}
                        if (bracketCount == 0) {CURRENT_PLACE = j;break;}
                    }
                }
                break;
            case ']':
                if(parseInt($('a'+INDEX).innerHTML) != 0)
                {
                    var bracketCount = 0;
                    for (j=CURRENT_PLACE;j>0;j--)
                    {
                        if (FORMATTED_TEXT[j] == '[') {bracketCount++;}
                        if (FORMATTED_TEXT[j] == ']') {bracketCount--;}
                        if (bracketCount == 0) {CURRENT_PLACE = j;break;}
                    }
                }
                break;
        }
        if ($('results').value == "ERROR: OUT OF BOUNDS") {break;}
        if (CURRENT_PLACE>=FORMATTED_TEXT.length+1) {break;}
        CURRENT_PLACE++;
    }
}

function restart()
{
    CURRENT_PLACE = 0;
    INPUT_STRING="";
    NUL=false;
    $('p'+INDEX).innerHTML = " ";
    INDEX = 0;
    $('p'+INDEX).innerHTML = "^";
    for (i=0;i<ARRAY_SIZE;i++){$('a'+i).innerHTML = 0;}
    $('results').value = "";
}