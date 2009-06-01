<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://jawr.net/tags" prefix="jwr" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
  <title>DWR Thin Chat Version 2.0</title>
 	<jwr:script src="/bundles/global.js"/>
  <script type="text/javascript">
    function sendMessage() {
      JavaChat.addMessage(dwr.util.getValue("text"));
    }
  </script>
  <link rel="stylesheet" type="text/css" href="../generic.css" />
</head>

<body onload="dwr.engine.setActiveReverseAjax(true);">
<div id="page-title">[
  <a href="http://getahead.org/dwr/">DWR Website</a> |
  <a href="..">Web Application Index</a>
]</div>

<h1>Java Chat</h1>

<p>This is a very simple chat demo that uses reverse ajax to collect messages
and server-side browser manipulation to update the pages with the results.</p>

<p>
  Your Message:
  <input id="text" onkeypress="dwr.util.onReturn(event, sendMessage)"/>
  <input type="button" value="Send" onclick="sendMessage()"/>
</p>
<hr/>

<ul id="chatlog" style="list-style-type:none;">
</ul>

</body>
</html>
