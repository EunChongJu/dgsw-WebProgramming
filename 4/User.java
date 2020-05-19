package kr.hs.dgsw.webclass02;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data               // 어노테이션 - @Getter, @Setter, @ToString을 한꺼번에 처리해줌
@AllArgsConstructor // 모든 값을 파라미터로 받는 생성자를 만듬
@NoArgsConstructor  // 파라미터 없는 기본 생성자를 생성
public class User {
    // User Info의 주요 값 들
    private String id;
    private String name;
    private String email;

    /* 이 모든 것이 단 하나 @Data로 한꺼번에 처리되니 얼마나 편합니까!!!
    @Override
    public String toString() {
        return id + "/" + name + "/" + email;
    }

    // 생성자
    public User() {}

    // Getter
    public User(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Setters and Getter
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    */

}