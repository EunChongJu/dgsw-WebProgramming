
//// 값 관리
var FileValues = function() {
    this.storedPath;
    this.originalName;

    this.setValues = function(storedPath, originalName) {
        this.storedPath = storedPath;
        this.originalName = originalName;
    };

    this.getValues = function() {
        return {
            storedPath: this.storedPath,
            originalName: this.originalName
        };
    };
}

var fileValues = new FileValues();

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
    var fv = fileValues.getValues();
    return {
        username: $('#user-'+ id +'-id').val(),
        email: $('#user-'+ id +'-editEmail').val(),
        password: $('#user-'+ id +'-editPassword').val(),
        storedPath: fv.storedPath,
        originalName: fv.originalName
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
    $('#user-'+ id +'-fileUpload').val('');
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
    var code = '<table id="user-list-table">';
    var idArr = [];

    for (var i = 0; i < list.length; i++) {
        var info = list[i];
        var id = info.id;

        code += '<tr id="user-'+id+'">';

        code += '<td><p id="user-'+ id +'-id">'+ info.id +'</p></td>';
        code += '<td><p id="user-'+ id +'-email">'+ info.email +'</p><input type="email" id="user-'+ id +'-editEmail" placeholder="'+ info.email +'"></td>';
        code += '<td><p id="user-'+ id +'-password">'+ info.password +'</p><input type="password" id="user-'+ id +'-editPassword" placeholder="'+ info.password +'"></td>';

        code += '<td><p id="user-'+ id +'-file">'+ info.originalName +'</p>';
        code += '<div id="user-'+ id +'-form">';
        code += '<form method="POST" action="/attachment" enctype="multipart/form-data" id="user-'+ id +'-form" onsubmit="return false;">';
        code += '<input type="file" name="srcFile" id="user-'+ id +'-fileUpload" accept="image/jpeg, image/png, image/gif" multiple="true">';

        code += '<button id="user-'+ id +'-upload" onclick="userFileUpload('+ id +');">파일 업로드</button></form></div></td>';
        code += '<td><p id="user-'+ id +'-path">'+ info.storedPath +'</p></td>';

        code += '<td><button id="user-'+ id +'-update" onclick="updateUserInfo('+ id +');">수정</button>';
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
    // var file = $('#user-'+ id +'-fileUpload');
    // console.dir(file);

    var form = $('#user-'+ id +'-form');
    // var form = '#user-'+ id +'-form';
    console.dir(form);

    var formData = new FormData();
    // var formData = new FormData(document.getElementById(form));
    // formData.append('srcFile', file[0]);
    formData.append('srcFile', $('#user-'+ id +'-fileUpload')[0].files[0]);

    console.dir(formData);

    uploadImageFile(formData);
}

function uploadImageFile(data) {
    $.ajax({
        url: "/attachment",
        data: data,
        enctype: 'miltipart/form-data',
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (res) {
            if (fileSetUp(res)) {
                alert("업로드 완료되었습니다!");
                console.log(res);
            }
        },
        error: function (e) {
            alert(e.responseText);
        }
    });
}

function fileSetUp(res) {   // 파일 셋업, 반환값을 바탕으로 업데이트에 반영될 수 있도록 처리한다.
    fileValues.setValues(res.storedPath, res.originalName); // res.storedPath, res.originalName
    return true;
}

/*
//// 로그인     (이건 나중에 구현된다고 하니 생략한다)
function loginActive() {

}
*/

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
