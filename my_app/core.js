// Welcome to the Blossom test project. This shows how to get a basic Blossom 
// application up and running with a minimum of code.  Please be sure to read 
// the README so that Blossom is installed correctly via `npm`, the Node 
// Package Manager.  Now, on to the code!

// Every Blossom app needs exactly one instance of `SC.Application`.  You can 
// either use `SC.Application` as-is, like we do here, or you can customize 
// or even subclass it as needed.
//
// In general, you probably *don't* want to use `SC.app` as the namespace for 
// your app's classes and objects. Instead, do something like:
//
//     var NS = global.NS = SC.Object.create(...); // Make `NS` our namespace.
//     NS.Record = SC.Record.extend(...);
//
SC.Application.create(); // It automatically assigns itself to `SC.app`.

// This function is called by Blossom when your app is ready to begin running.
function main() {

  // Create a view surface for our user interface, with `contentView` set to
  // a custom subclass of `SC.View` that draws itself green.  In Blossom, 
  // "surfaces" are what are visible in the viewport, so you need to host a
  // view tree in a surface, in this case, an `SC.ViewSurface`, in order to 
  // actually display the view tree and receive events.
  var ui = SC.ViewSurface.create({

    // This configures the location and size of our surface within the 
    // viewport managed by `SC.Application`.  Here, we're telling Blossom to 
    // fill the entire viewport with the surface.
    layout: { top: 0, left: 0, right: 0, bottom: 0 },

    // `SC.ViewSurface` hosts an `SC.View` tree, with `contentView` as the 
    // root view in the tree.  To add additional views, make them 
    // `childViews` of the `contentView`.
    contentView: SC.View.extend({

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
      //  release of Blossom, this will be replace by a cross-platform 
      // function that works outside the browser.
      mouseDown:    function(evt) { alert("You clicked the green view!"); },
      mouseEntered: function(evt) { document.body.style.cursor = 'pointer'; },
      mouseExited:  function(evt) { document.body.style.cursor = 'default'; },

      // This method is called when our view's layer needs to be re-cached, 
      // in the process of being renderered to the view surface. The 
      // `context` parameter is a CanvasRenderingContext2D. See 
      // http://www.w3.org/TR/2dcontext/ for information on the drawing
      // functions that are available.  This API is compatible with all 
      // platforms supported by Blossom, including the native runtimes.
      render: function(context, layer) {
        context.fillStyle = '#859900'; // green
        context.fillRect(0,0,context.width, context.height);
      }
    })
  });

  // Tell `SC.app` that we want our `ui` surface to becomes the app's user 
  // interface ('ui').  Each app has only one active `ui` surface, though you 
  // can change the global `ui` at any time.
  //
  // You can also add arbitary surfaces to the application using 
  // `SC.app.addSurface(...)`, but this is for a more advanced tutorial.
  SC.app.set('ui', ui);
}
