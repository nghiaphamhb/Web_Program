package org.example;

public class ServerResponse {
    private float x;
    private float y;
    private float r;
    private Boolean inArea;
    private String responseTime;

    public ServerResponse(float x, float y, float r, Boolean inArea, String responseTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.inArea = inArea;
        this.responseTime = responseTime;
    }
}
