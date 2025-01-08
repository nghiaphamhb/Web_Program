package com.example.web_lab_4.dots;

import com.example.web_lab_4.authentication.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController //đánh dấu một lớp là RESTful Controller sẽ xử lý các yêu cầu HTTP và trả về dữ liệu trực tiếp (thường ở định dạng JSON hoặc XML).
public class DotController {
    private final DotRepository dotRepository;
    private final AuthService authService;

    @Autowired
    public DotController(DotRepository dotRepository, AuthService authService) {
        this.dotRepository = dotRepository;
        this.authService = authService;
    }

    @PostMapping("/api/dots")
    public Dot addDot(@RequestParam("x") float x, @RequestParam("y") float y, @RequestParam("r") float r,
                      @RequestHeader("Authorization") String authorization) {
        long timer = System.nanoTime();

        String login = authService.check(authorization);
        Dot dot = new Dot(x, y, r);
        dot.setOwner(login);
        dot.setTimestamp(Instant.now().getEpochSecond());
        dot.setScriptTime(System.nanoTime() - timer);
        dotRepository.save(dot);
        return dot;
    }

    @Transactional
    @DeleteMapping("/api/dots")
    public void deleteDots(@RequestHeader("Authorization") String authorization) {
        String login = authService.check(authorization);
        dotRepository.deleteByOwner(login);
    }

    @GetMapping("/api/dots")
    public List<Dot> getDots(@RequestHeader("Authorization") String authorization) {
        String login = authService.check(authorization);
        return dotRepository.getDotsByOwner(login);
    }
}
