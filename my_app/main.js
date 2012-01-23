function main() {
  console.log('main() called');
  var pane = SC.Pane.create({
    layout: { top: 10, left: 10, width: 100, height: 100 },

    render: function(context) {
      context.fillStyle = 'red';
      context.fillRect(0,0,context.width, context.height);
    }
  });

  pane.attach();
}