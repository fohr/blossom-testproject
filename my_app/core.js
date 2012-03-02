/*globals global */

// Welcome to the Blossom test project. This shows how to get a basic Blossom 
// application up and running with a minimum of code.  Please be sure to read 
// the README so that Blossom is installed correctly via `npm`, the Node 
// Package Manager.  Now, on to the code!

// Every Blossom app needs exactly one instance of `SC.Application`.  You can 
// either use `SC.Application` as-is, like we do here, or you can customize 
// or even subclass it as needed.
//
SC.Application.create(); // It automatically assigns itself to `SC.app`.

// You should create a namespace for the classes and global objects defined 
// by your application.  In this case, we'll call it `MyApp`.
var MyApp;
MyApp = global.MyApp = SC.Object.create({
  name: "My App"
});

// You'll need to create at least one surface that defines your user 
// interface.  In Blossom, "surfaces" are what are visible in the viewport, 
// so to draw any user interface widgets into the viewport like buttons and 
// checkboxes, you'll need a surface to draw them into and receive events 
// from.

// The surface that hosts widgets and layers in Blossom is called 
// `SC.View`. We'll create one and assign it to the `ui` property inside our 
// `MyApp` namespace.
MyApp.ui = SC.View.create();

// Next you'll want to create a widget you can add to your `SC.View` surface 
// instance. Widgets are a subclass of `SC.Layer` that provide their own 
// behavior and event handling.  In this case, we're creating a custom 
// widget.
MyApp.widget = SC.Widget.create({

  // This configures the location and size of our widget within its 
  // superlayer (or if it has none, it's surface).  Here, we're telling 
  // Blossom we want a widget that is 500px by 500px, and offset zero pixels 
  // from the center of its superlayer (or surface, if it doesn't have a 
  // superlayer).
  layout: { width: 500, height: 500, centerX: 0, centerY: 0 },

  // These methods are automatically be invoked by Blossom when the mouse 
  // moves over the widget, leaves the widget, or is pressed.
  //
  // Note: since Blossom is still pre-release, we'll cheat and manipulate 
  // the `document` object directly to show a cursor.  In a future 
  // release of Blossom, this will be replace by a cross-platform 
  // function that works outside the browser.
  mouseDown:    function(evt) { alert("You clicked the green widget!"); },
  mouseEntered: function(evt) { document.body.style.cursor = 'pointer'; },
  mouseExited:  function(evt) { document.body.style.cursor = 'default'; },

  // This method is called when the layer needs to be re-cached, in the 
  // process of being composited into the `SC.View` surface. The `context` 
  // parameter is a `CanvasRenderingContext2D` object. See 
  // http://www.w3.org/TR/2dcontext/ for information on the drawing functions 
  // that are available.  This API is compatible with all platforms supported 
  // by Blossom, including the native runtimes.
  render: function(ctx) {
    ctx.fillStyle = '#859900'; // green
    ctx.fillRect(0, 0, ctx.width, ctx.height);
  }
});

// The `main()` function is called by Blossom when your app is ready to begin 
// running. You'll want to set your app's `ui` in this function.
function main() {
  var ui = MyApp.ui,
      widget = MyApp.widget;

  // SC.View initially has no layers, so you'll add your widget to your 
  // view's layers so it can display itself and receive events.
  ui.get('layers').pushObject(widget);

  // Next, you'll tell `SC.app` that you want your `SC.View` surface to 
  // become the app's user interface ('ui').  Each app has only one active 
  // `ui` surface, though you can change it at any time.
  SC.app.set('ui', ui);

  // You can also add arbitary surfaces to the application using 
  // `SC.app.addSurface(...)`, but this is for a more advanced tutorial.
}
