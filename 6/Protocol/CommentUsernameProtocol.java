package kr.hs.dgsw.webclass02.Protocol;

import kr.hs.dgsw.webclass02.Domain.Comment;
import lombok.Data;

@Data
public class CommentUsernameProtocol extends Comment {
    private String userName;
    public CommentUsernameProtocol(Comment c, String username) {
        super(c);
        this.userName = username;
    }
}