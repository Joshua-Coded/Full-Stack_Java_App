export function init() {
  extensionRegistry.registerExtension('engagementCenterActions', 'user-actions', {
    type: 'note',
    options: {
      rank: 70,
      icon: 'fas fa-clipboard',
      match: (actionLabel) => ['addWikiPage', 'updateWikiPage'].includes(actionLabel),
      getLabel: () => ''
    },
  });
}