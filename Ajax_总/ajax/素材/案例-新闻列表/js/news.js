$(function () {

    // 定义格式化时间的过滤器
    template.defaults.imports.dateFormat = function (timers) {
        var date = new Date(timers)

        var yy = date.getFullYear();
        var mm = date.getMonth() + 1;
        mm = mm < 10 ? '0' + mm : mm;
        var dd = date.getDate();
        dd = dd < 10 ? '0' + dd : dd;
        var hh = date.getHours();
        hh = hh < 10 ? '0' + hh : hh;
        var MM = date.getMinutes();
        MM = MM < 10 ? '0' + MM : MM;
        var ss = date.getSeconds();
        ss = ss < 10 ? '0' + ss : ss;

        return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + MM + ':' + ss;
    }

    // 获取新闻列表的函数
    function getNewsList() {
        $.get("http://www.liulongbin.top:3006/api/news", function (res) {
            if (res.status !== 200) {
                return alert(res.msg);
            }
            // 成功获取新闻列表之后的操作
            // 将 tags 从字符串转换为 数组
            for (let index = 0; index < res.data.length; index++) {
                res.data[index].tags = res.data[index].tags.split(",");
            }
            // 3.得到数据
            var htmlStr = template("news", res);
            // console.log(res);
            // console.log(htmlStr);
            // 4. 输出到html
            $("#news-list").html(htmlStr);
        });
    }
    getNewsList();
});
