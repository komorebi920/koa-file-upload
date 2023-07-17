var fileInput = document.getElementsByTagName("input")[0];

fileInput.addEventListener("change", function (event) {
  var file = event.target.files[0];
  var formData = new FormData();
  formData.append("file", file);

  axios
    .post("/upload", formData)
    .then(function (response) {
      // 处理上传成功后的响应
      var img = document.getElementsByTagName("img")[0];
      var url = response.data.data.url;
      img.src = url;
    })
    .catch(function (error) {
      // 处理上传失败的错误
      console.error("请求发生错误:", error);
    });
});
