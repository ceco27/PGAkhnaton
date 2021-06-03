//const fs = require('fs');
function loadoptions() {
    var list;
    try {
        const data = fs.readFileSync('listemployees.txt', 'utf8')
        list = data;
    } catch (err) {
        console.error(err)
    }
    //var list1 = Array.from(list);
    var newlist = new Array;
    var i = 0;
    var l = list.length;
    newlist = list.split("\r\n");
    /*while( i < newlist.length)
    {
        document.getElementById("options").innerHTML += "<option value=\"" + newlist[i] + "\">" + newlist[i] + "</option>";
        i++;
    }*/
    //var myDiv = document.getElementById("myDiv");
    //var selectList = document.createElement("select");
    //selectList.setAttribute("id", "employee");
    //mydiv.appendChild(selectList);
    for (var i = 0; i < newlist.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", newlist[i]);
        option.text = newlist[i];
        document.getElementById("employee").appendChild(option);
    }
    //console.log(list1[0]);
}