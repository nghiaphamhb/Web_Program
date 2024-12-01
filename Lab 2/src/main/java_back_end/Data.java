import com.google.gson.annotations.SerializedName;

public class Data {
    @SerializedName("x")
    private float x;
    @SerializedName("y")
    private float y;
    @SerializedName("r")
    private float r;
    private String sendTime;

    public Data() {
        // No-args constructor
    }


    public Data(float x, float y, float r, String sendTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.sendTime = sendTime;
    }

    public Float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public Float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public Float getR() {
        return r;
    }

    public void setR(float r) {
        this.r = r;
    }

    public String getSendTime() {
        return sendTime;
    }
}
