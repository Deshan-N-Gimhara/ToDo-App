package com.example.demo.ServiceImplementations;

import com.example.demo.DTO.TaskDTO;
import com.example.demo.Entity.Task;
import com.example.demo.Entity.User;
import com.example.demo.Repository.TaskRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class TaskServiceImplementation implements TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserRepository userRepository;

    public TaskDTO getTaskDTO(Task task){
        return TaskDTO.builder()
                .taskId(task.getTaskId())
                .name(task.getName())
                .description(task.getDescription())
                .date(task.getDate())
                .status(task.getStatus())
                .userId(task.getUser().getUserId())
                .build();
    }

    @Override
    public ResponseEntity<?> saveTask(TaskDTO taskData) {
        Map<String, Object> map= new LinkedHashMap<>();
        try{
            User u = userRepository.findById(taskData.getUserId()).orElse(null);
            if(u != null){
                Task newTask = new Task();
                newTask.setName(taskData.getName());
                newTask.setDescription(taskData.getDescription());
                newTask.setStatus(taskData.getStatus());
                newTask.setDate(taskData.getDate());
                newTask.setUser(u);

                Task savedTask = taskRepository.save(newTask);
                TaskDTO taskdto = getTaskDTO(savedTask);
                map.put("message","Task saved successfully");
                map.put("status",200);
                map.put("data",taskdto);
                return ResponseEntity.ok().body(map);
            }
            else{
                map.put("message","User not found");
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
    public ResponseEntity<?> getTaskListByUserId(int userId) {
        Map<String, Object> map= new LinkedHashMap<>();
        try{
            List<Task> taskList = taskRepository.getTaskListByUserId(userId);
            if(taskList!=null){
                List<TaskDTO> dtoList = new ArrayList<>();

                for(Task task:taskList){
                    dtoList.add(getTaskDTO(task));
                }
                map.put("message","Task list found");
                map.put("status",200);
                map.put("data",dtoList);
                return ResponseEntity.ok().body(map);
            }
            else{
                map.put("message","No tasks found");
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
    public ResponseEntity<?> updateTask(TaskDTO taskData) {
        Map<String, Object> map= new LinkedHashMap<>();
        try{
            if(taskRepository.existsById(taskData.getTaskId())){
                int updatedCount = taskRepository.updateTask(taskData.getName(), taskData.getDescription(), taskData.getStatus(), taskData.getDate(), taskData.getTaskId());
                if(updatedCount>0){
                    Task updatedTask = taskRepository.getReferenceById(taskData.getTaskId());

                    map.put("message","Task updated");
                    map.put("status",200);
                    map.put("data",getTaskDTO(updatedTask));
                    return ResponseEntity.ok().body(map);
                }
                else{
                    map.put("message","Update failed");
                    map.put("status",400);
                    return ResponseEntity.badRequest().body(map);
                }
            }
            else{
                map.put("message","No task found");
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
    public ResponseEntity<?> deleteTask(int taskId) {
        Map<String, Object> map= new LinkedHashMap<>();
        try{
            if(taskRepository.existsById(taskId)){
                int deletedCount = taskRepository.deleteTask(taskId);
                if(deletedCount>0){
                    map.put("message","Task deleted");
                    map.put("status",200);
                    map.put("data",true);
                    return ResponseEntity.ok().body(map);
                }
                else{
                    map.put("message","Task not deleted");
                    map.put("status",400);
                    return ResponseEntity.badRequest().body(map);
                }
            }
            else{
                map.put("message","Task not found");
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
