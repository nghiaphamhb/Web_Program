package org.example;

public class ClientRequest {
    private float x;
    private float y;
    private float r;

    public ClientRequest(float x, float y, float r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public float getR() {
        return r;
    }
}
