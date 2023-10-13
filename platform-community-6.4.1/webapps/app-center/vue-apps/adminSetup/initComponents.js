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
 
import ExoAppCenterModal from './components/modal/ExoAppCenterModal.vue';
import AdminSetupGeneralParams from './components/AdminSetupGeneralParams.vue';
import AdminSetupList from './components/AdminSetupList.vue';
import ApplicationFormDrawer from './components/drawer/ApplicationFormDrawer.vue';
import ExoSuggester from './components/suggester/ExoSuggester.vue';
import AdminSetupApp from './components/AdminSetup.vue';

const components = {
  'adminSetup-generalParams': AdminSetupGeneralParams,
  'adminSetup-list': AdminSetupList,
  'app-center-modal': ExoAppCenterModal,
  'app-center-form-drawer': ApplicationFormDrawer,
  'app-center-suggester': ExoSuggester,
  'app-center-admin-setup': AdminSetupApp,
};

for (const key in components) {
  Vue.component(key, components[key]);
}
