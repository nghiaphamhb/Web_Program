package org.example;

import com.fastcgi.FCGIInterface;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import static java.nio.charset.StandardCharsets.UTF_8;


public class Main {
    private static final String RESPONSE_TEMPLATE = "Content-Type: application/json\n" +
            "Content-Length: %d\n\n%s";

    public static void main(String[] args) {
        var fcgiInterface = new FCGIInterface();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        while (fcgiInterface.FCGIaccept() >= 0) {
            String params = FCGIInterface.request.params.getProperty("QUERY_STRING");
            try{
                ClientRequest request = RequestGate.make(params);
                if (Validator.checkParamsFromRequest(request)){
                    ServerResponse response = ParamsChecker.check(request);
                    sendJson(gson.toJson(response));
                }
                else {
                    sendErrJSON();
                }
            }
            catch(Exception e) {
                sendErrJSON();
            }
        }
    }


    private static void sendJson(String jsonDump) {
        System.out.printf("HTTP/1.1 200 OK\n" + RESPONSE_TEMPLATE + "%n", jsonDump.getBytes(UTF_8).length, jsonDump);
    }

    public static void sendErrJSON() {
        String err = """
                {
                  "error": "Bad request",
                  "message": "Request body could not be read properly.",
                }
                """;

        System.out.printf("HTTP/1.1 400\n" + RESPONSE_TEMPLATE + "%n", err.getBytes(UTF_8).length, err);


    }
}