package com.example.web_lab_4.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/api/register")
    public void register(@RequestParam("login") String login, @RequestParam("password") String password) {
        authService.register(login, password);
    }

    @PostMapping("/api/login")
    public void login(@RequestHeader("Authorization") String authorization) {
        authService.check(authorization);
    }
}
