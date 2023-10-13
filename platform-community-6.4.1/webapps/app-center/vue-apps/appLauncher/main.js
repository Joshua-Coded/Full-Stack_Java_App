
/*
 * This file is part of the Meeds project (https://meeds.io/).
 * Copyright (C) 2020 Meeds Association
 * contact@meeds.io
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import './initComponents.js';

//should expose the locale ressources as REST API
const appId = 'appLauncher';

export function init() {
  const lang = eXo && eXo.env && eXo.env.portal && eXo.env.portal.language || 'en';
  const url = `${eXo.env.portal.context}/${eXo.env.portal.rest}/i18n/bundle/locale.addon.appcenter-${lang}.json`;
  //getting locale ressources
  const i18nPromise = exoi18n.loadLanguageAsync(lang, url);
  Vue.createApp({
    data: {
      i18nPromise: i18nPromise,
    },
    template: `<app-center-launcher-drawer id="${appId}" :i18n-promise="i18nPromise" />`,
    vuetify: Vue.prototype.vuetifyOptions,
    i18n: exoi18n.i18n,
  }, `#${appId}`, 'Application Center Drawer');
}
