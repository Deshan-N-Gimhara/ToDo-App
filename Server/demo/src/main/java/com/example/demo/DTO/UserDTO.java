package com.example.demo.DTO;

import com.example.demo.Entity.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class UserDTO {
    private int userId;
    private String name;
    private String email;


}
