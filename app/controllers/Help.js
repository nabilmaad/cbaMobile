// Change back button to "Back" and add logo
var backButton = new steroids.buttons.NavigationBarButton();
backButton.title = "Back"

steroids.view.navigationBar.update({
    titleImagePath: "/img/navbar@2x.png",
	backButton: backButton
});