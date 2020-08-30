//試したいこと
//やりたいこと
(function (window) {
    var CoopEcCore = {
        ga: '',
        messages: []
    };
    var Order = function (CoopEcCore) {
        return function () {
            "use strict";
            // private field変数
            var self = this;
            var URL = '/add';
            // public field変数
            self.content = '';
            self.result = '';
            self.postData = function (data) {
                return $.ajax({
                    type: 'POST',
                    url: URL,
                    data: data
                });
            };
            //注文開始
            self.init = function (content, render, errorRender) {
                console.log(self);
                self.content = content;
                self.render = render || self.render;
                self.errorRender = errorRender || self.errorRender;
                //TODO 多分 認証のためにsessionの値を入れる処理があると思われる
                //POSTであればcsrf値を入れる
                //self.session = $('session')
                //注文実行
                self.postData(self.content).done(function (data) {
                    //TODO 共通の正常系ハンドリング
                    if (data.statusCode != null) {
                        self.render();
                    }
                    alert(JSON.stringify(data));
                }).fail(function (error) {
                    //TODO 共通の正常系ハンドリング
                    self.errorRender();
                });
            };
            self.render = function () {
                $('#result').css('display', 'block');
            };
            self.errorRender = function () {
                $('#errorResult').text('エラーが発生しました');
                alert('error!');
            };
            self.ga = function () {
            };
        };
    };
    window.coopEc = window.coopEc || {};
    window.coopEc.Order = window.coopEc.Order || Order(CoopEcCore);
})(window);
$(function () {
    /*
    $('#add').on('click',function(){
      var onSuccess = function(data){
        alert(JSON.stringify(data))
      }
      var onError = function(data){
        alert("失敗！")
      }
      //getData('/add',onSuccess,onError)
    })
    */
    $('#order').on('click', function () {
        var product = $('#product').val();
        var order = new window.coopEc.Order();
        order.init(product);
    });
});
