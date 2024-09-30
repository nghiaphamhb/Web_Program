package org.example;

public class RequestGate {
    public static ClientRequest make(String params){
        float xValue = 0F;
        float yValue = 0F;
        float zValue = 0.0F;

        String[] param = params.split("&");  //?
        for(String c : param) {
            if (c.startsWith("x")){
                xValue = Float.parseFloat(c.split("=")[1]);
            }
            else if(c.startsWith("y")){
                yValue = Float.parseFloat(c.split("=")[1]);
            }
            else if (c.startsWith("r")) {
                zValue = Float.parseFloat(c.split("=")[1]);
            }
        }

        return new ClientRequest(xValue, yValue, zValue);
    }
}
