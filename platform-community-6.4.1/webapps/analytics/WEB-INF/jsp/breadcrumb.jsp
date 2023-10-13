<%
/**
 * This file is part of the Meeds project (https://meeds.io/).
 * Copyright (C) 2022 Meeds Association
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
%>
<%@ page import="org.exoplatform.portal.webui.util.Util"%>
<%@ page import="org.exoplatform.portal.webui.portal.UIPortal"%>

<%
  UIPortal currentPortal = Util.getUIPortal();
  String currentURI = currentPortal.getSiteKey().getTypeName() + "/" + currentPortal.getSiteKey().getName() + "/" + currentPortal.getSelectedUserNode().getURI();
  String cacheId = "analyticsDashboardBreadcrumb/" + currentURI;
%>
<div class="VuetifyApp">
  <div data-app="true"
    class="v-application v-application--is-ltr theme--light"
    id="analyticsDashboardBreadcrumb">
    <v-cacheable-dom-app cache-id="<%=cacheId%>"></v-cacheable-dom-app>
    <script type="text/javascript">
            require(['PORTLET/analytics/AnalyticsDashboardBreadcrumb'], app => app.init('<%=cacheId%>'));
    </script>                                                                                   
  </div>
</div>
