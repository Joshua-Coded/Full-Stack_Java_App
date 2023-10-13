export const notesConstants = {
  ENV: eXo.env.portal || '',
  PORTAL: eXo.env.portal.context || '',
  PORTAL_NAME: eXo.env.portal.portalName || '',
  PORTAL_CONTEXT: eXo.env.portal.context,
  PORTAL_BASE_URL: eXo.env.server.portalBaseURL || '',
  PORTAL_REST: eXo.env.portal.rest,
  CONTAINER_NAME: eXo.env.portal.containerName || '',
  LANG: eXo.env.portal.language,
  NOTES_PAGE_NAME: '/wiki'
};