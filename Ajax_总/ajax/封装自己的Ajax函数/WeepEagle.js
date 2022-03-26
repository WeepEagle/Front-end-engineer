// 拼接字符串
function resolveData(data) {
    var arr = []
    for (const key in data) {
        var str = key + '=' + data[key] // 输出格式为 key=data[key]
        arr.push(str) // 现在还是字符串数组 [key=data[key],key=data[key],key=data[key]]
    }
    return arr.join('&') // 现在是字符串 'key=data[key]&key=data[key]&key=data[key]'
}
// var res = resolveData({ name: 'zs', age: 20 })
// console.log(res);


//

// 主函数 : new xhr 对象 发送请求
function WeepEagle(options) {
    // 新建一个对象
    var xhr = new XMLHttpRequest();

    // 把外界传递过来的参数对象 , 转换为查询字符串
    var qs = resolveData(options.data)

    // 判断 options.method 发送的是什么请求
    if (options.method.toUpperCase() === 'GET') {  // toUpperCase() 转换成大写
        // 发起 GET 请求
        xhr.open(options.method, options.url + '?' + qs)
        xhr.send()

    } else if (options.method.toUpperCase() === 'POST') {
        // 发起 POST 请求
        xhr.open(options.method, options.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(qs)

    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText)
            options.success(result)
        }
    }

}