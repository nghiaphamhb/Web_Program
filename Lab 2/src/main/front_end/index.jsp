<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web-project #1</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="wrapper">
        <!-- Header -->
        <div id="header">
            <div class="title">
                Pham Dang Trung Nghia
            </div>
            <div class="title">
                P3221
            </div>
            <div class="title">
                #374806
            </div>
        </div>
        <!-- Contetnt -->
        <div id="content">
            <div id="top-content">
                <!-- Graph -->
                <div id="graph" class="left-content">
                    <div class="title">
                        Graph
                    </div>
                    <div class="image">
                        <svg viewBox="-100 -100 200 200">
                            <!-- Trục tọa độ -->
                            <line x1="-90" y1="0" x2="90" y2="0" class="axis-line" />
                            <line x1="0" y1="-90" x2="0" y2="90" class="axis-line" />

                            <!-- Mũi tên trục X -->
                            <line x1="90" y1="0" x2="85" y2="-5" class="axis-line" />
                            <line x1="90" y1="0" x2="85" y2="5" class="axis-line" />

                            <!-- Mũi tên trục Y -->
                            <line x1="0" y1="-90" x2="-5" y2="-85" class="axis-line" />
                            <line x1="0" y1="-90" x2="5" y2="-85" class="axis-line" />

                            <!-- Các vạch chia trên trục X -->
                            <line x1="-80" y1="5" x2="-80" y2="-5" class="axis-line" />
                            <line x1="-40" y1="5" x2="-40" y2="-5" class="axis-line" />
                            <line x1="40" y1="5" x2="40" y2="-5" class="axis-line" />
                            <line x1="80" y1="5" x2="80" y2="-5" class="axis-line" />

                            <!-- Các vạch chia trên trục Y -->
                            <line x1="5" y1="80" x2="-5" y2="80" class="axis-line" />
                            <line x1="5" y1="40" x2="-5" y2="40" class="axis-line" />
                            <line x1="5" y1="-40" x2="-5" y2="-40" class="axis-line" />
                            <line x1="5" y1="-80" x2="-5" y2="-80" class="axis-line" />

                            <!-- Nhãn chia trục X -->
                            <text x="-85" y="15" class="axis-text">-R</text>
                            <text x="-50" y="15" class="axis-text">-R/2</text>
                            <text x="33" y="15" class="axis-text">R/2</text>
                            <text x="77" y="15" class="axis-text">R</text>

                            <!-- Nhãn chia trục Y -->
                            <text x="10" y="82" class="axis-text">-R</text>
                            <text x="10" y="42" class="axis-text">-R/2</text>
                            <text x="10" y="-37" class="axis-text">R/2</text>
                            <text x="10" y="-77" class="axis-text">R</text>

                            <!-- Nhãn trục -->
                            <text x="90" y="-10" class="axis-text">X</text>
                            <text x="6" y="-93" class="axis-text">Y</text>

                            <!-- Hình chữ nhật -->
                            <rect x="0" y="-80" width="80" height="80" class="area" />

                            <!-- Cung tròn -->
                            <path d="M 0,-80 A 80,80 0 0 0 -80,0 L 0,0 Z" class="area"/>

                            <!-- Tam giác -->
                            <polygon points="0,0 80,0 0,80" class="area" />

                            <!-- Nhóm điểm -->
                            <g id="points-group"></g>
                        </svg>

                    </div>
                </div>

                <!-- Table result --> 
                <div id="table">
                    <div class="title">Table</div>
                    <jsp:include page="./result.jsp"/>
                </div>
                
            </div>
            <!-- Values -->
            <div id="low-content">
                <div class="left-content">
                    <div class="title">
                        Values
                    </div>
                    <form id="form" method="post">
                        <div id="value-box">
                            <div id="X" class="value-row">
                                <div class="value-name">
                                    X:
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="-3" id="X1" name="x-button">
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="-2" id="X2" name="x-button">
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="-1" id="X3" name="x-button">
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="0" id="X4" name="x-button">
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="1" id="X5" name="x-button">
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="2" id="X6" name="x-button">
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="3" id="X7" name="x-button">
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="4" id="X8" name="x-button">
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="5" id="X9" name="x-button">
                                </div>
                            </div>
                            <div id="Y" class="value-row">
                                <div class="value-name">
                                    Y:
                                </div>
                                <div id="text">
                                    <input placeholder="Number from -3 to 3..." type="number" id="yField">
                                </div>
                            </div>
                            <div class="value-row">
                                <div id="R" class="value-name">
                                    R:
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="1" id="R1" name="r-button">
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="2" id="R2" name="r-button">
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="3" id="R3" name="r-button">
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="4" id="R4" name="r-button">
                                </div>
                                <div class="value-and-box">
                                    <input type="button" value="5" id="R5" name="r-button">
                                </div>
                            </div>
                        </div>
                        <div id="control-box">
                            <div class="button">
                                <button value="submit" id="submit-button">Submit</button>
                            </div>
                            <div class="button">
                                <button value="reset" id="reset-button">Reset</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

    <script src="./script.js"></script>

</body>

</html>