
angular.module("cutregram").controller("DetallePostCtrl", function($scope, Post) {

    $scope.post = Post.data;

    // Volvemos atrás en el histórico del navegador.
    $scope.volver = function() {

        history.back();
    };

});
