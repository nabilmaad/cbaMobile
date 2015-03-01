// Change back button to "Home" and add logo
var backButton = new steroids.buttons.NavigationBarButton();
backButton.title = "Home"

steroids.view.navigationBar.update({
    titleImagePath: "/img/navbar@2x.png",
	backButton: backButton
});

function sucessAlert() {
  navigator.notification.alert(
        'Money Sent',  // message
        alertDismissed,         // callback
        'Sucess!',            // title
        'Done'                  // buttonName
    );
  function alertDismissed() {}
}

function toggleAccountsDataFrom(selectedAccount) {
    var appears = false;
    var accountsData = document.getElementsByClassName('accountsFrom');
    for(var i = 0; i < accountsData.length; i++) {
        display = accountsData[i].style.display;
        if (display=="block") {
            appears = true;
            break;
        }
    }
    
    if (!appears) { // if accounts data is hidden
        var selectAmount = document.getElementById('selectAccountFrom');
        selectAmount.innerHTML = '';
        // show accounts data
        for(var i = 0; i < accountsData.length; i++) {
            accountsData[i].className = accountsData[i].className.replace
            ( /(?:^|\s)hide(?!\S)/g , '' );
        }
    } else {
        // hide accounts data
        for(var i = 0; i < accountsData.length; i++) {
            accountsData[i].className += ' hide';
        }
    }
    
    if (selectedAccount) {
        var selectAmount = document.getElementById('selectAccountFrom');
        selectAmount.innerHTML = selectedAccount;
        selectAmount.style.color = 'black';
        selectAmount.style.opacity = '1';
        for(var i = 0; i < accountsData.length; i++) {
            accountsData[i].className += ' hide';
        }
    }
}

function loadAccounts() {
    
    $.when(getAccounts()).done(function(accounts) {
                               $.each(accounts, function(i, account){
                                      myDivFrom = '<a id="account'+account.accountId+'" onClick="toggleAccountsDataFrom(\'ACCOUNT '+account.accountNumber.substr(account.accountNumber.length - 5)+'\')" class="list-group-item">'+
                                      '<table class="accountsFrom">'+
                                      '<tr>'+
                                      '<td style=padding:10px">'+account.accountType+'</td>'+
                                      '<td style="text-align:right;"><font color="#000000">CAD $'+
                                      parseFloat(Math.round(account.accountBalance * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'</font></td>'+
                                      '<td style="text-align:right;">&gt;</td>'+
                                      '</tr>'+
                                      '<tr>'+
                                      '<td style=padding:10px">ACCOUNT '+account.accountNumber.substr(account.accountNumber.length - 5)+'</td>'+
                                      '</tr>'+
                                      '</table>'+
                                      '</a>';
                                      
                                      // Figure out where to insert account in the UI
                                      if(account.accountCategory == "Banking") {
                                      document.getElementById("Banking Accounts From").innerHTML += myDivFrom;
                                      } else if(account.accountCategory == "Credit") {
                                      document.getElementById("Credit Accounts From").innerHTML += myDivFrom;
                                      } else if(account.accountCategory == "Investment") {
                                      document.getElementById("Investment Accounts From").innerHTML += myDivFrom;
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