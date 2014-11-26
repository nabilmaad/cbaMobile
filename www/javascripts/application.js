// Set the WebView background color to white (effective on iOS only)
steroids.view.setBackgroundColor("#ffffff");

function openLayer(location) {
  // Create a new WebView that...
  webView = new steroids.views.WebView("views" + location);

  // ...is pushed to the navigation stack, opening on top of the current WebView.
  steroids.layers.push(webView);
}