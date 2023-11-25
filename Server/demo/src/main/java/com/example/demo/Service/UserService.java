package com.example.demo.Service;

import com.example.demo.DTO.LoginRequest;
import com.example.demo.DTO.SignUpRequest;
import com.example.demo.Entity.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> saveUser(SignUpRequest userData);

    ResponseEntity<?> login(LoginRequest loginData);
}
