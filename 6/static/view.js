

//// 디스플레이 관리

// 로그인 창을 보여주거나 숨긴다. (로그인은 나중에 구현할 예정)
function showLoginBox() {
    $('#back').show();
    $('#login-box').show();
}

function hideLoginBox() {
    $('#back').hide();
    $('#login-box').hide();
}

// User info display show or hide
function showEditUserInfo(id) { // 에디트 모드로 전환
    $('#user-'+ id +'-form').show();
    $('#user-'+ id +'-file').hide();
    $('#user-'+ id +'-path').hide();
    $('#user-'+ id +'-edit').hide();
    $('#user-'+ id +'-remove').hide();
    $('#user-'+ id +'-upload').show();
    $('#user-'+ id +'-cancel').show();
    $('#user-'+ id +'-update').show();

    $('#user-'+ id +'-editEmail').show();
    $('#user-'+ id +'-editPassword').show();
    $('#user-'+ id +'-email').hide();
    $('#user-'+ id +'-password').hide();
}

function hideEditUserInfo(id) { // 에디트 모드 해제
    $('#user-'+ id +'-form').hide();
    $('#user-'+ id +'-file').show();
    $('#user-'+ id +'-path').show();
    $('#user-'+ id +'-edit').show();
    $('#user-'+ id +'-remove').show();
    $('#user-'+ id +'-upload').hide();
    $('#user-'+ id +'-cancel').hide();
    $('#user-'+ id +'-update').hide();

    $('#user-'+ id +'-editEmail').hide();
    $('#user-'+ id +'-editPassword').hide();
    $('#user-'+ id +'-email').show();
    $('#user-'+ id +'-password').show();
    // $('#user-'+ id +'-').();
}

function cancelUpdateUserInfo(id) { // 에디트 모드에서 빠져 나올려고 할 때.
    hideEditUserInfo(id);
    $('#user-'+ id +'-editEmail').val('');
    $('#user-'+ id +'-editPassword').val('');
}

// Comment display show or hide
function showEditComment(id) {
    $('#comment-'+ id +'-edit').hide();
    $('#comment-'+ id +'-remove').hide();

    $('#comment-'+ id +'-change').show();
    $('#comment-'+ id +'-cancel').show();
    
    $('#comment-'+ id +'-content').hide();
    $('#comment-'+ id +'-text').show();
}

function hideEditComment(id) {
    $('#comment-'+ id +'-edit').show();
    $('#comment-'+ id +'-remove').show();

    $('#comment-'+ id +'-change').hide();
    $('#comment-'+ id +'-cancel').hide();
    
    $('#comment-'+ id +'-content').show();
    $('#comment-'+ id +'-text').hide();
}

function cancelUpdateComment(id) {
    hideEditComment(id);
    $('#comment-'+ id +'-text').val('');
}



/*

*** UserInfo

@PostMapping("/user/add")
public User add(@RequestBody User user) {
    return userService.add(user);
}

@PostMapping("/user/login")
public User login(@RequestBody User user) {
    return userService.login(user.getEmail(), user.getPassword());
}

@PutMapping("/user/update/{id}")
public User update(@PathVariable Long id, @RequestBody User user) {
    return userService.update(id, user);
}

@DeleteMapping("/user/delete/{id}")
public boolean delete(@PathVariable Long id) {
    return userService.delete(id);
}

@GetMapping("/user/view/{id}")
public User view(@PathVariable Long id) {
    return userService.view(id);
}

@GetMapping("/user/list")
public List<User> list() {
    return userService.list();
}

*/




////// UserController.java와 연계된 (사실은 정경유착인) 정보 처리 함수

//// 여기는 회원가입 = 회원 추가    // POST     // 전체 완료

// 회원가입에서 확인을 누르면 동작하는 함수 - 회원가입 전체를 맡는 함수
function signUpActive() {
    signUpDataSendInPost(getValues());
}

// 회원가입 프레임 내 값을 가져와 반환
function getValues() {
    return {
        username: $('#join-username').val().trim(),
        email: $('#join-email').val().trim(),
        password: $('#join-password').val().trim()
    };
}

