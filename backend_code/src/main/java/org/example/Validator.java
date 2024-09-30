package org.example;

public class Validator {
    public static boolean checkParamsFromRequest(ClientRequest request){
        return (request.getY() >= -3) && (request.getY() <= 5);
    }
}
