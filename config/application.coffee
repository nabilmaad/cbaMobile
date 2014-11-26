# For an explanation of the steroids.config properties, see the guide at
# http://guides.appgyver.com/steroids/guides/project_configuration/config-application-coffee/

steroids.config.name = "cbaMobile"

# ## Start Location
steroids.config.location = "http://localhost/views/Home/index.html"

# ## Navigation Bar
steroids.config.navigationBar.buttonTintColor = "#ffffff";

# ## Tab Bar
steroids.config.tabBar.enabled = true
steroids.config.tabBar.selectedTabTintColor = "#6aa248";
steroids.config.tabBar.tabs = [
  {
    id: "index"
    title: "Home"
    icon: "icons/accounts@2x.png"
    location: "http://localhost/views/Home/index.html"
  },
  {
    id: "locations"
    title: "Locations"
    icon: "icons/locations@2x.png"
    location: "http://localhost/views/Accounts/index.html"
  }
]

# ## Preloads
# steroids.config.preloads = [
#   {
#     id: "google"
#     location: "http://www.google.com"
#   }
# ]

# ## Drawers
# steroids.config.drawers =
#   left:
#     id: "leftDrawer"
#     location: "http://localhost/leftDrawer.html"
#     showOnAppLoad: true
#     widthOfDrawerInPixels: 200
#   right:
#     id: "rightDrawer"
#     location: "http://localhost/rightDrawer.html"
#     showOnAppLoad: false
#     widthOfDrawerInPixels: 200
#   options:
#     centerViewInteractionMode: "Full"
#     closeGestures: ["PanNavBar", "PanCenterView", "TapCenterView"]
#     openGestures: ["PanNavBar", "PanCenterView"]
#     showShadow: true
#     stretchDrawer: true
#     widthOfLayerInPixels: 0

# ## Initial View
# steroids.config.initialView =
#   id: "initialView"
#   location: "http://localhost/initialView.html"

# ## Android Loading Screen
steroids.config.loadingScreen.tintColor = "#262626"

# ## iOS Status Bar
steroids.config.statusBar.enabled = true
steroids.config.statusBar.style = "default"

# ## File Watcher
# steroids.config.watch.exclude = ["www/my_excluded_file.js", "www/my_excluded_dir"]

# ## Pre- and Post-Make Hooks
# steroids.config.hooks.preMake.cmd = "echo"
# steroids.config.hooks.preMake.args = ["running yeoman"]
# steroids.config.hooks.postMake.cmd = "echo"
# steroids.config.hooks.postMake.args = ["cleaning up files"]

# ## Default Editor
# steroids.config.editor.cmd = "subl"
# steroids.config.editor.args = ["."]
