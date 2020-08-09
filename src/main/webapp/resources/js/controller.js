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
    		 getList(1);
    		 $scope.viewFra = "";	
    		 
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
		 };
		 
		 //검색 엔터키
		 $scope.searchEnter  = function($event){
			if($event.originalEvent.charCode == 13){
				$scope.search(1);
			}
		 }
		 
		

		 //닫기 버튼
		 $scope.closeForm= function(){
			
			 $scope.bId ="";
			 $scope.bTitle ="";
			 $scope.bContent ="";

			 $scope.viewFra = "";
			 
						 
			 
		 }
		 
		 //게시글 읽기
		 $scope.read = function(bId){
			 
			 getList($scope.currentPage);
			 var bo= {
    				 bId: bId
    		 }
			 $scope.viewFra = "read";
			 bAjax.sendJson('bRead.do', bo).then(function(data){
    			var list = data.data.bo;
    			
    			$scope.bId =list.bId;
    			$scope.bWriter = list.bWriter;
    			$scope.bTitle = list.bTitle;
    			$scope.bContent = list.bContent;
    			$scope.cDate = $filter('date')(list.createDate, 'yyyy-MM-dd');
    			$scope.mDate = $filter('date')(list.modifyDate, 'yyyy-MM-dd');
    			$scope.bCount = list.bCount;
 
    			$("#content").html($scope.bContent);
    			
    		
    			$scope.writerCheck = ( $scope.user == $scope.bWriter);
    			
    			 
        		 
    			
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
							$scope.viewFra = "";
							
							getList(1);
						}
				 });
			 }
			 
		 }

		 //게시글 수정폼 생성
		 $scope.update =function(){
			 $scope.viewFra = "write";
			 $scope.writerCheck = ( $scope.user == $scope.bWriter);
			 $("iframe").remove();
			 
			 nhn.husky.EZCreator.createInIFrame({
				 oAppRef: oEditors,
				 elPlaceHolder: "bContent",
				 sSkinURI: "/test/resources/se2/SmartEditor2Skin.html",
				 fCreator: "createSEditor2"
				});
			 
			 
			 $("#bContent").val($scope.bContent);
			
			 
		 }	 
		 
		 $scope.updateFrom =function(){
			
		 }
         
		 //게시글 수정
		$scope.upOk = function(){
			
			oEditors.getById["bContent"].exec("UPDATE_CONTENTS_FIELD", []);
			
			$scope.bContent = $("#bContent").val();
			
				var bool = true;
				if($scope.bTitle === 'undefined' || $scope.bTitle=="" ){
					alert("제목입력해주세요");
					bool = false;
				}else{
					if($scope.bContent === 'undefined' || $scope.bContent.length<17 ){
						alert("내용은 10글자 이상입력해주세요");
						bool= false;
					}else{
						
						$scope.bo = {
								bId : $scope.bId,
								bWriter : $scope.bWriter,
				       			bTitle : $scope.bTitle,
								bContent : $scope.bContent
							  };
							
						bAjax.sendJson('bUpdate.do', $scope.bo)
			    				.then(function(data){
			    					var msg =data.data.msg;
			    					alert(msg)
									if(msg == "완료"){
										 $scope.read($scope.bId);									
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
			 $scope.bTitle ="";
			 $scope.bContent ="";
			 $scope.bWriter = $scope.user; 
		     $scope.viewFra = "write";	
		     $scope.writerCheck =false;
		     $("iframe").remove();
		   
		     nhn.husky.EZCreator.createInIFrame({
				 oAppRef: oEditors,
				 elPlaceHolder: "bContent",
				 sSkinURI: "/test/resources/se2/SmartEditor2Skin.html",
				 fCreator: "createSEditor2"
				});
		     
		     $("#bContent").val("");
			
		     
		   
		
		 }
		 
		 
		//게시글 작성 확인
		$scope.add = function(){
			
			oEditors.getById["bContent"].exec("UPDATE_CONTENTS_FIELD", []);

			$scope.bContent = $("#bContent").val();
			
			
			var bool = true;
			if($scope.bTitle === 'undefined' || $scope.bTitle =="" ){
				alert("제목입력해주세요");
				console.log($scope.bContent.length);
			bool = false;
			}else{
		
				if($scope.bContent === 'undefined' || $scope.bContent.length<17){
					alert("내용은 10글자 이상입력해주세요");
					bool = false;
				}else{
					
					$scope.bo = {
							bWriter : $scope.bWriter,
			       			bTitle : $scope.bTitle,
							bContent : $scope.bContent
						  };	
					
					
					$http.post('bInsert.do', $scope.bo)	
							.then(function(data){
								var msg =data.data.msg;
								alert(msg);
								if(msg == "완료"){
									$scope.bTitle ="";
									$scope.bContent="";
									$scope.viewFra = "";
									 $("#bContent").val("");
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
        		
        			for(var i = pi.startPage; i <=pi.endPage; i++){
        				 $scope.paging.push(i);
        			 };
        			
        		},function(error){
        			alert("ajax에러" + error.message)
        		});
         }
    	 
    	 //페이지 이동 버튼
    	 $scope.pagemove = function(item){
    		 var cp = $scope.currentPage;
    		 var mp = $scope.maxPage;
			 if(item == 'pre'){
				 if( cp > 1){
					 getList(cp-1);
				 }
			 }else if(item == 'end'){
				 getList(mp);
			 }else if(item == 'next'){
				 if(cp < mp){
					 getList(cp+1);
				 }
			 }else{
				 getList(item);
			 } 
		 }
        		
  
		 
         
     }]);
  
})();

     