// POST로 데이터를 보낸다. 그리고 응답한 결과를 받는다. 그리고 다음으로 테이블에 한 줄 추가를 실행한다.
async function signUpDataSendInPost(data) {
    try {
        let response = await $.ajax({
            type: 'post',
            url: '/user/add',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: () => {
                alert(data.username + '님 가입이 완료되었습니다');

                viewListUserInfo();
                emptySignUpField();    // 완료하면 input을 비운다
            }
        });
    }
    catch (error) {
        console.log(JSON.stringify(error));
        console.log('Error in SignUpDataSendInPost()');
    }
}

// 회원가입에서 취소를 누르거나, 전송이 완료되면 이 필드의 값을 비운다.
function emptySignUpField() {
    $('#join-username').val('');
    $('#join-email').val('');
    $('#join-password').val('');
}


//// 회원정보 업데이트 = 회원정보 수정  // PUT      // 전체 완료

function updateModeUserInfo(id) {
    showEditUserInfo(id);
}

function getUpdateUserInfo(id) {
    return {
        username: $('#user-'+ id +'-id').val(),
        email: $('#user-'+ id +'-editEmail').val(),
        password: $('#user-'+ id +'-editPassword').val(),
        storedPath: $('#user-'+ id +'-path').val(),
        originalName: $('#user-'+ id +'-file').val()
    }
}

// 회원정보를 종합적으로 관리하는 함수 - 회원정보 수정이 발생할 때 여기서 호출한다.
function updateUserInfo(id) {   // 파라미터의 아이디를 통해 바뀔 값을 찾아 호출
    var data = getUpdateUserInfo(id);
    // console.dir(data);
    
    var valid = getUpdateUserInfo(id);
    if (!((valid.email==="") || (valid.password===""))) {
        requestUserInfoUpdate(data, id);
    }
}

// 회원정보 수정을 서버에 요청  // ("/user/update/{id}")
async function requestUserInfoUpdate(data, id) {
    try {
        let response = await $.ajax({
            type: 'put',
            url: '/user/update/'+id,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: ()=>{
                alert(data.id +'님 정보 업데이트가 완료되었습니다.');

                resetUserInfo();
                emptyEditUserInfo(id);
            }
        });
    }
    catch (error) {
        console.log(JSON.stringify(error));
    }
}

function emptyEditUserInfo(id) {
    $('#user-'+ id +'-editEmail').val('');    // input을 비운다
    $('#user-'+ id +'-editPassword').val('');
    // $('#user-'+ id +'-').val('');
}

// 수정 완료되면, 테이블의 해당 row를 변경  // 아니면 F5를 실행하는 방법이 있긴 하다.
function resetUserInfo() {

    viewListUserInfo(); // 이 방법을 사용하면 통합적으로 리스트를 표시할 수 있다!
}

//// 회원정보 삭제      // 전체 완료

// 삭제를 종합적으로 관리하는 함수
function deleteUserInfo(id) {
    console.log('deleteUserInfo call, id: '+ id);
    requestUserInfoDelete(id);
}

// 삭제를 요청  // ("/user/delete/{id}")
async function requestUserInfoDelete(id) {
    $.ajax({
        url: '/user/delete/'+id,
        type: 'DELETE',
        dataType: 'application/json',
        success: function() {
            viewListUserInfo();
        }
    });
    alert('유저 정보 삭제가 완료 되었습니다.');
    deleteRowUserInfo();
}

// 삭제 요청이 완료되면, 테이블의 row를 삭제
function deleteRowUserInfo() {    // 아이디는 숫자다.
    viewListUserInfo();
}

//// 회원정보 보기 = 리스트 조회    // 전체 완료

// 리스트를 종합적으로 관리하는 함수
function viewListUserInfo() {
    console.log('active view list userInfo!');
    requestUserInfoList();
}

// 리스트를 요청하고 결과값을 반환    // ("/user/list")
async function requestUserInfoList() {
    var result;
    var list = $.ajax("/user/list")
    .done(function() {
        // alert("UserInfo List 불러오기 성공");
        result = JSON.parse(list.responseText);
        // console.log(result);
        showUserInfoList(result);
        return result;
    })
    .fail(function() {
        alert("UserInfo List를 불러오기 실패하였습니다.");
    })
    .always(function() {
        // alert("UserInfo List 불러오기 완료");
    });
}

