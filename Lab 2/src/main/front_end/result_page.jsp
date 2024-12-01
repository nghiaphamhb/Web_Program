<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <title>Result</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            background-color: rgb(216, 221, 248);
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            overflow-x: hidden;
        }
        .result-page {
            width: 80%;
            margin: 30px auto;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .result-table {
            margin-bottom: 20px;
        }
        .button {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        .button a {
            text-decoration: none;
        }
        .button button {
            background-color: #4792ec;
            color: white;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
         .close-button {
             position: absolute;
             top: 20px;
             right: 20px;
             font-size: 20px;
             font-weight: bold;
             background-color: #4792ec;
             color: white;
             padding: 5px 10px;
             border-radius: 50%;
             text-align: center;
             cursor: pointer;
             text-decoration: none;
             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
         }
        .close-button a {
            color: white;
            text-decoration: none;
        }
        .close-button:hover {
            background-color: #555;
        }
    </style>

</head>
<body>
    <div class="result-page">
        <div class="close-button">
            <a href="index.jsp">✖</a>
        </div>
        <div class="result-table">
            <jsp:include page="result.jsp"/>
        </div>

        <div class="button">
            <a href="index.jsp">
                <button>Go back</button>
            </a>
        </div>
    </div>
</body>
</html>
