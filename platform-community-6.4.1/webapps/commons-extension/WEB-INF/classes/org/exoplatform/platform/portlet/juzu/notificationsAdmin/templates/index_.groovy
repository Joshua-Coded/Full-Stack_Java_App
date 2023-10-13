package org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates;
; def closure0 = { ; } as juzu.template.Renderable;out.renderContext.renderTag('juzu.impl.tags.ParamTag',closure0,["name":"senderName".toString()]);;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s0);
; def closure1 = { ; } as juzu.template.Renderable;out.renderContext.renderTag('juzu.impl.tags.ParamTag',closure1,["name":"senderEmail".toString()]);;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s1);
; def closure2 = { ; } as juzu.template.Renderable;out.renderContext.renderTag('juzu.impl.tags.ParamTag',closure2,["name":"_ctx".toString()]);;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s2);
; def closure3 = { ; } as juzu.template.Renderable;out.renderContext.renderTag('juzu.impl.tags.ParamTag',closure3,["name":"groups".toString()]);;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s3);
; def closure4 = { ; } as juzu.template.Renderable;out.renderContext.renderTag('juzu.impl.tags.ParamTag',closure4,["name":"channels".toString()]);;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s4);

  def pluginService = org.exoplatform.container.ExoContainerContext.getService(org.exoplatform.commons.api.notification.service.setting.PluginSettingService.class);

