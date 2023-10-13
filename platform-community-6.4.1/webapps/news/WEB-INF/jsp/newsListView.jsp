<!--
Copyright (C) 2021 eXo Platform SAS.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
-->
<%@page import="org.exoplatform.container.ExoContainerContext"%>
<%@page import="org.exoplatform.services.security.ConversationState"%>
<%@page import="org.exoplatform.services.security.Identity"%>
<%@ page import="org.exoplatform.news.utils.NewsUtils" %>
<%@ page import="org.exoplatform.web.PortalHttpServletResponseWrapper" %>
<%@ page import="org.exoplatform.portal.application.PortalRequestContext" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<portlet:defineObjects />
<portlet:actionURL var="saveSettingsURL" />

<div id="newsListViewApp" class="VuetifyApp">
  <%
    int generatedId = (int) (Math.random() * 1000000l);
    String appId = "news-list-view-" + generatedId;
    String[] viewTemplateParams = (String[]) request.getAttribute("viewTemplate");
    String[] newsTargetParams = (String[]) request.getAttribute("newsTarget");
    String[] headerParams = (String[]) request.getAttribute("header");
    String[] limitParams = (String[]) request.getAttribute("limit");
    String[] showHeaderParams = (String[]) request.getAttribute("showHeader");
    String[] showSeeAllParams = (String[]) request.getAttribute("showSeeAll");
    String[] showArticleTitleParams = (String[]) request.getAttribute("showArticleTitle");
    String[] showArticleSummaryParams = (String[]) request.getAttribute("showArticleSummary");
    String[] showArticleImageParams = (String[]) request.getAttribute("showArticleImage");
    String[] showArticleAuthorParams = (String[]) request.getAttribute("showArticleAuthor");
    String[] showArticleSpaceParams = (String[]) request.getAttribute("showArticleSpace");
    String[] showArticleReactionsParams = (String[]) request.getAttribute("showArticleReactions");
    String[] showArticleDateParams = (String[]) request.getAttribute("showArticleDate");
    String[] seeAllUrlParams = (String[]) request.getAttribute("seeAllUrl");
    String viewTemplate = viewTemplateParams == null || viewTemplateParams.length == 0 ? "": viewTemplateParams[0];
    String newsTarget = newsTargetParams == null || newsTargetParams.length == 0 ? "": newsTargetParams[0];
    String header = headerParams == null || headerParams.length == 0 ? "": headerParams[0];
    String limit = limitParams == null || limitParams.length == 0 ? "4": limitParams[0];
    String showHeader = showHeaderParams == null || showHeaderParams.length == 0 ? "true": showHeaderParams[0];
    String showSeeAll = showSeeAllParams == null || showSeeAllParams.length == 0 ? "true": showSeeAllParams[0];
    String showArticleTitle = showArticleTitleParams == null || showArticleTitleParams.length == 0 ? "true": showArticleTitleParams[0];
    String showArticleSummary = showArticleSummaryParams == null || showArticleSummaryParams.length == 0 ? "true": showArticleSummaryParams[0];
    String showArticleImage = showArticleImageParams == null || showArticleImageParams.length == 0 ? "true": showArticleImageParams[0];
    String showArticleAuthor = showArticleAuthorParams == null || showArticleAuthorParams.length == 0 ? "true": showArticleAuthorParams[0];
    String showArticleDate = showArticleDateParams == null || showArticleDateParams.length == 0 ? "true": showArticleDateParams[0];
    String showArticleSpace = showArticleSpaceParams == null || showArticleSpaceParams.length == 0 ? "true": showArticleSpaceParams[0];
    String showArticleReactions = showArticleReactionsParams == null || showArticleReactionsParams.length == 0 ? "true": showArticleReactionsParams[0];
    String seeAllUrl = seeAllUrlParams == null || seeAllUrlParams.length == 0 ? "/news?filter=pinned": seeAllUrlParams[0];

    ConversationState conversationState = ConversationState.getCurrent();
    Identity currentIdentity = null;
    if (conversationState != null) {
      currentIdentity = ConversationState.getCurrent().getIdentity();
    }

    PortalRequestContext rcontext = PortalRequestContext.getCurrentInstance();
    PortalHttpServletResponseWrapper responseWrapper = ( PortalHttpServletResponseWrapper ) rcontext.getResponse();
    String newsListUrl = "/portal/rest/v1/news/byTarget/" + newsTarget + "?offset=0&limit=" + limit + "&returnSize=true";
    responseWrapper.addHeader("Link", "<" + newsListUrl + ">; rel=prefetch; as=fetch; crossorigin=use-credentials", false);
  %>
  <div class="news-list-view-app" id="<%= appId %>">
    <script type="text/javascript">
      require(['PORTLET/news/NewsListView'], app => app.init({
        appId: '<%=appId%>',
        saveSettingsURL: <%= "'" + saveSettingsURL + "'" %>,
        viewTemplate: <%= viewTemplate == null ? null : "'" + viewTemplate + "'" %>,
        newsTarget: <%= newsTarget == null ? null : "'" + newsTarget + "'" %>,
        header: <%= header == null ? null : "'" + header + "'" %>,
        showHeader: <%= showHeader == null ? null : "'" + showHeader + "'" %>,
        limit: <%= limit == null ? null : "'" + limit + "'" %>,
        showSeeAll: <%= showSeeAll == null ? null : "'" + showSeeAll + "'" %>,
        showArticleTitle: <%= showArticleTitle == null ? null : "'" + showArticleTitle + "'" %>,
        showArticleSummary: <%= showArticleSummary == null ? null : "'" + showArticleSummary + "'" %>,
        showArticleImage: <%= showArticleImage == null ? null : "'" + showArticleImage + "'" %>,
        showArticleAuthor: <%= showArticleAuthor == null ? null : "'" + showArticleAuthor + "'" %>,
        showArticleSpace: <%= showArticleSpace == null ? null : "'" + showArticleSpace + "'" %>,
        showArticleReactions: <%= showArticleReactions == null ? null : "'" + showArticleReactions + "'" %>,
        showArticleDate: <%= showArticleDate == null ? null : "'" + showArticleDate + "'" %>,
        seeAllUrl: <%= seeAllUrl == null ? null : "'" + seeAllUrl + "'" %>
      }));
    </script>
  </div>
</div>