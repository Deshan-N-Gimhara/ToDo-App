package com.example.demo.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskDTO {
    private int taskId;
    private String name;
    private String description;
    private String status;
    private String date;
    private int userId;
}
