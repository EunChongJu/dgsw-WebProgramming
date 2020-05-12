package kr.hs.dgsw.webclass02;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// Controller Start--
@RestController
public class UserController {
    // This is Autowired Annotation, 생성자나 setter, getter 등을 사용하여 의존성 주입 할 때, 해당 빈을 찾아 주입
    @Autowired
    UserService userService;

    // 사용자 목록을 반환 - 관리자 페이지 : 사용자 관리
    @GetMapping("/user")
    @ResponseBody
    public List<User> list() {
        return userService.list();
    }

    // 매칭되는 아이디를 찾아 User Info를 반환, 없으면 null
    @GetMapping("/user/{id}")
    @ResponseBody
    public User view(@PathVariable String id) {
        return userService.view(id);
    }

    // 새로운 User Info를 추가 - 회원가입?
    @PostMapping("/user")
    @ResponseBody
    public boolean add(@RequestBody User user) {
        return userService.add(user);
    }

    // User Info를 업데이트 - 정보수정 전용
    @PutMapping("/user")
    @ResponseBody
    public User update(@RequestBody User user) {
        return userService.update(user);
    }
    
    // Delete User Info - 회원탈퇴 전용
    @DeleteMapping("/user/{id}")
    @ResponseBody
    public boolean delete(@PathVariable String id) {
        return userService.delete(id);
    }
}
// CRUD Create  Read    Update  Delete
// SQL  insert  selete  update  delete
// HTTP POST    GET     PUT     DELETE