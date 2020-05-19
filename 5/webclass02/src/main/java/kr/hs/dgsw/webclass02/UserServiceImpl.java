package kr.hs.dgsw.webclass02;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {   // 이것은 UserService라는 인터페이스를 상속받아 구현한 클래스임
    // 
    List<User> userList;
    
    // User Info의 List를 만든다. 그리고 아래는 테스트를 위해 넣은 것임.
    public UserServiceImpl() {
        userList = new ArrayList<>();
        userList.add(new User("user1", "Jacopski", "user1234"));
        userList.add(new User("user2", "Paikopski", "dadada"));
        userList.add(new User("user3", "Svenski", "password"));
    }

    // User Info의 List 전체를 반환
    @Override
    public List<User> list() {
        return userList;
    }

    // User를 찾아 일치하는 User의 ID가 있다면, User Info를 반환. 없으면 null
    @Override
    public User view(String id) {
        User user = userList.stream()
            .filter(found -> found.getId().equals(id))
            .findAny()
            .orElse(null);
        return user;
    }

    // 새로운 User를 리스트에 추가한다.
    @Override
    public boolean add(User user) {
        User found = view(user.getId());
        if (found == null)
            return userList.add(user);
        return false;
    }

    // User Info에서 변경된 사항을 수정하여 저장한다.
    @Override
    public User update(User user) {
        User found = view(user.getId());
        if (found != null) {
            found.setName(user.getName());
            found.setEmail(user.getEmail());
        }
        return found;
    }

    // 회원탈퇴 등에 의해 User Info가 삭제된다.
    @Override
    public boolean delete(String id) {
        User found = view(id);
        return userList.remove(found);
    }

    // 찾는 방식이 여러가지이다. 이거 왜 있는지 모름
    public User find1(String name) {
        for (int i = 0; i < userList.size(); i++) {
            User user = userList.get(i);
            if (user.getName().equals(name)) return user;
        }
        return null;
    }

    // 찾는 방식이 여러가지이다. 이거 왜 있는지 모름 22
    public User find2(String name) {
        Iterator<User> iterator = userList.iterator();
        while (iterator.hasNext()) {
            User user = iterator.next();
            if (user.getName().equals(name)) return user;
        }
        return null;
    }

    // 찾는 방식이 여러가지이다. 이거 왜 있는지 모름 333
    public User find3(String name) {
        for (User user : userList) {
            if (user.getName().equals(name)) return user;
        }
        return null;
    }
}