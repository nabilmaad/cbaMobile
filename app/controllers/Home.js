steroids.view.navigationBar.show({
    titleImagePath: "/img/navbar@2x.png"
});

function openLayerLogin(location) {
  // Create a new WebView that...
  webView = new steroids.views.WebView({ location: "views" + location });

  // Create animation
  var anim = new steroids.Animation("flipHorizontalFromRight");
  // ...is pushed to the navigation stack, opening on top of the current WebView.
  steroids.layers.push({
  	view: webView,
  	animation: anim
  });
}