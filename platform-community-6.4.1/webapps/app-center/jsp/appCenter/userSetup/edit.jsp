<!--
This file is part of the Meeds project (https://meeds.io/).
Copyright (C) 2020 Meeds Association
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
<%@ page import="javax.portlet.PortletURL" %>
<%@ page import="javax.portlet.PortletMode" %>
<%@ page import="javax.portlet.PortletPreferences" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>
<%@ page import="java.util.ResourceBundle"%>

<portlet:defineObjects/>
<%
    ResourceBundle resource = portletConfig.getResourceBundle(renderRequest.getLocale());


	PortletURL actionURL = renderResponse.createActionURL();
	PortletPreferences preferences = renderRequest.getPreferences();
	String pageSize = renderRequest.getParameter("pageSize");
	if (pageSize == null) {
		pageSize = preferences.getValue("pageSize", "");
		if (pageSize == null) {
			pageSize = "";
		}
	}
%>

<div class="editpref-form UIFormWithTitle">
	<form class="formLogin" action="<%=actionURL%>" method="post">
		<div class="uiContentBox">
			<div class="form-horizontal">
				<div class="control-group">
					<label class="control-label portlet-form-label">
						<%=resource.getString("appCenter.editpref.form.pageSize")%>
					</label>
					<div class="controls portlet-input-field">
						<input name="pageSize" type="text" value="<%=pageSize%>">
					</div>
				</div>
			</div>
			<div class="uiAction uiActionBorder">
				<button type="submit" class="btn"><%=resource.getString("appCenter.editpref.form.save")%></button>
			</div>
		</div>
	</form>
</div>
