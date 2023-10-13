CKEDITOR.plugins.add( 'switchView', {

    // Register the icons. They must match command names.
    icons: 'switchView',
    lang : ['en','fr'],

    // The plugin initialization logic goes inside this method.
    init: function( editor ) {

        editor.addCommand( 'switchView', {

            // Define the function that will be fired when the command is executed.
            exec: function( editor ) {
                document.dispatchEvent(new CustomEvent('switch-view-plugins'));
            }
        });

        // Create the toolbar button that executes the above command.
        editor.ui.addButton( 'switchView', {
            label: editor.lang.switchView.buttonTooltip,
            command: 'switchView',
            toolbar: 'switchView'
        });
    }
});
