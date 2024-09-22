package org.example.utility;

import org.example.model.ClientRequest;
import org.example.model.ServerResponse;

import java.time.LocalDateTime;

public class RequestChecker {
    public static ServerResponse checkRequest(ClientRequest request){
        if (isInSector(request)||isInRectangle(request)||isInTriangle(request)){
            return new ServerResponse(request.getX(), request.getY(), true, LocalDateTime.now().toLocalTime().toString());
        }else return new ServerResponse(request.getX(), request.getY(), false,LocalDateTime.now().toLocalTime().toString());
    }


    private static boolean isInSector(ClientRequest request){
        float x = request.getX();
        float y = request.getY();
        float R = request.getR();
        if (!(x<=0&&y>=0)){
            return false;
        }else {
            Double distanceOfPointToCenter = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
            return distanceOfPointToCenter <= (double) R /2;
        }
    }

    private static boolean isInRectangle(ClientRequest request){
        float x = request.getX();
        float y = request.getY();
        float R = request.getR();

        return y<=R && x<=(R/2) && x>=0 && y>=0;
    }

    /**
     *  This method involves calculating the area of the triangle and the areas
     *     of the sub-triangles formed by the point and the triangle’s vertices.
     *     If the sum of the areas of these sub-triangles equals the area of the original
     *     triangle, the point is inside the triangle.
     *
     * @param request
     * @return
     */
    private static boolean isInTriangle(ClientRequest request){
        float x = request.getX();
        float y = request.getY();
        float R = request.getR();

        double areaOfMaintriangle = 0.5*(Math.pow(R,2));
        //Area of sub triangles A,B,C formed by the point to Rx,Ry and origin
        double areaRxPO = calculateAreaOfTriangle(0,0,R,0,x,y); //area between point, Rx and origin
        double areaRxRyP = calculateAreaOfTriangle(R,0,0,-R,x,y);//area btw point Rx and Ry
        double areaRyPO = calculateAreaOfTriangle(0,0,0,-R,x,y); //area btw point, Ry and Origin

        if (!(x>=0 && y<=0 )){
            return false;
        }else {
            return areaOfMaintriangle >= (areaRxPO+areaRyPO+areaRxRyP);
        }
    }

    public static double calculateAreaOfTriangle(float x1, float y1, float x2, float y2, float x3, float y3){
        return 0.5*(Math.abs((x1*(y2-y3))+(x2*(y3-y1))+(x3*(y1-y2))));
    }
}
