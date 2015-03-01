// Change back button to "Back" and add logo
var backButton = new steroids.buttons.NavigationBarButton();
backButton.title = "Back"

steroids.view.navigationBar.update({
    titleImagePath: "/img/navbar@2x.png",
	backButton: backButton
});

function loadTransactions() {

	 // Transaction counter
	 window.localStorage.transactionIndex = 0;

	 // Set table head
	 tableHead = '<table style="width:100%">'+
	 			  '<tr>'+
					'<th style="background-color:#b2b2b2;padding:5px;height:10px;">Date</th>'+
					'<th style="background-color:#b2b2b2;padding:5px;height:10px;">Description</th>'+
					'<th style="background-color:#b2b2b2;text-align:center;padding:5px;height:10px;">Amount</th>'+
				  '</tr>'
	 window.localStorage.myTable = tableHead;

	 // Populate transactions
	 $.when(getAccounts()).done(function(accounts) {
   		$.each(accounts, function(i, account){
   				if(account.accountType == "CHECKING") {
   				// Display balance
   				document.getElementById("Balance").innerHTML += '<h4>Balance: CAD $'+
   				account.accountBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'</h3>';

   				// Display transactions
   				$.each(account.transactions, function(j, transaction) {
   					// // Find if it's money coming in or out
   					// var transactionSign = "DR";
   					// if(transaction.transactionAmount > 0)
   					// 	transactionSign = "CR";

   					// Decide color depending on transactionIndex
   					var color = "#ffffff";
   					if(window.localStorage.transactionIndex % 2 == 1)
   						color = "#eaf2d3";

					myDiv = '<tr>'+
								    '<td width="20%" style="background-color:'+color+';padding:5px;height:10px;">'+
								    transaction.transactionDate+'</td>'+
								    '<td width="50%" style="background-color:'+color+';padding:5px;height:10px;">'+
								    transaction.transactionDescription+'</td>'+
								    '<th style="background-color:'+color+';text-align:center;padding:5px;height:10px;">'+
								    parseFloat(Math.round(transaction.transactionAmount * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+
								    '</th>'+
							  '</tr>'
					window.localStorage.myTable += myDiv;
					window.localStorage.transactionIndex++;
				});
				document.getElementById("Transactions").innerHTML += window.localStorage.myTable + '</table>';
			}
	 	});
	 });

	function getAccounts() {
		return $.ajax({
				type: "GET",
				url: "http://54.152.50.12/Accounts.json",
				dataType: "json",
				crossDomain: true
			});
	}
}

window.addEventListener("load", loadTransactions, false);