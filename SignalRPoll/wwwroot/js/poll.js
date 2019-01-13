"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/pollHub").build();
var chartBlock = '\u25A3'; //(U+25A3) is "▣" 

connection.on("ReceiveMessage", function (user, message, myCaptainId, myCaptainVal) {
    // alert("myCaptainId=" + myCaptainId + ",myCaptainVal=" + myCaptainVal);
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // var encodedMsg = user + " says " + msg;
    var pollResultMsg = user + " voted for '" + myCaptainVal + "'.";

    // var liMessage = document.createElement("li");
    // liMessage.textContent = encodedMsg;
    // document.getElementById("messagesList").appendChild(liMessage);

    var ulPoll = document.getElementById("messagesList");
    var liPollResult = document.createElement("li");
    liPollResult.textContent = pollResultMsg;

    // append to top
    ulPoll.insertBefore(liPollResult, ulPoll.childNodes[0]);

    // append to end
    // document.getElementById("messagesList").appendChild(liPollResult);

    // append to chart block
    document.getElementById(myCaptainId + 'Block').innerHTML += chartBlock;
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = ""; //document.getElementById("messageInput").value;
    //var myCaptain = document.getElementById("myCaptain").value;

    if (!user) {
        user = "[anonymous]";
    }

    if ($('input:radio[name=myCaptain]').is(':checked')) {
        var myCaptainId = $('input[name=myCaptain]:checked').attr('id');
        var myCaptainVal = $('input[name=myCaptain]:checked').val();
        connection.invoke("SendMessage", user, message, myCaptainId, myCaptainVal).catch(function (err) {
            return console.error(err.toString());
        });
    } else {
        return console.log("No captain selected.");
    }

    event.preventDefault();
});