$(function()
{
    if (!localStorage.datacount || localStorage.datacount == null)
        localStorage.datacount = 0;

    var link3 = crossroads.addRoute('', function() {
        dataLength = localStorage.datacount;
        htmlText = "";
        if (dataLength > 0) {
            for (var i = 1; i <= dataLength; i++) {
                //i = index of list (start with 1)
                myData = localStorage.getItem("data" + i);
                myData = JSON.parse(myData);
                htmlText = htmlText + "<tr><td><a href='index.html#btnDisplay/"+i+"'>" + myData.nickname + "</a></td></tr>";
            }
        }
        else {
            htmlText = htmlText + "<tr><td> no data found </td></tr>";
        }

        $('#maintable tbody').html(htmlText);

        //show main menu with table and Add Button
        $("#divmokdebtn").show();
        $("#masterC").show();
        $("#divFrmAddKenalan").hide();
        $("#divFrmViewKenalan").hide();
        $("#divFrmEditKenalan").hide();
        $("#divaddbutton").show();
        $("#divAbout").hide();
        $("#divRestore").hide();
        $("#divDisplay").hide();
        $("#divEdit").hide();

    });    

    //btn add kenalan
    var link4 = crossroads.addRoute('btnAddKenalan', function() {
        $("#divmokdebtn").hide();
        $("#masterC").hide();
        $("#divFrmAddKenalan").show();
        $("#divFrmViewKenalan").hide();
        $("#divFrmEditKenalan").hide();
        $("#divaddbutton").hide();
        $("#divAbout").hide();
        $("#divRestore").hide();
        $("#divDisplay").hide();
        $("#divEdit").hide();

    });

    //Display by clicking the nickname
    var link5 = crossroads.addRoute('btnDisplay/{id}', function(id) {
        //display data in table

        //get item from localstorage
        myData = localStorage.getItem("data" + id);
        console.log("getdataa " + myData);
        myData = JSON.parse(myData);
        console.log("pass : " +myData.password);

        //kosongkan, baru masukkan data
        htmlText = "";
        htmlText = htmlText + "<tr><td>ID : " + id + "</td></tr><tr><td>Nickname : " 
                        + myData.nickname + "</td></tr><tr><td>Username : "
                        + myData.username + "</td></tr><tr><td>Password : " 
                        + myData.password + "</td></tr>";
            
        //change data in table
        $('#maintable2').html(htmlText);

        var editlink = "#btnEditsKenalan/" + id;
        $('#btnEdit').html(" <input type='checkbox' id='check'>" +
                            "<label class='chat-btn save' for='check'>" +
                            "<button class='btn-save' type='submit' onclick=\"location.href=' " + editlink + "' \"> <i class='fa fa-edit'></i> </button>" 
                            );

        var deletelink = "#btnDeleteKenalan/" + id;
        $('#btnDelete').html(" <input type='checkbox' id='check'> " +
                            "<label class='chat-btn delete' for='check'>" +
                            "<button class='btn-delete' type='submit' onclick=\"location.href=' " + deletelink + "' \"> <i class='fa fa-trash-o'></i> </button>" 
                            );

        //hide and show DIV
        $("#divmokdebtn").hide();
        $("#masterC").hide();
        $("#divFrmAddKenalan").hide();
        $("#divFrmViewKenalan").hide();
        $("#divFrmEditKenalan").hide();
        $("#divaddbutton").hide();
        $("#divAbout").hide();
        $("#divRestore").hide();
        $("#divDisplay").show();
        $("#divEdit").hide();

    });

    //Add kenalan
    $("#frmAddKenalan").submit(function(e) {
        e.preventDefault();
        e.stopPropagation();
        var nickName = $("#nickname").val();
        var userName = $("#username").val();
        var passWord = $("#password").val();

        myData = {};
        myData.nickname = nickName;
        myData.username = userName;
        myData.password = passWord;

        var i = localStorage.datacount
        i++;
        localStorage.setItem("data" + i, JSON.stringify(myData));
        localStorage.datacount = i;
        console.log("data" + i, JSON.stringify(myData));

        alert('New data added!');

        $('#maintable tbody').html(htmlText);
        //go to original link
        window.location = 'index.html';

        //show main menu with table and Add Button
        $("#divmokdebtn").show();
        $("#masterC").show();
        $("#divFrmAddKenalan").hide();
        $("#divFrmViewKenalan").hide();
        $("#divFrmEditKenalan").hide();
        $("#divaddbutton").show();
        $("#divAbout").hide();
        $("#divRestore").hide();
        $("#divDisplay").hide();
        $("#divEdit").hide();
        
    });

    //edit kenalan
    $("#frmEditsKenalan").submit(function(e) {
        e.preventDefault();
        e.stopPropagation();
        var id       = $("#idEdit").val();
        var nickName = $("#nicknameEdit").val();
        var userName = $("#usernameEdit").val();
        var passWord = $("#passwordEdit").val();

        myData = {};
        myData.nickname = nickName;
        myData.username = userName;
        myData.password = passWord;

        //var i = localStorage.datacount
        //i++;
        localStorage.setItem("data" + id, JSON.stringify(myData));
        console.log("data" + id + " Updated: ", JSON.stringify(myData));

        alert('Data edited!');

        window.location = 'index.html';

        $('#maintable tbody').html(htmlText);

        //show main menu with table and Add Button
        $("#divmokdebtn").show();
        $("#masterC").show();
        $("#divFrmAddKenalan").hide();
        $("#divFrmViewKenalan").hide();
        $("#divFrmEditKenalan").hide();
        $("#divaddbutton").show();
        $("#divAbout").hide();
        $("#divRestore").hide();
        $("#divDisplay").hide();
        $("#divEdit").hide();
        
    });

    //btn edit kenalan
    var link6 = crossroads.addRoute('btnEditsKenalan/{id}', function(id) {

        //get item from localstorage
        myData = localStorage.getItem("data" + id);
        myData = JSON.parse(myData);

        $("#idEdit").val(id) ;
        $("#nicknameEdit").val(myData.nickname);
        $("#usernameEdit").val(myData.username);
        $("#passwordEdit").val(myData.password);



        $("#divmokdebtn").hide();
        $("#masterC").hide();
        $("#divFrmAddKenalan").hide();
        $("#divFrmViewKenalan").hide();
        $("#divFrmEditKenalan").hide();
        $("#divaddbutton").hide();
        $("#divAbout").hide();
        $("#divRestore").hide();
        $("#divDisplay").hide();
        $("#divEdit").show();

    });

    //btn delete kenalan
    var link6 = crossroads.addRoute('btnDeleteKenalan/{id}', function(id) {

        //set item from localstorage as NULL
        localStorage.removeItem("data"+id);
        alert("id want to be deleted = " + id);
        var datacount = parseInt(localStorage.datacount);
        
        //alert("datacount = " + datacount);
        var temp = localStorage.getItem("data"+ String(id));
        
        //alert("nextid : "+nextid);

        //alert("keyy "+ localStorage.key(0));
        //alert("keyy1 "+ localStorage.key(1));
        //alert("keyy2 "+ localStorage.key(2));
        
        //alert("temp next : " + localStorage.getItem("data"+ nextid));
        
        //set item from bawah2 untuk masuk ke atas. Lepastu betulkan ID
        for (let i = id; i <= datacount; i++) {
            
            if (i < datacount) {    
                var nextid = parseInt(i)+1;
                temp = localStorage.getItem("data"+ nextid);
                //alert("next data " + i + " = " + temp);
                localStorage.setItem("data"+i, temp);
            } else {
                localStorage.removeItem("data"+i);
            }
        }

        //Decrease datacount by 1
        localStorage.datacount = datacount - 1;

        alert("Data deleted!");
        //go to original link
        window.location = 'index.html';

    });

    //go to #about
    var link7 = crossroads.addRoute('about', function() {
        $("#divmokdebtn").hide();
        $("#masterC").hide();
        $("#divFrmAddKenalan").hide();
        $("#divFrmViewKenalan").hide();
        $("#divFrmEditKenalan").hide();
        $("#divaddbutton").hide();
        $("#divAbout").show();
        $("#divRestore").hide();
        $("#divDisplay").hide();
        $("#divEdit").hide();

    });

    //backup button -- old code
    var link8 = crossroads.addRoute('backup', function() {

        var nickName = $("#nickname").val();
        var userName = $("#username").val();
        var passWord = $("#password").val();

        myData = {};
        myData.nickname = nickName;
        myData.username = userName;
        myData.password = passWord;

        for (let i = 1; i <= localStorage.datacount; i++) {
            //const element = array[i];
            var temp = localStorage.getItem("data"+i);
            localStorage.setItem("dataSave"+i, temp);
            console.log("dataSave"+i+ " = " + temp);

        }
        localStorage.datacountBackup = localStorage.datacount;
        
        alert('Done Backup!');

        $("#divmokdebtn").show();
        $("#masterC").show();
        $("#divFrmAddKenalan").hide();
        $("#divFrmViewKenalan").hide();
        $("#divFrmEditKenalan").hide();
        $("#divaddbutton").show();
        $("#divAbout").hide();
        $("#divRestore").hide();
        $("#divDisplay").hide();
        $("#divEdit").hide();

    });

    //restore button -- old code
    var link9 = crossroads.addRoute('restore', function() {
        
        for (let i = 1; i <= localStorage.datacountBackup; i++) {
            //const element = array[i];
            var temp = localStorage.getItem("dataSave"+i);
            if (temp != null) {
                localStorage.setItem("data"+i, temp);
                console.log("data"+i+ " = " + temp);
                localStorage.datacount = i;

            } else {
                localStorage.removeItem("data"+i);
                console.log("data" + i + " Removed");
            }

        }

        alert('Done Restore!');
        
        window.location = 'index.html';

        $("#divmokdebtn").show();
        $("#masterC").show();
        $("#divFrmAddKenalan").hide();
        $("#divFrmViewKenalan").hide();
        $("#divFrmEditKenalan").hide();
        $("#divaddbutton").show();
        $("#divAbout").hide();
        $("#divRestore").hide();
        $("#divDisplay").hide();
        $("#divEdit").hide();

    });

    //go to restore page
    var link8 = crossroads.addRoute('btnRestore', function () {

        $("#divmokdebtn").hide();
        $("#masterC").hide();
        $("#divFrmAddKenalan").hide();
        $("#divFrmViewKenalan").hide();
        $("#divFrmEditKenalan").hide();
        $("#divaddbutton").hide();
        $("#divAbout").hide();
        $("#divRestore").show();
        $("#divDisplay").hide();
        $("#divEdit").hide();

    });

    //restore button
    var link9 = crossroads.addRoute('restore2', function () {

        var userEmail = $("#userEmail").val(); //get userEmail input
        var datalist = "q=" + userEmail;
        alert("datalist : " + datalist);

        $.ajax( {
            type: "POST",
            url: "https://kerbau.odaje.biz/mokderestore.php",
            data: datalist,
            cache: false,
            success: function(returndata) {
                alert("Data returned : " + returndata);
                var dataget = JSON.parse(returndata);
                
                //get data and insert into system
                var data2 = dataget.data;
                //alert("All data : " + data2.toString());
                var data3 = JSON.parse(data2);
                
                for (let i = 0; i < data3.length; i++) {

                    localStorage.setItem("data" + (i+1) , data3[i]);
                    
                    
                }
                localStorage.datacount = data3.length;
                //0 -> data0 , 1 -> data1 , 2 -> data2
                alert("Restore successfull !");

            
                window.location = 'index.html';

            },
            error: function() {
                alert("Error connect to db :(");

                window.location = 'index.html';
            }

        });

        
        


    });
    
    //backup button
    var link10 = crossroads.addRoute('backup2', function () {

        array = [];
        myData = {};

        for (let i = 1; i <= localStorage.datacount; i++) {
            //const element = array[i];
            var temp = localStorage.getItem("data"+i);
            alert(temp);
            
            array.push(temp);
            alert("array : " + JSON.stringify(array) );

        }


        var userEmail = $("#userEmail").val(); //get userEmail input
        var datalist = "userEmail=" + userEmail + "&data=" + JSON.stringify(array);
        alert("datalist : " + datalist);

        $.ajax( {
            type: "POST",
            url: "https://kerbau.odaje.biz/mokdebackup.php",
            data: datalist,
            cache: false,
            success: function(returndata) {
                alert("success to linkk ");
                var data = JSON.parse(returndata);
                if (data.status === 1 ) {
                    alert("Data for " + userEmail + " backup successfully");
                    window.location = 'index.html';
                } else {
                    alert("Data failed to backup, either internet error or data already backup for email " + userEmail);
                }

                

            },
            error: function() {
                alert("Error connect to db :(");
            }

        });

        
        //show main menu with table and Add Button
        $("#divmokdebtn").show();
        $("#masterC").show();
        $("#divFrmAddKenalan").hide();
        $("#divFrmViewKenalan").hide();
        $("#divFrmEditKenalan").hide();
        $("#divaddbutton").show();
        $("#divAbout").hide();
        $("#divRestore").hide();
        $("#divDisplay").hide();
        $("#divEdit").hide();

        window.location = 'index.html';

    });

    //btn clear
    var link7 = crossroads.addRoute('clear', function() {
        localStorage.clear();
        alert("Data cleared!");
        window.location = 'index.html';

    });

    function parseHash(newHash, oldHash) {
        crossroads.parse(newHash);
    }

    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();

    function trClick(x, y) {
        alert("Row index is: " + x.rowIndex);
    }


    // -------- #About ------------
    // Initialize Variables
	var closePopup = document.getElementById("popupclose_About");
	var overlay = document.getElementById("overlay_About");
	var popup = document.getElementById("popup_About");
	var button = document.getElementById("button_About");
	// Close Popup Event
	closePopup.onclick = function() {
	  overlay.style.display = 'none';
	  popup.style.display = 'none';
	};
	// Show Overlay and Popup
	button.onclick = function() {
	  overlay.style.display = 'block';
	  popup.style.display = 'block';
	}
});

