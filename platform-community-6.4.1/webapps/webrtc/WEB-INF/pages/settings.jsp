<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>

<%
  Map<String, String> messages = (Map<String, String>) request.getAttribute("messages");
%>

<div class="uiPopup settingsForm form-horizontal">
	<div class="popupHeader ClearFix">
		<a aria-hidden="true" class="uiIconClose pull-right">&nbsp;</a> <span class="PopupTitle popupTitle">${messages["webrtc.admin.title"]}</span>
	</div>

	<div class="alert alert-error" id="" style="display: none;">
		<i class="uiIconError"></i><span class="errorMessage"></span>
	</div>

	<div class="alert alert-warning no-server-warning">
		${messages["webrtc.admin.serversTip"]}
	</div>

	<div class="popupContent">
		<p class="title">${messages["webrtc.admin.servers"]}&nbsp;&nbsp;<i class="uiIconInformation uiIconBlue" data-placement="top"
				data-toggle="tooltip" title="${messages["webrtc.admin.serversTip"]}"></i>
		</p>

		<div class="iceServers">
			<div class="noServer" style="display: none">
				<span>${messages["webrtc.admin.noServer"]}</span>&nbsp;&nbsp;&nbsp;<i class="uiIconPlus uiIconLightGray" data-placement="top" data-toggle="tooltip" title="${messages["webrtc.admin.addNewServer"]}"></i>
			</div>
			<div class="control-group iceServer" style="display: none;">
				<label class="control-label" for="url">${messages["webrtc.admin.url"]} :</label>
				<div class="urlsGroup">
					<div class="control-group urlGroup">
						<input name="url" placeholder="${messages["webrtc.admin.serverUrl"]}" type="text" />
						<div class="actions-container">
							<i class="uiIconTrash uiIconLightGray" data-placement="top" data-toggle="tooltip" title="${messages["webrtc.admin.removeServer"]}"></i> <i
								class="uiIconPlus uiIconLightGray" data-placement="top" data-toggle="tooltip" title="${messages["webrtc.admin.addNewServer"]}"></i>
						</div>
					</div>
					<div class="credentialsGroup">
						<div class="enabler">
							<div class="control-group">
								<span class="uiCheckbox"> <input type="checkbox" class="checkbox"> <span>${messages["webrtc.admin.credentials"]}</span>
								</span>
							</div>
						</div>
						<div class="credentials" style="display: none;">
							<div class="control-group">
								<label class="control-label" for="username">${messages["webrtc.admin.username"]}</label>
								<div class="controls">
									<input name="username" type="text" placeholder="${messages["webrtc.admin.username"]}...">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="credential">${messages["webrtc.admin.credential"]}</label>
								<div class="controls">
									<input name="credential" type="password" placeholder="${messages["webrtc.admin.credential"]}...">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<p class="title">${messages["webrtc.admin.errorDiagnostic"]}</p>
		<div class="diagnostic-errors">
			<div class="control-group">
				<span class="uiCheckbox"> <input type="checkbox" class="checkbox"> <span>${messages["webrtc.admin.enableLogCollection"]}</span>&nbsp;&nbsp;
					<i class="uiIconInformation uiIconBlue" data-container=".diagnostic-errors" data-placement="top" data-toggle="tooltip"
					title="${messages["webrtc.admin.logCollectionInfo"]}"></i>
				</span>
			</div>
		</div>
	</div>

	<div class="uiAction">
		<button class="btn saveButton" type="button">${messages["webrtc.admin.save"]}</button>
		<button class="btn cancelButton" type="button">${messages["webrtc.admin.cancel"]}</button>
	</div>
</div>

<%-- Confirmation popup --%>
<div class="uiPopup serverRemovalDialog" style="display: none;">
	<div class="popupHeader ClearFix">
		<a class="uiIconClose pull-right" aria-hidden="true"></a> <span class="PopupTitle popupTitle">${messages["webrtc.admin.confirmServerRemoval"]}</span>
	</div>
	<div class="popupContent">
		<ul class="singleMessage popupMessage">
			<li><span class="confirmationIcon contentMessage">${messages["webrtc.admin.serverRemoveText"]}</span></li>
		</ul>
		<div class="uiAction uiActionBorder">
			<button class="btn removeButton" type="button">${messages["webrtc.admin.remove"]}</button>
			<button class="btn cancelButton" type="button">${messages["webrtc.admin.cancel"]}</button>
		</div>
	</div>
</div>
