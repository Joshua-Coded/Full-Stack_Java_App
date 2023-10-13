<%
String enabledSpaces = System.getProperty("exo.feature.poll.enabledSpaces", "");
%>
<script type="text/javascript">
  require(['PORTLET/poll/PollExtensions'], app => app.init('<%=enabledSpaces%>'));
</script>