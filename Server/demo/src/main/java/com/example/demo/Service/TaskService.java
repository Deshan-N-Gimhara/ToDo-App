package com.example.demo.Service;

import com.example.demo.DTO.TaskDTO;
import com.example.demo.Entity.Task;
import org.springframework.http.ResponseEntity;

public interface TaskService {
    ResponseEntity<?> saveTask(TaskDTO taskData);

    ResponseEntity<?> getTaskListByUserId(int userId);

    ResponseEntity<?> updateTask(TaskDTO taskData);

    ResponseEntity<?> deleteTask(int taskId);
}
