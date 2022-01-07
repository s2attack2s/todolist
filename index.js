if (typeof(Storage) !== 'undefined') {
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
    var date_id = Date.now();
    var input_content = document.getElementById("input_content");
    var input_content_time = document.getElementById("input_content_time");
    var dataArray = [{
            "content": "1",
            "workDay": "20-11-2022",
            "dateCreated": "20-11-2021",
        },
        {
            "content": "abc",
            "workDay": "20-11-2022",
            "dateCreated": "20-11-2021",
        },
        {
            "content": "tesst",
            "workDay": "20-11-2022",
            "dateCreated": "20-11-2021",
        }
    ]
    var listData = JSON.parse(localStorage.getItem("dataArray"));
    //thêm mới ghi chú
    var submit = () => {
        if (input_content) {

            let newItem = {
                content: input_content.value,
                workDay: input_content_time.value,
                dateCreated: formattedDate,
            }

            listData.push(newItem);

            localStorage.setItem('dataArray', JSON.stringify(listData));
            window.location.reload();
        } else {
            alert('Bạn chưa nhập nội dung')
        }
        document.getElementById("input_content").value = "";
        document.getElementById('input_content_time').value = "mm/dd/yyyy";
    }

    //xóa ghi chú
    var removeContent = id => {
        if (confirm("Bạn xác nhận xóa ghi chú này?")) {
            listData.splice(id, 1);
            localStorage.setItem('dataArray', JSON.stringify(listData));
            window.location.reload();
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
        console.log(updateContent);
        if (updateContent) {
            listData.splice(idUpdate, 1);
            let newItemUpdate = {
                content: updateContent,
                workDay: updateTime,
                dateCreated: formattedDate,
            }
            listData.splice(idUpdate, 0, newItemUpdate);
            localStorage.setItem('dataArray', JSON.stringify(listData));
            window.location.reload();
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
    var obj = JSON.parse(JSON.stringify(listData));
    var showData = () => {
        for (i = 0; i < listData.length; i++) {
            let newDiv = document.createElement("div");
            newDiv.className = 'content_group';
            newDiv.id = "content_group_" + i;

            //khởi tạo div hiển thị nội dung
            let newDivDetails = document.createElement('div');
            newDivDetails.className = "content_group_details";
            newDivDetails.id = "content_group_details_" + i;
            newDivDetails.innerHTML = obj[i].content;
            newDiv.appendChild(newDivDetails);

            //khởi tạo div hiển thị ngày làm
            let newDivTime = document.createElement('div');
            newDivTime.className = "content_group_time";
            newDivTime.id = "content_group_time_" + i;
            newDivTime.innerHTML = obj[i].workDay;
            newDiv.appendChild(newDivTime);

            //khởi tạo div hiển thị ngày tạo
            let newDivAddTime = document.createElement('div');
            newDivAddTime.className = "content_group_add_time";
            newDivAddTime.innerHTML = obj[i].dateCreated;
            newDiv.appendChild(newDivAddTime);

            //khởi tạo div tùy chọn
            let newDivOption = document.createElement('div');
            newDivOption.className = "content_group_option";

            //khởi tạo button edit
            let newButtonEdit = document.createElement('button');
            newButtonEdit.className = "edit";
            newButtonEdit.setAttribute("onclick", "edit(" + i + ")");
            newButtonEdit.innerHTML = "Sửa"
            newDivOption.appendChild(newButtonEdit);
            newDiv.appendChild(newDivOption);

            //khởi tạo button delete
            let newButtonDelete = document.createElement('button');
            newButtonDelete.className = "delete";

            newButtonDelete.setAttribute("onclick", "removeContent(" + i + ")");
            newButtonDelete.innerHTML = "Xóa"
            newDivOption.appendChild(newButtonDelete);
            newDiv.appendChild(newDivOption);

            let todo_list_content = document.getElementById("todo_list_content");
            todo_list_content.insertBefore(newDiv, todo_list_content.childNodes[1]);
        }
    }
    showData();
} else {
    alert('Trình duyệt không hỗ trợ')
}