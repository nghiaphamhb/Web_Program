package org.example;

import com.fastcgi.FCGIInterface;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.model.ClientRequest;
import org.example.model.ServerResponse;
import org.example.utility.ParamsPerser;
import org.example.utility.RequestChecker;

import java.nio.charset.StandardCharsets;

public class Main {

    private static final String RESPONSE_TEMPLATE = "Content-Type: application/json\n" +
            "Content-Length: %d\n\n%s";
    public static void main(String[] args) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
//
        while (new FCGIInterface().FCGIaccept() >= 0) {
            String params = FCGIInterface.request.params.getProperty("QUERY_STRING");
            ClientRequest request = ParamsPerser.parseRequest(params);
            ServerResponse response = RequestChecker.checkRequest(request);
            sendJson(mapper.writeValueAsString(response));
        }
    }

    private static void sendJson(String jsonDump) {
        System.out.println(String.format(RESPONSE_TEMPLATE, jsonDump.getBytes(StandardCharsets.UTF_8).length, jsonDump));
    }
}