package org.example;

/**
 * Object response body
 */
public class ResponseBody {
    private float x;
    private float y;
    private float r;
    private Boolean inArea;
    private String responseTime;

    public ResponseBody(float x, float y, float r, Boolean inArea, String responseTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.inArea = inArea;
        this.responseTime = responseTime;
    }

    @Override
    public String toString() {
        return "ResponseBody{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", inArea=" + inArea +
                ", responseTime='" + responseTime + '\'' +
                '}';
    }
}