// 리스트를 html에 보여줌
function showUserInfoList(list) {
    // console.log(list);
    var code = '<table id="user-list-table">';
    var idArr = [];

    for (var i = 0; i < list.length; i++) {
        var info = list[i];
        var id = info.id;

        // console.log('info::');
        // console.dir(info);

        code += '<tr id="user-'+id+'">';

        code += '<td><p id="user-'+ id +'-id">'+ info.id +'</p></td>';
        code += '<td><p id="user-'+ id +'-email">'+ info.email +'</p><input type="email" id="user-'+ id +'-editEmail" placeholder="'+ info.email +'"></td>';
        code += '<td><p id="user-'+ id +'-password">'+ info.password +'</p><input type="password" id="user-'+ id +'-editPassword" placeholder="'+ info.password +'"></td>';

        code += '<td><p id="user-'+ id +'-file">'+ info.originalName +'</p>';
        code += '<div id="user-'+ id +'-form">';
        code += '<form method="POST" action="/attachment" enctype="multipart/form-data" id="user-'+ id +'-form">';
        code += '<input type="file" name="srcFile" id="user-'+ id +'-fileUpload" accept="image/jpeg, image/png, image/gif">';
        code += '<button id="user-'+ id +'-upload" type="submit">파일 업로드</button></form></div></td>';
        // code += '<button id="user-'+ id +'-upload" onclick="userFileUpload('+ id +');">파일 업로드</button></form></div></td>';
        code += '<td><p id="user-'+ id +'-path">'+ info.storedPath +'</p></td>';

        code += '<td>';
        // code += '<td><button id="user-'+ id +'-upload" onclick="userFileUpload('+ id +');">파일 업로드</button>';
        code += '<button id="user-'+ id +'-update" onclick="updateUserInfo('+ id +');">수정</button>';
        code += '<button id="user-'+ id +'-cancel" onclick="cancelUpdateUserInfo('+ id +');">취소</button>';
        code += '<button id="user-'+ id +'-edit" onclick="updateModeUserInfo('+ id +');">수정하기</button>';
        code += '<button id="user-'+ id +'-remove" onclick="deleteUserInfo('+ id +');">삭제</button>';
        code += '<button id="" onclick="">이미지</button></td></tr>';

        idArr.push(id);
    }
    code += '</table>';

    $('#user-list').html(code);

    for (id of idArr) hideEditUserInfo(id);
}

////// 파일 업로딩

// 파일 업로드

// 업로드를 요청하고 업로딩 한 다음 결과값을 반환

// 업로드가 완료되면 수정모드에서 기본모드로 북귀하게 된다.

// 무언가가 파일을 읽고 이를 uploadImageFile() 함수의 파라미터 양식에 맞는 data를 생성하여 반환해야 한다.

function userFileUpload(id) {
    data = new FormData($('#user-'+ id +'-form'));

    console.dir(data);

    uploadImageFile(data);
}

async function uploadImageFile(data) {
    $.ajax({
        url: "/attachment", //컨트롤러 URL
        data: data,
        enctype: 'miltipart/form-data',
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (response) {
            alert("success");
            console.log(response);
        },
        error: function (e) {
            alert(e.responseText);
        }
    });

    /*
    $.ajax({
        type: 'POST',
        url: '/attachment',
        data: data,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function(data, jqXHR, textStatus) {
            alert('업로드에 성공하였습니다!');
            console.dir(data);
            console.dir(jqXHR);
            console.dir(textStatus);
            viewListUserInfo();
        },
        error: function(jqXHR, textStatus, errorThrown) {

        }
    });
    */

    /*
    try {
        let response = await $.ajax({
            type: 'POST',
            url: '/attachment',
            data: data,
            contentType: 'application/json',    // or contentType: false,
            //processData: false,
            success: () => {
                alert('파일 업로드 완료!');
                // add
                viewListUserInfo();
            }
        });
    }
    catch (error) {
        console.log(JSON.stringify(error));
        alert('파일 업로딩에 실패하였습니다.');
        return false;
    }
    */
}









/*
//// 로그인     (이건 나중에 구현된다고 하니 생략한다)
function loginActive() {

}
*/

