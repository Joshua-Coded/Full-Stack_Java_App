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
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<portlet:defineObjects />

<portlet:resourceURL var="retrieveSettingsURL">
    <portlet:param name="operation" value="GET_SETTINGS"/>
</portlet:resourceURL>
<portlet:resourceURL var="retrieveMappingsURL">
    <portlet:param name="operation" value="GET_MAPPINGS"/>
</portlet:resourceURL>
<portlet:resourceURL var="retrieveFiltersURL">
    <portlet:param name="operation" value="GET_FILTERS"/>
</portlet:resourceURL>
<portlet:resourceURL var="retrieveTableDataURL">
    <portlet:param name="operation" value="GET_DATA"/>
</portlet:resourceURL>
<portlet:resourceURL var="retrieveFieldValuesURL">
    <portlet:param name="operation" value="GET_FIELD_VALUES"/>
</portlet:resourceURL>
<portlet:actionURL var="saveSettingsURL" />

<div class="VuetifyApp">
    <% int generatedId = (int) (Math.random() * 1000000l); %>
    <div class="analytics-table-parent"
         id="analytics-<%= generatedId %>"
         data-id="<%= generatedId %>"
         data-settings-url="<%=retrieveSettingsURL%>"
         data-mappings-url="<%=retrieveMappingsURL%>"
         data-filters-url="<%=retrieveFiltersURL%>"
         data-table-data-url="<%=retrieveTableDataURL%>"
         data-field-values-url="<%=retrieveFieldValuesURL%>"
         data-save-settings-url="<%=saveSettingsURL%>">
    </div>
    <script type="text/javascript">
        require(['PORTLET/analytics/AnalyticsTablePortlet'], app => app.init('analytics-<%= generatedId %>'));
    </script>
</div>