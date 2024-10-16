package org.example;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * This class to check if the point falls into the defined area
 */
public class Checker {

    /**
     * Check if the point falls into the defined area
     * @param params object of request params
     * @return response body object
     */
    public static ResponseBody hit(RequestParams params){
        float x = params.getX();
        float y = params.getY();
        float r = params.getR();

        if (isInTriangle(x, y, r) ||  isInSector(x, y, r) || isInRectangle(x, y, r)) {
            return new ResponseBody(x, y, r, true, LocalDateTime.now().toLocalTime().toString()
                    .formatted(DateTimeFormatter.ofPattern("HH:mm:ss")));
        }
        else {
            return new ResponseBody(x, y, r, false, LocalDateTime.now().toLocalTime().toString()
                    .formatted(DateTimeFormatter.ofPattern("HH:mm:ss")));
        }
    }

    /**
     * Check if point falls into the rectangle
     * @param x x
     * @param y y
     * @param r r
     * @return true/ false
     */
    private static boolean isInRectangle(float x, float y, float r){
        return (x <= r/2) && (x >= 0) && (y >= r) && (y <= 0);
    }

    /**
     * Check if point falls into the sector
     * @param x x
     * @param y y
     * @param r r
     * @return true/ false
     */
    private static boolean isInSector(float x, float y, float r){
        if ( !(x <=0 && y <= 0) ){
            return false;
        }
        else {
            double distanceOfPointToCenter = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
            return distanceOfPointToCenter <= (double) r /2;
        }
    }

    /**
     * Check if point falls into the triangle
     * @param x x
     * @param y y
     * @param r r
     * @return true/ false
     */
    private static boolean isInTriangle(float x, float y, float r){
        if ( !(x <= 0 && y >= 0)){
            return false;
        }
        else {
            return (x >= -r) && (y <= (float)(x+r)/2);
        }
    }
}
