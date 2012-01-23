/*globals global require __dirname BT */

require('blossom/buildtools'); // adds the SC and BT namespaces as globals

var path = require('path');

var project = BT.Project.create({
  "app": BT.App.create({
    frameworks: 'blossom'.w(),
    // frameworks: 'foundation datastore application'.w(),
    sourceTree: path.join(__dirname, 'my_app')
  }),
  "blossom": require('blossom')
  // "foundation": require('blossom/foundation'),
  // "datastore": require('blossom/datastore'),
  // "application": require('blossom/application')
});

// project.accept(BT.LoggingVisitor.create());

BT.Server.create({
  project: project
});
