<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://jawr.net/tags" prefix="jwr" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Server Side Reverse Ajax Clock</title>
  <meta http-equiv="Content-Type" content="text/html; charset=us-ascii" />
 	<jwr:script src="/bundles/global.js"/>
  <link rel="stylesheet" type="text/css" href="../generic.css" />
</head>

<body onload="dwr.engine.setActiveReverseAjax(true);">
<div id="page-title">[
  <a href="http://getahead.org/dwr/">DWR Website</a> |
  <a href="..">Web Application Index</a>
]</div>

<h1>Server Side Reverse Ajax Clock</h1>

<p>Creating a clock in a web page is easy, but what about a clock controlled by
the server? This demo shows how use use a separate server side thread to control
a number of browsers.</p>

<input type="button" value="Start / Stop" onclick="Clock.toggle();"/>

<p></p>
<div style="font-size:200%;" id="clockDisplay"></div>

</body>
</html>
