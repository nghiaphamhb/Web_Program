import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext context = getServletContext();

        @SuppressWarnings("unchecked")
        List<Result> results = (List<Result>) context.getAttribute("results");
        if (results == null) {
            results = new ArrayList<>();
            context.setAttribute("results", results); // Đảm bảo luôn lưu danh sách vào context
        }

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try (PrintWriter output = resp.getWriter()) {
            Gson gson = new Gson();
            output.print(gson.toJson(results));
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        StringBuilder stringBuilder = new StringBuilder();
        String line;

        try (BufferedReader reader = req.getReader()) {
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
        }

        String jsonString = stringBuilder.toString();
        if (jsonString == null || jsonString.isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            try (PrintWriter output = resp.getWriter()) {
                output.print("{\"message\": \"Request body is empty or invalid.\"}");
            }
            return;
        }

        // Xử lý dữ liệu từ JSON
        Data requestData;
        try {
            Gson gson = new GsonBuilder().serializeNulls().create();
            requestData = gson.fromJson(jsonString, Data.class);
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            try (PrintWriter output = resp.getWriter()) {
                output.print("{\"message\": \"Invalid JSON format: " + e.getMessage() + "\"}");
            }
            return;
        }

        // Kiểm tra giá trị của x, y, r
        Float x = requestData.getX();
        Float y = requestData.getY();
        Float r = requestData.getR();
        String sendTime = requestData.getSendTime();
        List<String> errors = new ArrayList<>();
        if (x == null || x < -3 || x > 5) errors.add("Need to choose a valid x value");
        if (y == null || y < -3 || y > 3) errors.add("Need to choose a valid y value between -3 and 3");
        if (r == null || r <= 0) errors.add("Need to choose a r value");


        // Nếu có lỗi, trả về phản hồi và dừng xử lý
        if (!errors.isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            try (PrintWriter output = resp.getWriter()) {
                output.print("{\"message\": \"" + String.join(", ", errors) + "\"}");
            }
            return; // Dừng luồng xử lý
        }

        boolean inArea = check(x, y, r);

        ServletContext context = getServletContext();
        @SuppressWarnings("unchecked")
        List<Result> results = (List<Result>) context.getAttribute("results");
        if (results == null) {
            results = new ArrayList<>();
            context.setAttribute("results", results);
        }

        // Thêm kết quả mới vào danh sách (synchronized để tránh xung đột)
        synchronized (results) {
            Result newResult = new Result(x, y, r, sendTime, inArea);
            results.add(newResult);
        }

        // Trả kết quả về dưới dạng JSON
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.setStatus(HttpServletResponse.SC_OK);

        try (PrintWriter output = resp.getWriter()) {
            output.print(new Gson().toJson(new Result(x, y, r, sendTime, inArea)));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext context = getServletContext();
        context.removeAttribute("results");

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.setStatus(HttpServletResponse.SC_OK);

        try (PrintWriter output = resp.getWriter()) {
            output.print("{\"message\": \"Reset results successfully\"}");
        }
    }

    private boolean check(float x, float y, float r) {
        return (isInTriangle(x, y, r) || isInSector(x, y, r) || isInRectangle(x, y, r));
    }

    private static boolean isInRectangle(float x, float y, float r) {
        return (x >= 0) && (x <= r)  && (y >= 0) && (y <= r);
    }

    private static boolean isInSector(float x, float y, float r) {
        if ( !(x <=0 && y >= 0) ){
            return false;
        }
        else {
            double distanceOfPointToCenter = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
            return distanceOfPointToCenter <= (double) r;
        }
    }

    private static boolean isInTriangle(float x, float y, float r) {
        if ( !(x >= 0 && y <= 0)){
            return false;
        }
        else {
            return (x <= r) && (y >= (float)x-r);
        }
    }
}
