package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    private String name;
    private String email;
    private String password;
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Task> task;

}
