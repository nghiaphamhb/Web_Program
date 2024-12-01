<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    // Lấy dữ liệu từ query parameters
    String x = request.getParameter("x");
    String y = request.getParameter("y");
    String r = request.getParameter("r");
    String sendTime = request.getParameter("sendTime");
    String getTime = request.getParameter("getTime");
    String inArea = request.getParameter("inArea");
%>

<div id="result">
    <div class="column-result title-column-result">
        X
    </div>
    <div class="column-result title-column-result">
        Y
    </div>
    <div class="column-result title-column-result">
        R
    </div>
    <div class="column-result title-column-result">
        Send time
    </div>
    <div class="column-result title-column-result">
        Get time
    </div>
    <div class="column-result title-column-result">
        Hit result
    </div>
</div>
<div id="result-rows">
    <div class="result-row">
        <div class="column-result"><%= x != null ? x : "" %></div>
        <div class="column-result"><%= y != null ? y : "" %></div>
        <div class="column-result"><%= r != null ? r : "" %></div>
        <div class="column-result"><%= sendTime != null ? sendTime : "" %></div>
        <div class="column-result"><%= getTime != null ? getTime : "" %></div>
        <div class="column-result"><%= inArea != null ? (inArea.equals("true") ? "True" : "False") : "" %></div>
    </div>
</div>

