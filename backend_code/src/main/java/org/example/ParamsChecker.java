package org.example;

import java.time.LocalDateTime;

public class ParamsChecker {
    public static ServerResponse check(ClientRequest request){
        float x = request.getX();
        float y = request.getY();
        float r = request.getR();

        if (isInTriangle(x, y, r) ||  isInSector(x, y, r) || isInRectangle(x, y, r)) {
            return new ServerResponse(x, y, r, true, LocalDateTime.now().toLocalTime().toString());
        }
        else {
            return new ServerResponse(x, y, r, false, LocalDateTime.now().toLocalTime().toString());
        }
    }

    private static boolean isInRectangle(float x, float y, float r){
        return (x <= r/2) && (x >= 0) && (y >= r) && (y <= 0);
    }

    private static boolean isInSector(float x, float y, float r){
        if ( !(x <=0 && y <= 0) ){
            return false;
        }
        else {
            double distanceOfPointToCenter = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
            return distanceOfPointToCenter <= (double) r /2;
        }
    }

    private static boolean isInTriangle(float x, float y, float r){
        if ( !(x <= 0 && y >= 0)){
            return false;
        }
        else {
            return (x >= -r) && (y <= (x+r)/2);
        }
    }
}
