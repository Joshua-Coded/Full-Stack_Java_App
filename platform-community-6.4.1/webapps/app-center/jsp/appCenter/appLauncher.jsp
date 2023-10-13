<!--
This file is part of the Meeds project (https://meeds.io/).
Copyright (C) 2022 Meeds Association
contact@meeds.io
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.
You should have received a copy of the GNU Lesser General Public License
along with this program; if not, write to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
-->

<%@page import="java.util.Locale"%>
<%@page import="org.exoplatform.container.ExoContainerContext"%>
<%@page import="org.exoplatform.services.resources.ResourceBundleService"%>
<%@page import="java.util.ResourceBundle"%>
<%
  ResourceBundle bundle;
  try {
    bundle = ExoContainerContext.getService(ResourceBundleService.class).getResourceBundle("locale.addon.appcenter", request.getLocale());
  } catch (Exception e) {
    bundle = ExoContainerContext.getService(ResourceBundleService.class).getResourceBundle("locale.addon.appcenter", Locale.ENGLISH);
  }
  String tooltip = bundle.getString("appCenter.appLauncher.topbarIcon.tooltip");
%>
<div class="VuetifyApp">
  <div
    data-app="true"
    class="v-application v-application--is-ltr theme--light"
    id="appLauncher">
    <div class="v-application--wrap">
      <div class="container px-0 py-0">
        <div class="layout transparent">
          <button
            type="button"
            title="<%=tooltip%>"
            class="text-xs-center v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default"
            id="appcenterLauncherButton"
            onclick="Vue.startApp('SHARED/appLauncherBundle', 'init')">
            <span class="v-btn__content"><i aria-hidden="true"
              class="v-icon notranslate appCenterLauncherButtonIcon mdi mdi-dots-grid icon-large-size icon-default-color theme--light"></i></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>