// Delay log in
sleep(2000);

// Change back button to "Home" and add logo
var backButton = new steroids.buttons.NavigationBarButton();
backButton.title = "Home"

steroids.view.navigationBar.update({
    titleImagePath: "/img/navbar@2x.png",
	backButton: backButton
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}