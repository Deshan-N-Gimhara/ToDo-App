package com.example.demo.Controller;

import com.example.demo.DTO.LoginRequest;
import com.example.demo.DTO.SignUpRequest;
import com.example.demo.Entity.User;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/save-user")
    public ResponseEntity<?> saveUser(@RequestBody SignUpRequest userData){
        return userService.saveUser(userData);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginData){
        return userService.login(loginData);
    }
}
