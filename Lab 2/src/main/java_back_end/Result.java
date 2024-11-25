import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Thís is a JavaBean
 */
public class Result {
    private Data data;
    private Boolean inArea;
    private String getTime;

    public Result(float x, float y, float r, String sendTime, Boolean inArea) {
        data = new Data(x, y, r, sendTime);
        this.getTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        this.inArea = inArea;
    }

    public float getX() {
        return data.getX();
    }

    public float getY() {
        return data.getY();
    }

    public float getR() {
        return data.getR();
    }

    public String getGetTime() {
        return getTime;
    }

    public String getSendTime() {
        return data.getSendTime();
    }

    public Boolean getInArea() {
        return inArea;
    }

    @Override
    public String toString() {
        return "Result{" +
                "x=" + getX() +
                ", y=" + getY() +
                ", r=" + getR() +
                ", sendTime=" + getSendTime() +
                ", getTime=" + getGetTime() +
                ", inArea=" + getInArea() +
                '}';
    }
}
