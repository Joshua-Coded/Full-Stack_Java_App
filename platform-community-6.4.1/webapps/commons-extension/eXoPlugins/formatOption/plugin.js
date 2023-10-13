CKEDITOR.plugins.add( 'formatOption', {

  // Register the icons. They must match command names.
  icons: 'formatOption',
  lang : ['en','fr'],

  init: function( editor ) {
    editor.addCommand('formatOption', {
      exec: function() {
        const toolbarWrapper = document.getElementsByClassName("cke_toolgroup");
        toolbarWrapper[0].classList.toggle("fullToolbar");
        if (toolbarWrapper[0].classList.contains('fullToolbar')) {
          document.dispatchEvent(new CustomEvent('editors-options-opened', {detail: 'displayFormatOptions'} ));
        } else {
          document.dispatchEvent(new CustomEvent('editors-options-opened', {detail: 'displayRichOptions'} ));
        }
      }
    });

    // Create the toolbar button that executes the above command.
    editor.ui.addButton( 'formatOption', {
      label: editor.lang.formatOption.buttonTooltip,
      command: 'formatOption',
      toolbar: 'insert'
    });
  }
});