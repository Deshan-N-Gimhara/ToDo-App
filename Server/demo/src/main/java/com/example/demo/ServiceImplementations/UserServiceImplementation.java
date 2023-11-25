package com.example.demo.ServiceImplementations;

import com.example.demo.DTO.LoginRequest;
import com.example.demo.DTO.SignUpRequest;
import com.example.demo.DTO.UserDTO;
import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class UserServiceImplementation implements UserService {
    @Autowired
    private UserRepository userRepository;

    public UserDTO getUserDTO(User user){
        return UserDTO.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }

    public boolean validateEmail(String email){
        User user=userRepository.validateEmail(email);
        if(user !=null){
            return false;
        }
        return true;
    }

    public String encryptPassword(String password){
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(password.getBytes());
            byte[] digest = md.digest();
            StringBuilder hexString = new StringBuilder();

            for (byte b : digest) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean validatePassword(String enteredPassword, String storedHashedPassword){
        String hashedEnteredPassword = encryptPassword(enteredPassword);
        return hashedEnteredPassword.equals(storedHashedPassword);
    }

    @Override
    public ResponseEntity<?> saveUser(SignUpRequest userData) {
        Map<String, Object> map= new LinkedHashMap<>();
        try{
            boolean valid = validateEmail(userData.getEmail());
            if (valid) {
                String encryptedPw=encryptPassword(userData.getPassword());

                User newUser = new User();
                newUser.setName(userData.getName());
                newUser.setEmail(userData.getEmail());
                newUser.setPassword(encryptedPw);

                User savedUser = userRepository.save(newUser);
                map.put("message","User saved successfully");
                map.put("status",200);
                map.put("data",getUserDTO(savedUser));
                return ResponseEntity.ok().body(map);
            } else {
                map.put("message","email is already exists");
                map.put("status",400);
                return ResponseEntity.badRequest().body(map);
            }
        }
        catch(Exception e){
            map.put("message",e.getMessage());
            map.put("status",400);
            return ResponseEntity.badRequest().body(map);
        }
    }

    @Override
    public ResponseEntity<?> login(LoginRequest loginData) {
        Map<String, Object> map= new LinkedHashMap<>();
        try{
            User user=userRepository.validateEmail(loginData.getEmail());
            if (user != null) {
                boolean isPwMatch=validatePassword(loginData.getPassword(), user.getPassword());
                if(isPwMatch){
                    UserDTO userdto=getUserDTO(user);
                    map.put("message","Login successfully");
                    map.put("status",200);
                    map.put("data",userdto);
                    return ResponseEntity.ok().body(map);
                }
                else{
                    map.put("message","Invalid password");
                    map.put("status",400);
                    return ResponseEntity.badRequest().body(map);
                }
            } else {
                map.put("message","Invalid email address");
                map.put("status",400);
                return ResponseEntity.badRequest().body(map);
            }
        }
        catch(Exception e){
            map.put("message",e.getMessage());
            map.put("status",400);
            return ResponseEntity.badRequest().body(map);
        }
    }
}
