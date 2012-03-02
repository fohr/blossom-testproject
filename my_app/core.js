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

// In general, you probably *don't* want to use `SC.app` as the namespace for 
// your app's classes and objects. Instead, do something like:
//
//     var NS = global.NS = SC.Object.create(...); // Make `NS` our namespace.
//     NS.Record = SC.Record.extend(...);
//
var MyApp;
MyApp = global.MyApp = SC.Object.create({
  name: "My App"
});

// Create a view surface for our user interface, with `contentView` set to
// a custom subclass of `SC.View` that draws itself green.  In Blossom, 
// "surfaces" are what are visible in the viewport, so you need to host a
// view tree in a surface, in this case, an `SC.ViewSurface`, in order to 
// actually display the view tree and receive events.
MyApp.ui = SC.View.create();

MyApp.widget = SC.Widget.create({

  // This configures the location and size of our view's drawing layer 
  // within its surface.  Here, we're telling Blossom we want a view that 
  // is 500px by 500px, and offset zero pixels from the center of its
  // parent (in this case, the surface is its parent).
  layout: { width: 500, height: 500, centerX: 0, centerY: 0 },

  // These methods are automatically be invoked by Blossom when the mouse 
  // moves over the view, leaves the view, or is pressed.
  //
  // Note: since Blossom is still pre-beta, we'll cheat and manipulate 
  // the `document` object directly to show a cursor.  In a future 
  // release of Blossom, this will be replace by a cross-platform 
  // function that works outside the browser.
  mouseDown:    function(evt) { alert("You clicked the green widget!"); },
  mouseEntered: function(evt) { document.body.style.cursor = 'pointer'; },
  mouseExited:  function(evt) { document.body.style.cursor = 'default'; },

  // This method is called when our view's layer needs to be re-cached, 
  // in the process of being renderered to the view surface. The 
  // `context` parameter is a CanvasRenderingContext2D. See 
  // http://www.w3.org/TR/2dcontext/ for information on the drawing
  // functions that are available.  This API is compatible with all 
  // platforms supported by Blossom, including the native runtimes.
  render: function(ctx) {
    ctx.fillStyle = '#859900'; // green
    ctx.fillRect(0, 0, ctx.width, ctx.height);
  }
});

// This function is called by Blossom when your app is ready to begin running.
function main() {
  var ui = MyApp.ui,
      widget = MyApp.widget;

  // Add the widget to our view's layers.  (Widgets are layers with event 
  // handling behavior.)
  ui.get('layers').pushObject(widget);

  // Tell `SC.app` that we want our `ui` surface to becomes the app's user 
  // interface ('ui').  Each app has only one active `ui` surface, though you 
  // can change the global `ui` at any time.
  //
  // You can also add arbitary surfaces to the application using 
  // `SC.app.addSurface(...)`, but this is for a more advanced tutorial.
  SC.app.set('ui', ui);
}
