'use strict';
( function() {

var childContainer = '<div id="note-children-container" class="navigation-img-wrapper" contenteditable="false"><figure class="image-navigation" contenteditable="false">'
  +'<img src="/notes/images/children.png" role="presentation"/><img src="/notes/images/trash.png" id="remove-treeview" alt="remove treeview"/>'
  +'<figcaption class="note-navigation-label">Navigation</figcaption></figure></div><p></p>';

CKEDITOR.plugins.add( 'toc', {

  icons: 'toc',

  init: function( editor ) {

    var pluginDirectory = this.path;
    editor.addContentsCss(pluginDirectory + 'toc.css');

    editor.addCommand( 'ToC', {

      exec: function( editor) {
         const childrenWrapper = editor.document.getById( 'note-children-container' );
          if (childrenWrapper) {
            document.dispatchEvent(new CustomEvent('note-navigation-plugin'));
          } else {
            editor.insertHtml( childContainer );
          }
      }
    });
  }
});

} )();