/*

*** Comment

@PostMapping("/comment/add")
add(@RequestBody Comment comment) {
    return commentService.add(comment);
}

@PutMapping("/comment/update/{id}")
public CommentUsernameProtocol update(@PathVariable Long id, @RequestBody Comment comment) {
    return commentService.update(id, comment);
}

@DeleteMapping("/comment/remove/{id}")
public boolean remove(@PathVariable Long id) {
    return commentService.remove(id);
}

@GetMapping("/comment/view/{id}")
public CommentUsernameProtocol view(@PathVariable Long id) {
    return commentService.view(id);
}

@GetMapping("/comment/list")
public List<CommentUsernameProtocol> listAllComments() {
    return commentService.listAllComments();
}

*/

////// UserController.java와 연계된 (사실은 정경유착인) 정보 처리 함수

//// 댓글 추가  // POST     // 전체 완료

// 버튼을 누르는 순간 댓글추가가 실행된다. 이것은 종합적인 함수다.
function addCommentActive() {
    commentDataSendInPost(readComment());
}

// 테이블에 추가될 댓글의 내용들의 값을 얻는다.
function readComment() {
    return {
        userId: 1,
        content: $('#comment-content').val()
    };
}

// 값을 얻고나면, 이를 서버에 보낸다.
async function commentDataSendInPost(data) {
    try {
        console.log(data);

        let response = await $.ajax({
            type: 'post',
            url: '/comment/add',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: () => {
                alert('댓글 추가하기가 완료되었습니다.');
                emptyCommentField();    // 완료하면 input을 비운다
                viewListComments();
            }
        });
    }
    catch (error) {
        console.log(JSON.stringify(error));
        console.log('Error in SignUpDataSendInPost()');
    }
}

// 추가될 댓글의 input 값을 비운다.
function emptyCommentField() {
    $('#comment-content').val('');
}

//// 댓글 수정 = 댓글 업데이트  // PUT  // ("/comment/update/{id}")

// 댓글을 수정하는 종합적인 함수    // 전체 완료
function updateComment(id) {
    var data = {
        userId: 1,  /*$('#comment-'+ id +'-userId').val()*/
        id: id,
        content: $('#comment-'+ id +'-text').val()
    };
    console.dir(data);
    requestCommentUpdate(data, id);
}

// 댓글 수정버튼을 클릭하게 되면, 디스플레이에서 전환이 일어나야 한다. 그건 나도 모르겠다.

// 댓글 수정이 완료되면, 서버에 수정된 값을 전송하도록 한다.    // 완료
async function requestCommentUpdate(data, id) {
    try {
        let response = await $.ajax({
            type: 'put',
            url: '/comment/update/'+id,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: ()=>{
                alert('댓글 업데이트가 완료 되었습니다.');
                viewListComments();
            }
        });
    }
    catch (error) {
        console.log(JSON.stringify(error));
    }
}

// 전송이 완료되면, input의 값이 비워지다가 input을 아예 안보이게 하거나 삭제한다.
function emptyCommentUpdateField(id) {
    $('#comment-'+ id +'-text').val('');
}

//// 댓글 삭제  // DELETE   // ("/comment/remove/{id}")     // 전체 완료

// 여기서는 종합적으로 처리하는 함수임.
function deleteComment(id) {
    requestCommentDelete(id);
}

// 여기서는 실제로 데이터 삭제를 요청하는 함수 : 결과값이 false면, 테이블의 row가 삭제되지 않는다.
async function requestCommentDelete(id) {
    $.ajax({
        url: '/comment/remove/'+id,
        type: 'DELETE',
        dataType: 'application/json',
        success: function() {
            viewListComments();
        }
    });
    alert('댓글 삭제가 완료되었습니다.');
    viewListComments();
}

//// 댓글 리스트 전체 보기 (리스트 형태로 보기 편하게 처리함)   // GET  // ("/comment/list")    // 전체 완료

// 댓글 리스트 전체보기를 종합적으로 관리하는 함수이다.
function viewListComments() {
    console.log('댓글 리스트 실행');
    requestCommentList();
}

// 요청을 통해 전체 결과값을 받는다.
async function requestCommentList() {
    var result;
    var list = $.ajax("/comment/list")
    .done(function() {
        // alert("Comment List 불러오기 성공");
        result = JSON.parse(list.responseText);
        showCommentList(result);
        return result;
    })
    .fail(function() {
        alert("Comment List 불러오기 실패");
    })
    .always(function() {
        // alert("Comment List 불러오기 완료");
    });
}

