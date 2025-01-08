package com.example.web_lab_4.authentication;

import com.example.web_lab_4.users.User;
import com.example.web_lab_4.users.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Service
//đánh dấu một lớp là Service Layer (tầng dịch vụ) trong ứng dụng.
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void register(String login, String password) {
        if (userRepository.findByLogin(login) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Login has been taken");
        }
        User user = new User(login, getHash(password));
        userRepository.save(user);
    }

    public String check(String authorization) {
        if (!authorization.startsWith("Basic"))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Authorization header");

        String login, password;

        try {
            String base64 = authorization.substring(6);
            String[] credentials = new String(Base64.getDecoder().decode(base64)).split(":", 2);
            if (credentials.length < 2)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Authorization header");
            login = credentials[0];
            password = credentials[1];
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid base64");
        }

        User user = userRepository.findByLogin(login);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid login");
        }

        if (!getHash(password).equals(user.getHashedPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }

        return user.getLogin();
    }

    private String getHash(String password) {
        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes());

            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1)
                    hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        }
        catch (NoSuchAlgorithmException e){
            throw new RuntimeException(e);
        }
    }
}
