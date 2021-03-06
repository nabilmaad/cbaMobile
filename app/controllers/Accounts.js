// Change back button to "Back" and add logo
var backButton = new steroids.buttons.NavigationBarButton();
backButton.title = "Back"

steroids.view.navigationBar.update({
    titleImagePath: "/img/navbar@2x.png",
	backButton: backButton
});

function loadAccounts() {

	 $.when(getAccounts()).done(function(accounts) {
   		$.each(accounts, function(i, account){
				myDiv = '<a id="account'+account.accountId+'" onClick="openLayer(\'/Checking/index.html\')" class="list-group-item">'+
							    '<table style="width:100%">'+
							      '<tr>'+
							        '<th style=padding:10px">'+account.accountType+'</th>'+
							        '<th style="text-align:right;"><font color="#000000">CAD $'+
							        parseFloat(Math.round(account.accountBalance * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'</font></th>'+
							        '<th style="text-align:right;">&gt;</th>'+
							      '</tr>'+
							      '<tr>'+
							        '<th style=padding:10px">ACCOUNT '+account.accountNumber.substr(account.accountNumber.length - 5)+'</th>'+
							      '</tr>'+
							    '</table>'+
						  '</a>'

				// Figure out where to insert account in the UI
				if(account.accountCategory == "Banking") {
					document.getElementById("Banking Accounts").innerHTML += myDiv;
				} else if(account.accountCategory == "Credit") {
					document.getElementById("Credit Accounts").innerHTML += myDiv;
				} else if(account.accountCategory == "Investment") {
					document.getElementById("Investment Accounts").innerHTML += myDiv;
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

window.addEventListener("load", loadAccounts, false);