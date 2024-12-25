package beans;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import java.io.Serializable;

@ManagedBean(name = "point")
@ApplicationScoped
@NoArgsConstructor
public class Point implements Serializable {
    @Getter
    @Setter
    private boolean selectedXMinus4;
    @Getter
    @Setter
    private boolean selectedXMinus3;
    @Getter
    @Setter
    private boolean selectedXMinus2;
    @Getter
    @Setter
    private boolean selectedXMinus1;
    @Getter
    @Setter
    private boolean selectedX0;
    @Getter
    @Setter
    private boolean selectedX1;
    @Getter
    @Setter
    private boolean selectedX2;

    @Getter
    @Setter
    private double x;

    @Getter
    @Setter
    private double y;

    @Getter
    @Setter
    private double r;

    @Getter
    @Setter
    private boolean hit;

    @Getter
    @Setter
    private long attemptTime;

    @Getter
    @Setter
    private double executionTime;

    @ManagedProperty(value = "#{table}")
    @Getter
    @Setter
    private transient ResultTable table;

    public Point(double x, double y, double r, boolean hit, long attemptTime, double executionTime) {
        this.setX(x);
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.attemptTime = attemptTime;
        this.executionTime = executionTime;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getX() {
        return x;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void check() {
        long start = System.nanoTime();
        long attemptTime = System.currentTimeMillis();
        hit = ((getX() >= -r) && (getX() <= 0) && (y >= 0) && (y <= r ))  //hinh chu nhat
                || ((getX() >= 0) && (getX() <= r / 2) && (y <= 0) && (y >= -r + 2 * getX()))  //hinh tam giac
                || ((getX() >= 0) && (y >= 0) && (getX() * getX() + y * y <= r * r));  //hinh tron
        long executionTime = System.nanoTime() - start;
        if (table != null) {
            table.addPoint(new Point(getX(), y, r, hit, attemptTime, executionTime));
        }
    }
}


