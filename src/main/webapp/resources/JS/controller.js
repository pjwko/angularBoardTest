(function (){
    var app = angular.module('bullet',[]);

  app.factory('bAjax',function($http){
    	
    	return{
    		sendJson :  function(addr,board){
    			return $http.post(addr,board);
    		}
    	}
    	
    });
    
   
    
   app.controller('bulletCtrl',['$scope','$http','$filter','bAjax',function($scope,$http,$filter,bAjax){
    	
    	 //페이지 로딩시 함수실행
    	 angular.element(document).ready(function () {
    		 getList(1)
    		 
    		 //세션 임시지정
    		 $scope.user= "user"
    	 	});
    	 
    	 
         
       
    	 //검색 +페이징
         $scope.search = function(currentPage, category, keyword){
        	 getList(currentPage, category, keyword);
         };
         
         //검색목록 초기화
		 $scope.all = function(){
			 $scope.keyword = "";
			 getList(1)
		 } 
		 

		 //닫기 버튼
		 $scope.closeForm= function(){
			 $("iframe").remove();
			 $("#bDetail").css("display","none");
			 $("#wDetail").css("display","none");
			 $("#bUpDetail").css("display","none");
			 
			 $scope.bId ="";
			 $scope.bTitle ="";
			 $scope.bContent ="";
			 
			 
		 }
		 
		 //게시글 읽기
		 $scope.read = function(bId){
			 getList($scope.currentPage);
			 var bo= {
    				 bId: bId
    		 }
			
			 bAjax.sendJson('bRead.do', bo).then(function(data){
    			var list = data.data.bo;
    		
    			$scope.bId =list.bId;
    			$scope.bWriter = list.bWriter;
    			$scope.bTitle = list.bTitle;
    			$scope.bContent = list.bContent;
    			$scope.cDate = $filter('date')(list.createDate, 'yyyy-MM-dd');
    			$scope.mDate = $filter('date')(list.modifyDate, 'yyyy-MM-dd');
    			$scope.bCount = list.bCount;
    			
    			$scope.writerCheck = ( $scope.user == $scope.bWriter);
    			
    			 $("#bDetail").css("display","block");
    			 $("#wDetail").css("display","none");
    			 $("#bUpDetail").css("display","none");
        		 $("#content").html($scope.bContent);
    			
    		 });

		 }
		 
		 //게시글 삭제
		 $scope.bDel = function(){
			 var bId = $scope.bId;
			 if(confirm(bId +"번 게시글을 삭제 하시겠습니까?")){
				 var bo= {
						 bId:bId
				 }
				 
				 bAjax.sendJson("bDelete.do",bo).then(function(data){
					 var msg =data.data.msg;
					 alert(msg);
					 if(msg == "완료"){
							$scope.bTitle ="";
							$scope.bContent="";
							 $("#bDetail").css("display","none");
							
							getList(1);
						}
				 });
			 }
			 
		 }

		 //게시글 수정폼 생성
		 $scope.update =function(){
			 $("#bUpDetail").css("display","block");
			 $("#wDetail").css("display","none");
			 $("#bDetail").css("display","none");
			 $("iframe").remove();
			 
			 nhn.husky.EZCreator.createInIFrame({
				 oAppRef: oEditors,
				 elPlaceHolder: "uContent",
				 sSkinURI: "/test/resources/se2/SmartEditor2Skin.html",
				 fCreator: "createSEditor2"
				});
			
			 
		 }	 
         
		 //게시글 수정
		$scope.upOk = function(){
							
				var bool = true
				if($scope.bTitle === 'undefined' || $scope.bTitle =="" ){
					alert("제목입력해주세요");
					bool = false;
				}else{
					if($scope.bContents === 'undefined' || $scope.bContents =="" ){
						alert("내용을입력해주세요");
						bool= false;
					}else{
						oEditors.getById["uContent"].exec("UPDATE_CONTENTS_FIELD", []);
						console.log($scope.bContent);
						
						$scope.bo = {
								bId : $scope.bId,
								bWriter : $scope.bWriter,
				       			bTitle : $scope.bTitle,
								bContent : $("#uContent").val()
							  };
							
							
						bAjax.sendJson('bUpdate.do', $scope.bo)
			    				.then(function(data){
			    					var msg =data.data.msg;
			    					alert(msg)
									if(msg == "완료"){
										$scope.bTitle ="";
										$scope.bContent="";
										 $("#bUpDetail").css("display","none");
										
										getList(1);
									}
								
								},function(status){
									alert(status);
								});	
				}

				return bool;
			}
		}
		
		//게시글 작성 폼 생성
		 $scope.wirterForm = function(){
			
			 $("#wDetail").css("display","block");
			 $("#bDetail").css("display","none");
			 $("#bUpDetail").css("display","none");
			
			 $("iframe").remove();
			 
			 $scope.bWriter = $scope.user;
			 $scope.bTitle ="";
			 $scope.bContent ="";
			 
			 nhn.husky.EZCreator.createInIFrame({
				 oAppRef: oEditors,
				 elPlaceHolder: "bContent",
				 sSkinURI: "/test/resources/se2/SmartEditor2Skin.html",
				 fCreator: "createSEditor2"
				});
		
		 }
		 
		 
		//게시글 작성 확인
		$scope.add = function(){
		
			
			var bool = true
			if($scope.bTitle === 'undefined' || $scope.bTitle =="" ){
				alert("제목입력해주세요");
				bool = true
			}else{
				if($scope.bContents === 'undefined' || $scope.bContents =="" ){
					alert("내용을입력해주세요");
					bool = true
				}else{
					oEditors.getById["bContent"].exec("UPDATE_CONTENTS_FIELD", []);
					
					$scope.bo = {
							bWriter : $scope.bWriter,
			       			bTitle : $scope.bTitle,
							bContent : $("#bContent").val()
						  };
						
					$http.post('bInsert.do?bo', $scope.bo)	
							.then(function(data){
								var msg =data.data.msg;
								alert(msg);
								if(msg == "완료"){
									$scope.bTitle ="";
									$scope.bContent="";
									 $("#bContent").val("");
									 $("#wDetail").css("display","none");
									 $scope.category="bTitle";
									 $scope.keyword="";
									getList(1);
								}
							
							},function(status){
								alert(status);
							});
				}
			}		
			return bool;
		}

		 
		 //검색+페이징용 비동기처리 
    	 var getList = function(currentPage){
       
        	 $http({
        		url:"board.do",
        		method:"post",
        		data:$.param({currentPage:currentPage, category: $scope.category,keyword: $scope.keyword}),
        		 headers: {
        		        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        		    }
        		}).then(function(response){
        			var pi = response.data["pi"];
        			var list = response.data["list"];
        			$scope.list = list
        			$scope.currentPage = pi.currentPage;
        			$scope.maxPage = pi.maxPage;
        			$scope.paging = []
        			var currentPage =pi.currentPage;
        			var maxPage = pi.maxPage
        			for(var i = pi.startPage; i <=pi.endPage; i++){
        				 $scope.paging.push(i);
        			 }
        			 
        			 $scope.pagemove = function(item){
        				 if(item == 'pre'){
        					 if(currentPage > 1){
        						 getList(currentPage-1);
        					 }
        				 }else if(item == 'end'){
        					 getList(maxPage);
        				 }else if(item == 'next'){
        					 if(currentPage < maxPage){
        						 getList(currentPage+1);
        					 }
        				 }else{
        					 getList(item);
        				 } 
        			 }
        			
        		},function(error){
        			alert("ajax에러" + error.message)
        		});
         }
        		
  
		 
         
     }]);
  
})();

     
