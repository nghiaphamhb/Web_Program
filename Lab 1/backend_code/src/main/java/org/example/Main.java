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
                RequestParams params = takeAndInvalidateParamsFromResquest(requestBody); //throw exception
                ResponseBody response = Checker.hit(params);
                sendResponse(response);
            }
            catch(Exception e) {
                sendErrResponse(e.toString());
                //to know where has wrong codes
//                StringWriter sw = new StringWriter();
//                PrintWriter pw = new PrintWriter(sw);
//                e.printStackTrace(pw);
//                sendErrResponse(sw.toString());
            }
        }
    }

    /**
     * Read request body
     * @return string of request body
     * @throws IOException when input/ output isn't found
     */
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

    /**
     * take params from request and validate them
     * @param resquestBody string of request body
     * @return object of request params
     * @throws NumberFormatException if these params are invalidated
     */
    private static RequestParams takeAndInvalidateParamsFromResquest(String resquestBody) throws NumberFormatException{
        float xValue = 0F;
        float yValue = 0F;
        float rValue = 0.0F;
        StringBuilder errorMessange = new StringBuilder();
        String[] param = resquestBody.replaceAll("[\"{}]", "").split(",");

        for(String c : param) {
            if (c.startsWith("x")){
                try {
                    xValue = Float.parseFloat(c.split(":")[1]);
                } catch (NumberFormatException e) {
                    errorMessange.append("* Only choose one value of X! ");
                }
            }
            else if(c.startsWith("y")){
                try {
                    yValue = Float.parseFloat(c.split(":")[1]);
                    if (yValue < -3 || yValue > 5) throw new NumberFormatException();
                } catch (NumberFormatException e) {
                    errorMessange.append("* Y should be selected from the range -3 to 5! ");
                }
            }
            else if (c.startsWith("r")) {
                try {
                    rValue = Float.parseFloat(c.split(":")[1]);
                } catch (NumberFormatException e) {
                    errorMessange.append("* The R value must be selected! ");
                }
            }
        }

        if (!errorMessange.isEmpty()) throw new NumberFormatException(errorMessange.toString());
        return new RequestParams(xValue, yValue, rValue);
    }

    /**
     * Send response to client
     * @param responseBodyObject object of response body
     */
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

    /**
     * Send error to client
     * @param e error message
     */
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