;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s5);
;out.print("${_ctx.appRes("NotificationAdmin.title")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s6);
;out.print("${_ctx.appRes("NotificationAdmin.label.notificationTypes")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s7);
;out.print("${_ctx.appRes("NotificationAdmin.label.notification")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s8);
;out.print("${_ctx.appRes("NotificationAdmin.label.title")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s9);
;out.print("${_ctx.appRes("NotificationAdmin.label.Enable")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s10);
 for(def group : groups) {
	    	List pluginInfos = group.getPluginInfos();
	    	if(pluginInfos == null || pluginInfos.size() == 0) {
			    continue;
			  }
	  
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s11);
;out.print("${_ctx.pluginRes(group.getResourceBundleKey(), group.getGroupId())}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s12);
 for (def pluginInfo : pluginInfos) {
	      	 String pluginId = pluginInfo.getType();
	    
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s13);
;out.print("${pluginId}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s14);
;out.print("${_ctx.pluginRes(pluginInfo.getResourceBundleKey(), pluginId)}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s15);
;out.print("${_ctx.pluginRes("UINotification.title." + pluginId, pluginId)}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s16);
;out.print("${pluginId}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s17);

			          String clazz = "hide";
		            int i = 0;
								for(channelId in channels) {
								  String channelKey = _ctx.getChannelKey(channelId);
								  String status = "";
								  if(!pluginService.isAllowed(channelId, pluginId)) {
								    ++i;
                    continue;
								  }
								  if(!pluginService.isActive(channelId, pluginId)) {
								    status = "hide";
								    ++i;
								  }
								
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s18);
;out.print("${channelId}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s19);
;out.print("${status}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s20);
;out.print("${_ctx.capitalizeFirstLetter(channelKey)}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s21);
;out.print("${_ctx.appRes("NotificationAdmin.label.channel." + channelKey)}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s22);

								}
			          if(i == channels.size) {
			            clazz = "";
			          }
			        
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s23);
;out.print("${clazz}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s24);
;out.print("${_ctx.appRes("NotificationAdmin.label.NoNotifications")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s25);

		            for(channelId in channels) {
		              String channelKey = _ctx.getChannelKey(channelId);
		              String checkboxName = channelId + pluginId;
                  if(!pluginService.isAllowed(channelId, pluginId)) {
                    continue;
                  }
		          
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s26);
 if (pluginService.isActive(channelId, pluginId))  { 
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s27);
;out.print("${channelId}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s28);
;out.print("${checkboxName}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s29);
;out.print("${checkboxName}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s30);
 } else { 
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s31);
;out.print("${channelId}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s32);
;out.print("${checkboxName}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s33);
;out.print("${checkboxName}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s34);
 } 
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s35);
;out.print("${_ctx.appRes("NotificationAdmin.label.channel." + channelKey)}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s36);

		          }
		          
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s37);
;out.print("${pluginId}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s38);
;out.print("${pluginId}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s39);
;out.print("${_ctx.appRes('NotificationAdmin.label.save')}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s40);
 } 
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s41);
 } 
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s42);
;out.print("${_ctx.appRes("NotificationAdmin.label.notificationsSender")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s43);
;out.print("${_ctx.appRes("NotificationAdmin.label.sender.name")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s44);
;out.print("${senderName}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s45);
;out.print("${_ctx.appRes("NotificationAdmin.label.sender.address")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s46);
;out.print("${senderEmail}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s47);
;out.print("${_ctx.appRes('NotificationAdmin.label.save')}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s48);
;out.print("${_ctx.appRes("NotificationAdmin.label.Enable")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s49);
;out.print("${_ctx.appRes("NotificationAdmin.label.Disable")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s50);
;out.print("${_ctx.appRes("NotificationAdmin.label.mail")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s51);
;out.print("${_ctx.appRes("NotificationAdmin.label.web")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s52);
;out.print("${_ctx.appRes("NotificationAdmin.label.OK")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s53);
;out.print("${_ctx.appRes("NotificationAdmin.label.Information")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s54);
;out.print("${_ctx.appRes("NotificationAdmin.label.Error")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s55);
;out.print("${_ctx.appRes("NotificationAdmin.msg.saveOK")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s56);
;out.print("${_ctx.appRes("NotificationAdmin.msg.saveKO")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s57);
;out.print("${_ctx.appRes("NotificationAdmin.msg.invalidName")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s58);
;out.print("${_ctx.appRes("NotificationAdmin.msg.invalidEmail")}");
;out.print(org.exoplatform.platform.portlet.juzu.notificationsAdmin.templates.Cindex.s59);

public class Cindex
{
public static final String s0 = '\n';
public static final String s1 = '\n';
public static final String s2 = '\n';
public static final String s3 = '\n';
public static final String s4 = '\n';
public static final String s5 = '\n<div id="notificationAdmin" class="uiNotificationAdmin">\n	<h3 class="mgB20">';
public static final String s6 = '</h3>\n\n	<h4 class="titleWithBorder mgB20">';
public static final String s7 = '</h4>\n	<table class="uiGrid table  table-hover table-striped">\n	  <thead>\n	    <tr>\n	      	<th>';
public static final String s8 = '</th>\n	      	<th>';
public static final String s9 = '</th>\n			<th>';
public static final String s10 = '</th>\n	    </tr>\n	  </thead>\n	  <tbody>\n	  ';
public static final String s11 = '\n	    <tr>\n	       <td class="group-title"><strong>';
public static final String s12 = '</strong></td>\n	       <td></td>\n	       <td></td>\n	    </tr>\n\n	    ';
public static final String s13 = '\n      <tr>\n        <td class="left">\n          <label for="';
public static final String s14 = '">';
public static final String s15 = '</label>\n        </td>\n        <td class="left">\n          ';
public static final String s16 = '\n        </td>\n        <td class="left">\n          <div id="';
public static final String s17 = '" class="plugin-container clearfix view">\n            <div class="left-view pull-left">\n			        <div class="view-mode">\n			        ';
public static final String s18 = '\n				           <div class="';
public static final String s19 = ' ';
public static final String s20 = '"><i class="uiIconPLF';
public static final String s21 = '"></i> ';
public static final String s22 = '</div>\n								';
public static final String s23 = '\n			         <span class="';
public static final String s24 = '"><i>';
public static final String s25 = '</i></span>\n							</div>\n							<div class="edit-mode">\n		          ';
public static final String s26 = '\n			          <div>\n			            <label class="uiCheckbox">\n			          ';
public static final String s27 = '\n			              <input type="checkbox" class="checkbox" data-channel="';
public static final String s28 = '" checked="checked" name="';
public static final String s29 = '" id="';
public static final String s30 = '"/>\n			          ';
public static final String s31 = '\n			              <input type="checkbox" class="checkbox" data-channel="';
public static final String s32 = '" name="';
public static final String s33 = '" id="';
public static final String s34 = '"/>\n			          ';
public static final String s35 = '\n			              <span>';
public static final String s36 = '</span>\n			            </label>\n			          </div>\n		          ';
public static final String s37 = '\n		          </div>\n		        </div>\n\n		        <div class="right-view pull-right">\n						  <button id="btAction';
public static final String s38 = '" data-plugin="';
public static final String s39 = '" class="btn btn-primary save-setting">';
public static final String s40 = '</button>\n						  <a href="javascript:void(0);" class="edit-setting actionIcon"><i class="uiIconEdit uiIconLightGray"></i></a>\n						</div>\n				  </div>\n				</td>\n      </tr>\n	    ';
public static final String s41 = '\n	  ';
public static final String s42 = '\n	  </tbody>\n	</table>\n	<div id="confirmMessage" style="display:none">\n	<i class="uiIconSuccess"></i><span class="message"></span>\n	</div>\n	<form id="senderForm" class="senderForm">\n    <h4 class="titleWithBorder mgB20">';
public static final String s43 = '</h4>\n    <div class="control-groups clearfix">\n      <label for="senderName" class="pull-left"> ';
public static final String s44 = ':&nbsp;</label>\n      <div class="pull-left mgR20">\n        <input id="senderName" name="name" type="text" value="';
public static final String s45 = '" placeholder="Name"/>&nbsp;&nbsp;\n      </div>\n      <label for="senderEmail" class="pull-left">';
public static final String s46 = ':&nbsp;</label>\n      <div class="pull-left mgR20">\n        <input id="senderEmail" class="right" type="text" name="email" value="';
public static final String s47 = '" placeholder="Email"/>&nbsp;\n      </div>\n      <input id="btSetSender" class="btn btn-primary" type="button" value="';
public static final String s48 = '"/>\n    </div>\n  </form>\n\n	<div style="display:none;" id="labelBundle">\n		<span id="labelEnable">';
public static final String s49 = '</span>\n		<span id="labelDisable">';
public static final String s50 = '</span>\n		<span id="labelEmailNotifications">';
public static final String s51 = '</span>\n		<span id="labelIntranetNotifications">';
public static final String s52 = '</span>\n		<span id="labelOK">';
public static final String s53 = '</span>\n		<span id="Information">';
public static final String s54 = '</span>\n		<span id="Error">';
public static final String s55 = '</span>\n		<span id="msgSaveOK">';
public static final String s56 = '</span>\n		<span id="msgSaveKO">';
public static final String s57 = '</span>\n		<span id="msgInvalidName">';
public static final String s58 = '</span>\n		<span id="msgInvalidEmail">';
public static final String s59 = '</span>\n	</div>\n\n</div>\n';
public static final Map<Integer, juzu.impl.template.spi.juzu.dialect.gtmpl.Foo> TABLE = [
128:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(79,120),'senderEmail'),
130:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(76,122),'_ctx.appRes(\'NotificationAdmin.label.save\')'),
132:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(40,127),'_ctx.appRes("NotificationAdmin.label.Enable")'),
134:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(41,128),'_ctx.appRes("NotificationAdmin.label.Disable")'),
7:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,6),''),
8:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,7),'  def pluginService = org.exoplatform.container.ExoContainerContext.getService(org.exoplatform.commons.api.notification.service.setting.PluginSettingService.class);'),
136:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(52,129),'_ctx.appRes("NotificationAdmin.label.mail")'),
9:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,8),''),
138:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(55,130),'_ctx.appRes("NotificationAdmin.label.web")'),
11:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(27,10),'_ctx.appRes("NotificationAdmin.title")'),
140:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(36,131),'_ctx.appRes("NotificationAdmin.label.OK")'),
13:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(43,12),'_ctx.appRes("NotificationAdmin.label.notificationTypes")'),
142:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(40,132),'_ctx.appRes("NotificationAdmin.label.Information")'),
15:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(21,16),'_ctx.appRes("NotificationAdmin.label.notification")'),
144:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(34,133),'_ctx.appRes("NotificationAdmin.label.Error")'),
17:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(21,17),'_ctx.appRes("NotificationAdmin.label.title")'),
146:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(38,134),'_ctx.appRes("NotificationAdmin.msg.saveOK")'),
19:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(29,18),'_ctx.appRes("NotificationAdmin.label.Enable")'),
148:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(38,135),'_ctx.appRes("NotificationAdmin.msg.saveKO")'),
21:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(11,22),' for(def group : groups) {'),
22:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,23),'	    	List pluginInfos = group.getPluginInfos();'),
150:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(43,136),'_ctx.appRes("NotificationAdmin.msg.invalidName")'),
23:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,24),'	    	if(pluginInfos == null || pluginInfos.size() == 0) {'),
24:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,25),'			    continue;'),
152:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(44,137),'_ctx.appRes("NotificationAdmin.msg.invalidEmail")'),
25:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,26),'			  }'),
26:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,27),'	  '),
28:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(48,29),'_ctx.pluginRes(group.getResourceBundleKey(), group.getGroupId())'),
30:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(13,34),' for (def pluginInfo : pluginInfos) {'),
31:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,35),'	      	 String pluginId = pluginInfo.getType();'),
32:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,36),'	    '),
34:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(23,39),'pluginId'),
36:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(36,39),'_ctx.pluginRes(pluginInfo.getResourceBundleKey(), pluginId)'),
38:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(11,42),'_ctx.pluginRes("UINotification.title." + pluginId, pluginId)'),
40:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(20,45),'pluginId'),
42:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(33,48),''),
43:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,49),'			          String clazz = "hide";'),
44:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,50),'		            int i = 0;'),
45:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,51),'								for(channelId in channels) {'),
46:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,52),'								  String channelKey = _ctx.getChannelKey(channelId);'),
47:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,53),'								  String status = "";'),
48:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,54),'								  if(!pluginService.isAllowed(channelId, pluginId)) {'),
49:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,55),'								    ++i;'),
50:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,56),'                    continue;'),
51:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,57),'								  }'),
52:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,58),'								  if(!pluginService.isActive(channelId, pluginId)) {'),
53:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,59),'								    status = "hide";'),
54:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,60),'								    ++i;'),
55:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,61),'								  }'),
56:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,62),'								'),
58:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(56,63),'channelId'),
60:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(69,63),'status'),
62:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(99,63),'_ctx.capitalizeFirstLetter(channelKey)'),
64:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(147,63),'_ctx.appRes("NotificationAdmin.label.channel." + channelKey)'),
66:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(65,64),''),
67:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,65),'								}'),
68:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,66),'			          if(i == channels.size) {'),
69:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,67),'			            clazz = "";'),
70:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,68),'			          }'),
71:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,69),'			        '),
73:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(47,70),'clazz'),
75:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(60,70),'_ctx.appRes("NotificationAdmin.label.NoNotifications")'),
77:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(27,73),''),
78:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,74),'		            for(channelId in channels) {'),
79:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,75),'		              String channelKey = _ctx.getChannelKey(channelId);'),
80:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,76),'		              String checkboxName = channelId + pluginId;'),
81:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,77),'                  if(!pluginService.isAllowed(channelId, pluginId)) {'),
82:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,78),'                    continue;'),
83:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,79),'                  }'),
84:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,80),'		          '),
86:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(35,83),' if (pluginService.isActive(channelId, pluginId))  { '),
88:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(93,84),'channelId'),
90:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(131,84),'checkboxName'),
92:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(152,84),'checkboxName'),
94:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(35,85),' } else { '),
96:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(93,86),'channelId'),
98:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(113,86),'checkboxName'),
100:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(134,86),'checkboxName'),
102:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(35,87),' } '),
104:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(45,88),'_ctx.appRes("NotificationAdmin.label.channel." + channelKey)'),
106:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(27,91),''),
107:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,92),'		          }'),
108:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(1,93),'		          '),
110:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(71,98),'pluginId'),
112:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(97,98),'pluginId'),
114:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(147,98),'_ctx.appRes(\'NotificationAdmin.label.save\')'),
116:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(13,104),' } '),
118:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(11,105),' } '),
120:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(39,112),'_ctx.appRes("NotificationAdmin.label.notificationsSender")'),
122:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(50,114),'_ctx.appRes("NotificationAdmin.label.sender.name")'),
124:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(63,116),'senderName'),
126:new juzu.impl.template.spi.juzu.dialect.gtmpl.Foo(new juzu.impl.common.Location(50,118),'_ctx.appRes("NotificationAdmin.label.sender.address")')];
}
