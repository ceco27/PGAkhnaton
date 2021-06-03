const fs = require('fs');
var projects = new Array;
var filepath;
function print() {
	var data;
	try {
		const file = fs.readFileSync('info.json', 'utf8')
		data = JSON.parse(file);
	} catch (err) {
		console.error(err)
	}
	try {
		const data = fs.readFileSync('path.txt', 'utf8')
		filepath = data;
	} catch (err) {
		console.error(err)
	}
	if (filepath[(filepath.length - 1)] != '/')
		filepath += '/';
	//console.log(filepath);
	var files = fs.readdirSync(filepath);
	files.forEach(file => {
		projects.push(file);
	});
	console.log(projects);
	var numrows = data["info"].length-1;
	var numrows1 = projects.length-1;
	var tbl = document.getElementById("table");
	tbl.remove();
	var x = document.createElement("TABLE");
	x.setAttribute("id", "table");
	document.body.appendChild(x);
	for (; numrows1 >= 0; numrows1--) {
		if(projects[numrows1] == "O_2020_0000" || !(projects[numrows1][0]=="O" && projects[numrows1][1]=="_"))
		{
			continue;
		}
		var row = document.createElement("TR");
		row.setAttribute("id", "row" + numrows1);
		document.getElementById("table").appendChild(row);

		var a = document.createElement("TD");
		var b = document.createElement("TD");
		var c = document.createElement("TD");

		var as = "";
		var bs = "";
		var cs = "";
		//console.log(projects[numrows1]);
		as = document.createTextNode(projects[numrows1]);
		bs = document.createTextNode("");
		cs = document.createTextNode("");
		as1 = projects[numrows1];
		for(var j=numrows; j>=0; j--)
		{
			console.log(as1);
			console.log(data["info"][j]["projectname"]);
			if(as1==data["info"][j]["projectname"])
			{
				
				as = document.createTextNode(data["info"][j]["projectname"]);
				bs = document.createTextNode(data["info"][j]["employee"]);
				cs = document.createTextNode(data["info"][j]["date"]);
				data["info"].splice(j,1);
				numrows--;
				break;
			}
		/*as = document.createTextNode(data["info"][numrows1]["projectname"]);
		bs = document.createTextNode(data["info"][numrows1]["employee"]);
		cs = document.createTextNode(data["info"][numrows1]["date"]);*/
		}

		a.appendChild(as);
		b.appendChild(bs);
		c.appendChild(cs);

		document.getElementById("row" + numrows1).appendChild(a);
		document.getElementById("row" + numrows1).appendChild(b);
		document.getElementById("row" + numrows1).appendChild(c);
	}
	projects = [];
}
function create() {
	var filepath
	try {
		const data = fs.readFileSync('path.txt', 'utf8')
		filepath = data;
	} catch (err) {
		console.error(err)
	}
	if (filepath[(filepath.length - 1)] != '/')
		filepath += '/';
	console.log(filepath);
	var files = fs.readdirSync(filepath);
	var maxnum = 0;
	var filestart = "O_2020_";
	var currnum = 0;
	//document.getElementById("projects").innerHTML = "";
	files.forEach(file => {
		//projects.push(file);
		currnum = parseInt(file.substr(7, 11));
		if (currnum > maxnum && file.substr(0,2) == "O_") {
			maxnum = currnum;
		}
	});
	console.log(projects);
	var customer = document.getElementById("customer").value;	
	var employee = document.getElementById("employee").value;
	console.log(customer);
	if (customer == "") {
		alert("моля въведете име на клиент");
		return false;
	}
	var folderA = filepath + "O_2020_0000";
	var fileA1 = "O_2020_0000.xlsm";
	var fileA2 = "O_2020_0000.doc";
	var fileA3 = "Proforma_2020_0000.xlsm";
	var fileB1;
	var fileB2;
	var date = new Date();
	var month = date.getMonth() + 1;
	var year = date.getFullYear().toString();
	if(month < 10)
	{
		month = "0" + String(month);
	}
	var pname = year.substr(2,3) + month;
	console.log(pname);
	maxnum++;
	// String(month)
	if (maxnum < 10) {
		folderB = filepath + "O_" + pname + "_000" + maxnum.toString() + "_" + customer;
		fileB1 = "O_" + pname + "_000" + maxnum.toString() + "_" + customer + ".xlsm";
		fileB2 = "O_" + pname + "_000" + maxnum.toString() + "_" + customer + ".doc";
		fileB3 = "Proforma_" + pname + "_000" + maxnum.toString() + "_" + customer + ".xlsm";
	}
	if (maxnum >= 10 && maxnum < 100) {
		folderB = filepath + "O_" + pname + "_00" + maxnum.toString() + "_" + customer;
		fileB1 = "O_" + pname + "_00" + maxnum.toString() + "_" + customer + ".xlsm";
		fileB2 = "O_" + pname + "_00" + maxnum.toString() + "_" + customer + ".doc";
		fileB3 = "Proforma_" + pname + "_00" + maxnum.toString() + "_" + customer + ".xlsm";
	}
	if (maxnum >= 100 && maxnum < 1000) {
		folderB = filepath + "O_" + pname + "_0" + maxnum.toString() + "_" + customer;
		fileB1 = "O_" + pname + "_0" + maxnum.toString() + "_" + customer + ".xlsm";
		fileB2 = "O_" + pname + "_0" + maxnum.toString() + "_" + customer + ".doc";
		fileB3 = "Proforma_" + pname + "_0" + maxnum.toString() + "_" + customer + ".xlsm";
	}
	if (maxnum >= 1000) {
		folderB = filepath + "O_" + pname + "_" + maxnum.toString() + "_" + customer;
		fileB1 = "O_" + pname + "_" + maxnum.toString() + "_" + customer + ".xlsm";
		fileB2 = "O_" + pname + "_" + maxnum.toString() + "_" + customer + ".doc";
		fileB3 = "Proforma_" + pname + "_" + maxnum.toString() + "_" + customer + ".xlsm";
	}
	fs.mkdir(folderB, (err) => {
		if (err) throw err;
		console.log('Directory was created');
	});
	fs.copyFile(folderA + "/" + "ach.bel", folderB + "/" + "ach.bel", (err) => {
		if (err) throw err;
		console.log('File was copied to destination');
	});
	fs.copyFile(folderA + "/" + fileA1, folderB + "/" + fileB1, (err) => {
		if (err) throw err;
		console.log('File was copied to destination');
	});
	fs.copyFile(folderA + "/" + fileA2, folderB + "/" + fileB2, (err) => {
		if (err) throw err;
		console.log('File was copied to destination');
	});
	fs.copyFile(folderA + "/" + fileA3, folderB + "/" + fileB3, (err) => {
		if (err) throw err;
		console.log('File was copied to destination');
	});
	alert("Създадохте оферта за проект/клиент: " + customer);
	
	
	var data;
	try {
		const file = fs.readFileSync('info.json', 'utf8')
		data = JSON.parse(file);
	} catch (err) {
		console.error(err)
	}
	var numrows = data["info"].length;
	var newdata = { "projectname": fileB1.substring(0,fileB1.length-5), "employee": employee, "date": date.getDate() + "/" + month + "/" + date.getFullYear() };
	//console.log(newdata);
	data.info.push(newdata);
	console.log(data);
	fs.writeFileSync("info.json", JSON.stringify(data));
	var datatxt = new Array;
	var i;
	for(i=1;i<numrows;i++)
	{
		datatxt[i] = "\n" + data["info"][i]["projectname"] + " " + data["info"][i]["employee"] + " " + data["info"][i]["date"];

	}
	fs.writeFileSync("project-info.txt", datatxt);
	print();
}