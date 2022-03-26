function getCommentList() {
    $.ajax({
        method: "GET",
        url: "http://www.liulongbin.top:3006/api/cmtlist",
        data: {},
        success: function (res) {
            if (res.status !== 200) {
                return alert(res.msg);
            }
            // 获取成功后的操作
            var rows = []
            $.each(res.data, function (i, item) {
                // 循环拼接字符串
                rows.push('<li class="list-group-item">第 ' + item.id + ' 条评论 : ' + item.content + '<span class="badge" style="background-color: #f0ad4e;">评论时间 : ' + item.time + '</span><span class="badge" style="background-color: #5bc0de;">评论人 : ' + item.username + '</span></li>')
            })
            $('#cmt-list').empty().append(rows.join(''))
            // 渲染列表的UI结构
        }
    })
}
getCommentList()

$(function () {
    $('#formAddCmt').submit(function (e) {
        e.preventDefault();
        // 以上阻止表单的提交行为
        // 以下获取表单数据
        var data = $(this).serialize();
        //////////////////////////////////////////////////////////////////
        $.post("http://www.liulongbin.top:3006/api/addcmt", data, function (res) {
            if (res.status !== 201) {
                return alert(res.msg);
            }
            // 发表评论成功 , 刷新评论列表
            getCommentList()
            // 清空文本框
            $('#formAddCmt')[0].reset();
            // $('#formAddCmt')[0]  jQuery 转为 DOM 对象  .reset()是 DOM 的方法
        })
        //////////////////////////////////////////////////////////////////
        // setCommentList(data)
        //////////////////////////////////////////////////////////////////
    })
})
// 以下未完成
// function setCommentList(data) {
//     $.ajax({
//         method: "POST",
//         url: "http://www.liulongbin.top:3006/api/addcmt",
//         data: {
//             data.split(',')
//         },
//         success: function (res) {
//             if (res.status !== 201) {
//                 return alert(res.msg);
//             }
//             // 获取成功后的操作
//             getCommentList()
//         }
//     })
// }