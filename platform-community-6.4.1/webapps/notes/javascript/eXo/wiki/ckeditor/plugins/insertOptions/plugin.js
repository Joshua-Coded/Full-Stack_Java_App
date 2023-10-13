CKEDITOR.plugins.add( 'insertOptions', {

  // Register the icons. They must match command names.
  icons: 'insertOptions',
  lang : ['en','fr'],

  // The plugin initialization logic goes inside this method.
  init: function( editor ) {

    editor.addCommand( 'insertOptions', {

      // Define the function that will be fired when the command is executed.
      exec: function( editor ) {
        document.dispatchEvent(new CustomEvent('note-custom-plugins'));
      }
    });

    // Create the toolbar button that executes the above command.
    editor.ui.addButton( 'InsertOptions', {
      label: editor.lang.insertOptions.buttonTooltip,
      command: 'insertOptions',
      toolbar: 'insert'
    });
  }
});