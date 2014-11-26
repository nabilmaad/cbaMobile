// Change back button to "Home" and add logo
var backButton = new steroids.buttons.NavigationBarButton();
backButton.title = "Home"

steroids.view.navigationBar.update({
    titleImagePath: "/img/navbar@2x.png",
	backButton: backButton
});