// 요청하고 반환받은 결과값을 (분석하여) html의 table에 표시
function showCommentList(list) {
    var code = '<table id="comment-list-table">';
    var idArr = [];

    for (var i = 0; i < list.length; i++) {
        /*
        id, content, created, modified, originalName, storedPath, userId
        */
        var info = list[i];
        var id = info.id;

        idArr.push(id);

        code += '<tr id="comment-' + id + '-id"><td><p id="comment-'+ id +'-id">' + id + '</p></td>';
        code += '<td><p id="comment-' + id + '-userId">' + info.userId + '</p></td>';
        code += '<td><p id="comment-'+ id +'-content">' + info.content + '</p>';
        code += '<input type="text" id="comment-'+ id +'-text" placeholder="'+ info.content +'"></td>';

        code += '<td><button id="comment-'+ id +'-change" onclick="updateComment('+ id +');">변경</button>';
        code += '<button id="comment-'+ id +'-cancel" onclick="cancelUpdateComment('+ id +');">취소</button>';
        code += '<button id="comment-'+ id +'-edit" onclick="showEditComment('+ id +');">수정</button>';
        code += '<button id="comment-'+ id +'-remove" onclick="deleteComment('+ id +');">삭제</button></td></tr>';
    }
    code += '</table>';

    $('#comment-list').html(code);

    for (id of idArr) hideEditComment(id);
}

/// Main
$(document).ready(function() {
    hideLoginBox(); // 처음에 로그인 박스를 보여 줄 필요가 없으니깐.

    viewListUserInfo(); // 리스트를 호출하여 보여준다.
    viewListComments();
});


///// 이거는 쌤으로부터 온 코드임. 로컬라이징화 하여 적용하시길 바란다

// 이거는 회원가입

/*
// GET - AJAX
$.ajax({
    url: "/rest/1/pages/245", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
    data: { name: "홍길동" },  // HTTP 요청과 함께 서버로 보낼 데이터
    method: "GET",   // HTTP 요청 메소드(GET, POST 등)
    dataType: "json" // 서버에서 보내줄 데이터의 타입
})
// HTTP 요청이 성공하면 요청한 데이터가 done() 메소드로 전달됨.
.done(function(json) {
    $("<h1>").text(json.title).appendTo("body");
    $("<div class=\"content\">").html(json.html).appendTo("body");
})
// HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
.fail(function(xhr, status, errorThrown) {
    $("#text").html("오류가 발생했다.<br>")
    .append("오류명: " + errorThrown + "<br>")
    .append("상태: " + status);
})
// 
.always(function(xhr, status) {
    $("#text").html("요청이 완료되었습니다!");
});

*/

/*
var jqxhr = $.ajax("/rest/1/pages/245")
.done(function() {
  alert("성공");
})
.fail(function() {
  alert("실패");
 })
.always(function() {
  alert("완료");
});
      
jqxhr.always(function() {
  alert("두번째 성공");
});
*/




/*
// 회원리스트를 정보들을 html코드로 변환하여 웹에서 보기 편한 방식으로 변경
function setCommentListTable(arr) {
    var list = arr;  // 반환값으로 {}가 여러개인 배열 형태로 보인다고 가정한다.
    var htmlCode = "<table id='user-list-table'>"

    for (info of list) {
        // let username = info.username;
        // let email = info.email;
        // let password = info.password;
        // let storedPath = info.storedPath;
        htmlCode += "<tr>";
        // htmlCode += "<td>" + info.id + "</td>";
        htmlCode += "<td>" + info.userId + "</td>";
        htmlCode += "<td>" + info.content + "</td>";
        htmlCode += "<td>" + info.created + "</td>";
        htmlCode += "<td><button>수정</button><button>삭제</button></td>"
        htmlCode += "</tr>";
    }

    htmlCode += "</table>";
    return htmlCode;
}

// 위에서 html로 변환한 코드를 html에 이식
function setCommentList() {
    var code = setUserListTable(arr);
    var tableFrame = document.getElementById('user-list');
    tableFrame.innerHTML = code;
}
*/
