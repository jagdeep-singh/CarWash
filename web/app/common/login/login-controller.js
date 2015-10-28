﻿(function () {
    angular.module('carwash.myControllers').controller('loginController',[
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'commonService',
        'authenticationService',
        function ($scope, $state, apiUrlConfig, apiMethods, commonService, authenticationService) {
        
        $scope.onLoginClick = function () {
            console.log($scope.loginForm);
            if($scope.loginForm.$invalid){
                if($scope.loginForm.$error.required != null){
                    $scope.loginForm.$error.required.forEach(function(element){
                        element.$setDirty();
                    });
                }
                return;
            }
            var url = apiUrlConfig.login;
            var reqObj = $scope.login;
            apiMethods.apiPOSTReq(url, reqObj).then(function (response) {
                console.log("success", response);
                commonService.saveObjToLocalStore(response.data);
                $state.go("home.pickUp");
            }, function (response) {
                $scope.loginForm.loginEmail.$invalid = true;
                $scope.loginForm.loginPassword.$invalid = true;
                commonService.onApiResponseError(response);
            });
        };
            
        $scope.onSignUpClick = function () {
            $state.go("signUp");
        };
            
        $scope.onForgotPassSubmitClick = function(){
            if($scope.forgotPasswordForm.$invalid){
                if($scope.forgotPasswordForm.$error.required != null){
                    $scope.forgotPasswordForm.$error.required.forEach(function(element){
                        element.$setDirty();
                    });
                }
                return;
            }
            var url = apiUrlConfig.forgotPassword;
            var reqObj = $scope.forgotPassword;
            apiMethods.apiPOSTReq(url, reqObj).then(function (response) {
                console.log("service success !!!!!");
                commonService.showSuccessMsg(response.data.message);
                $scope.onForgotPassCancelClick();
                $scope.forgotPassword.userId = "";
                $scope.forgotPasswordForm.forgotEmailId.$dirty = false;
            }, function(response){
                commonService.onApiResponseError(response);
            });
        };

        $scope.forgotPasswordClick = function(){
            $scope.forgotPasswordDiv = true;
        };

        $scope.onForgotPassCancelClick = function(){
            $scope.forgotPasswordDiv = false;
        }
    }]);
})();