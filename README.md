Prototype for the CBA Mobile App.

Instructions:
- Don't develop under "www". We should be working with views and controllers only.
- The views go under "app/views/viewName/index.html". You only need to include the body of the view. It's head goes under "app/views/layout/viewName.html". Look at "Home" to understand how it works. Basically the "layout" and the "actual" view get merged at the end.
- A Controller needs to be developped for each view. They go under "app/controllers/viewName.js". Check Home.js as example.
- I've added bootstrap under "www" and it can be referred in the layout of each view. If you want to add css, you can use "www/stylesheets/application.css" or create your own. If you want to add some JavaScript that can be used by more than view, use "www/javascripts/application.js".
- Basically, everything under "app/" and "www/" will be put together under "dist/" which runs on the device itself. Don't' touch anything under "dist", as it's re-created everytime you make a change and apply it.
- I've enabled tabs through the coffee config files. You can add/edit tabs from there.'