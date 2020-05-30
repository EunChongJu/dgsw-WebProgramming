package kr.hs.dgsw.webclass02.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import kr.hs.dgsw.webclass02.Domain.User;
import kr.hs.dgsw.webclass02.Service.UserService;

@RestController
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/user/add")
    public User add(@RequestBody User user) {       // POST
        return userService.add(user);
    }

    @PostMapping("/user/login")
    public User login(@RequestBody User user) {     // POST
        return userService.login(user.getEmail(), user.getPassword());
    }

    @PutMapping("/user/update/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {     // Maybe GET
        return userService.update(id, user);
    }

    @DeleteMapping("/user/delete/{id}")
    public boolean delete(@PathVariable Long id) {      // Maybe GET
        return userService.delete(id);
    }

    @GetMapping("/user/view/{id}")
    public User view(@PathVariable Long id) {       // GET
        return userService.view(id);
    }

    @GetMapping("/user/list")
    public List<User> list() {                  // GET
        return userService.list();
    }
}