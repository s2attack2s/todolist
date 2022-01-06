//định dạng ngày tháng hiển thị
var pad2 = n => {
    return (n < 10 ? '0' : '') + n;
}
pad2();

var date = new Date();
var month = pad2(date.getMonth() + 1);
var day = pad2(date.getDate());
var year = date.getFullYear();
var formattedDate = year + "-" + month + "-" + day;

//thêm mới ghi chú
var submit = () => {

    var input_content = document.getElementById('input_content').value;
    var input_content_time = document.getElementById('input_content_time').value;
    var date_id = Date.now();

    if (input_content) {
        //Khởi tạo div content_group
        let newDiv = document.createElement("div");
        newDiv.className = 'content_group';
        newDiv.id = "content_group_" + date_id;

        //khởi tạo div hiển thị nội dung
        let newDivDetails = document.createElement('div');
        newDivDetails.className = "content_group_details";
        newDivDetails.id = "content_group_details_" + date_id;
        newDivDetails.innerHTML = input_content;
        newDiv.appendChild(newDivDetails);

        //khởi tạo div hiển thị ngày làm
        let newDivTime = document.createElement('div');
        newDivTime.className = "content_group_time";
        newDivTime.id = "content_group_time_" + date_id;
        newDivTime.innerHTML = input_content_time;
        newDiv.appendChild(newDivTime);

        //khởi tạo div hiển thị ngày tạo
        let newDivAddTime = document.createElement('div');
        newDivAddTime.className = "content_group_add_time";
        newDivAddTime.innerHTML = formattedDate;
        newDiv.appendChild(newDivAddTime);

        //khởi tạo div tùy chọn
        let newDivOption = document.createElement('div');
        newDivOption.className = "content_group_option";

        //khởi tạo button edit
        let newButtonEdit = document.createElement('button');
        newButtonEdit.className = "edit btn";
        newButtonEdit.setAttribute("onclick", "edit(" + date_id + ")");
        newButtonEdit.innerHTML = "Sửa"
        newDivOption.appendChild(newButtonEdit);
        newDiv.appendChild(newDivOption);

        //khởi tạo button delete
        let newButtonDelete = document.createElement('button');
        newButtonDelete.className = "delete btn";

        newButtonDelete.setAttribute("onclick", "removeContent(" + date_id + ")");
        newButtonDelete.innerHTML = "Xóa"
        newDivOption.appendChild(newButtonDelete);
        newDiv.appendChild(newDivOption);

        let todo_list_content = document.getElementById("todo_list_content");
        todo_list_content.insertBefore(newDiv, todo_list_content.childNodes[1]);


    } else {
        alert('Bạn chưa nhập nội dung')
    }
    document.getElementById("input_content").value = "";
    document.getElementById('input_content_time').value = "mm/dd/yyyy";

}


//xóa ghi chú
var removeContent = id => {
    if (confirm("Bạn xác nhận xóa ghi chú này?")) {
        var div_remove = document.getElementById("content_group_" + id);
        div_remove.remove();
    }
}

//add nội dung ghi chú
var edit = id => {
    var divValueContent = document.getElementById('content_group_details_' + id);
    document.getElementById('input_content_update').value = divValueContent.innerHTML;
    var divValueTime = document.getElementById('content_group_time_' + id);
    document.getElementById('input_content_time_update').value = divValueTime.innerHTML;
    var buttonUpdate = document.getElementById('button_submit_update');
    buttonUpdate.setAttribute("onclick", "update(" + id + ")");

    var todo_list = document.getElementById('todo_list');
    todo_list.style.display = "none";

    var form = document.getElementById('form_update');
    form.style.display = "flex";
}



//sửa ghi chú
var update = idUpdate => {

    var updateContent = document.getElementById('input_content_update').value;
    var updateTime = document.getElementById('input_content_time_update').value;
    if (updateContent) {
        document.getElementById('content_group_details_' + idUpdate).innerHTML = updateContent;
        document.getElementById('content_group_time_' + idUpdate).innerHTML = updateTime;
        var todo_list = document.getElementById('todo_list');
        todo_list.style.display = "block";
        var form = document.getElementById('form_update');
        form.style.display = "none";
    } else {
        alert('Bạn chưa nhập nội dung')
    }
}

//đóng form sửa ghi chú
var closeUpdate = () => {
    var form = document.getElementById('form_update');
    form.style.display = "none";
    var todo_list = document.getElementById('todo_list');
    todo_list.style.display = "block";
}