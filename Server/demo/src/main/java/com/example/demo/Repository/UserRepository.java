package com.example.demo.Repository;

import com.example.demo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
//    @Query(value = "SELECT * FROM user WHERE user_id=?1", nativeQuery = true)
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User validateEmail(String email);
}
