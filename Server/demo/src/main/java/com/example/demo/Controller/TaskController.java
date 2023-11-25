package com.example.demo.Controller;

import com.example.demo.DTO.TaskDTO;
import com.example.demo.Entity.Task;
import com.example.demo.Entity.User;
import com.example.demo.Repository.TaskRepository;
import com.example.demo.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/task")
@CrossOrigin
public class TaskController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private TaskRepository taskRepository;

    @PostMapping("/save-task")
    public ResponseEntity<?> saveTask(@RequestBody TaskDTO taskData){
        return taskService.saveTask(taskData);
    }

    @GetMapping("/get-task-list-by-user-id/{userId}")
    public ResponseEntity<?> getTaskListByUserId(@PathVariable int userId){
        return taskService.getTaskListByUserId(userId);
    }

    @PutMapping("/update-task")
    public ResponseEntity<?> updateTask(@RequestBody TaskDTO taskData){
        return taskService.updateTask(taskData);
    }

    @DeleteMapping("/delete-task/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable int taskId){
        return taskService.deleteTask(taskId);
    }
}
