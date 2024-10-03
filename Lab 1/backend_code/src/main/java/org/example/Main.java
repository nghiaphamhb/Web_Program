package org.example;

import com.fastcgi.FCGIInterface;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.IOException;
import java.nio.ByteBuffer;

import static java.nio.charset.StandardCharsets.UTF_8;


public class Main {
    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public static void main(String[] args) throws IOException {
        var fcgiInterface = new FCGIInterface();

        while (fcgiInterface.FCGIaccept() >= 0) {
            String requestBody = readRequestBody();

            try{
                RequestParams params = takeParamsFromResquest(requestBody);
                ResponseBody response = Checker.hit(params);
                sendResponse(response);
            }
            catch(Exception e) {
                sendErrResponse(e.toString());
            }
        }
    }


    private static String readRequestBody() throws IOException {
        FCGIInterface.request.inStream.fill();
        var contentLength = FCGIInterface.request.inStream.available();
        var buffer = ByteBuffer.allocate(contentLength);
        var readBytes = FCGIInterface.request.inStream.read(buffer.array(), 0, contentLength);
        var requestBodyRaw = new byte[readBytes];
        buffer.get(requestBodyRaw);
        buffer.clear();
        return new String(requestBodyRaw, UTF_8);
    }

    private static RequestParams takeParamsFromResquest(String resquestBody){
        float xValue = 0F;
        float yValue = 0F;
        float rValue = 0.0F;

        String[] param = resquestBody.replace("\"", "").split("&");
        for(String c : param) {
            if (c.startsWith("x")){
                xValue = Float.parseFloat(c.split("=")[1]);
            }
            else if(c.startsWith("y")){
                yValue = Float.parseFloat(c.split("=")[1]);
            }
            else if (c.startsWith("r")) {
                rValue = Float.parseFloat(c.split("=")[1]);
            }
        }
        return new RequestParams(xValue, yValue, rValue);
    }

    private static void sendResponse(ResponseBody responseBodyObject){
        String responseBody = gson.toJson(responseBodyObject);
        String response = String.format("""
                        HTTP/1.1 200 OK
                        Content-Type: application/json
                        Content-Length: %d
                        
                        %s
                        """, responseBody.getBytes(UTF_8).length, responseBody);
        System.out.print(response);
    }

    public static void sendErrResponse(String e) {
        String responseBody = gson.toJson(e);
        String response = String.format("""
                        HTTP/1.1 400 Bad Request
                        Content-Type: application/json
                        Content-Length: %d
                        
                        %s
                        """, responseBody.getBytes(UTF_8).length, responseBody);
        System.out.print(response);
    }
}