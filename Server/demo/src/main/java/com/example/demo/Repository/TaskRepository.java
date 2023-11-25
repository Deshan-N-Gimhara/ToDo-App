package com.example.demo.Repository;

import com.example.demo.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    @Transactional
    @Modifying
    @Query("delete from Task t where t.taskId = ?1")
    int deleteTask(int taskId);
    @Transactional
    @Modifying
    @Query("update Task t set t.name = ?1, t.description = ?2, t.status = ?3, t.date = ?4 where t.taskId = ?5")
    int updateTask(String name, String description, String status, String date, int taskId);
    @Query("SELECT t FROM Task t WHERE t.user.userId = ?1")
    List<Task> getTaskListByUserId(int userId);
}
