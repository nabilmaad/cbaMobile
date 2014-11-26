steroids.view.navigationBar.show({
    titleImagePath: "/img/navbar@2x.png"
});

function loadAccounts() {

	// $.when(getAccounts()).done(function(accounts) {
 //  		$.each(accounts, function(i, account){
				bankingDiv = '<a id="account0" href="#" class="list-group-item">'+
						    '<div class="container">'+
						      '<div class="row">'+
						        '<div class="col-xs-4" position="relative">'+
						          '<img class="storeLogo" src="/icons/telescope@2x.png" align="left">'+
						        '</div>'+
						        '<div class="col-xs-8">'+
						          '<h4 class="list-group-item-heading">Name</h4>'+
						          '<p class="list-group-item-text">Test</p>'+
						        '</div>'+
						      '</div>'+
						    '</div>'+
						  '</a>'
					document.getElementById("Banking Accounts").innerHTML += bankingDiv;
	// 		});
	// });

	function getAccounts() {
		return $.ajax({
				type: "GET",
				url: "http://54.174.101.160/Accounts.json",
				dataType: "json",
				crossDomain: true
			});
	}
}

window.addEventListener("load", loadAccounts, false);