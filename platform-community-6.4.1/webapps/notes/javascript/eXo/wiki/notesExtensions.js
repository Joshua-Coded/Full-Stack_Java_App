export function initNotesExtensions() {
  extensionRegistry.registerExtension('activity', 'type', {
    type: 'ks-wiki:spaces',
    options: {
      name: 'notes',
      canEdit: () => false,
      supportsThumbnail: true,
      useSameViewForMobile: true,
      thumbnailProperties: {
        height: '90px',
        width: '90px',
        noBorder: true,
      },
      getThumbnail: () => '/notes/images/wiki.png',
      getTitle: activity => activity && activity.title || '',
      getSummary: (activity) => activity.templateParams
        && Vue.prototype.$utils.htmlToText(activity.templateParams.page_exceprt),
      getSourceLink: (activity) => {
        try {
          const templateParams = activity.templateParams || {};
          if (templateParams.page_type === 'group' && activity.activityStream && activity.activityStream.space) {
            return `${templateParams.page_url}`;
          } else if (templateParams.page_type === 'portal') {
            return `${eXo.env.portal.context}/${templateParams.page_owner}/wiki/${templateParams.page_id}`;
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('It seems that notes URL building is compromised. The activity will be displayed anyway with empty link', e);
        }
        return '#';
      },
      canShare: () => true,
    },
  });
  extensionRegistry.registerComponent('favorite-notes', 'favorite-drawer-item', {
    id: 'notes',
    vueComponent: Vue.options.components['notes-favorite-item'],
  });
}