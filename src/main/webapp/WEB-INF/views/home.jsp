<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" %>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<html>
<head>
    <title>Document</title>
    
		
        <!-- 합쳐지고 최소화된 최신 CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>

        <!-- 부가적인 테마 -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css"/>
       
    	<link rel="stylesheet" href="/test/resources/css/style1.css"/>
    	
    	
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
		<link rel="icon" href="/favicon.ico" type="image/x-icon">

        <!--angular-->
        <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
  			crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.min.js"></script>
        <script src="/test/resources/js/jqueryjs.js"></script>
        <script src="/test/resources/js/controller.js"></script>
          <script src="/test/resources/js/directive.js"></script>
		<script type="text/javascript" src="/test/resources/se2/js/service/HuskyEZCreator.js" charset="utf-8"></script>

</head>
<body ng-app="bullet" ng-init="title='test'">
	
	
	<div ng-controller="bulletCtrl" style="text-align: center;" >
	
	<div>
		
	<h1>
	{{ title }} 
	</h1>
	
	<board-table></board-table>
	<paging-list></paging-list>
	<button ng-click="all()">검색목록 초기화</button>
	<board-search></board-search>
	
	
	<button ng-click="wirterForm()" id="wf">작성하기</button>
	
	

	
	<board-write></board-write>
	<board-detail></board-detail>
	<br><br><br><br>

	</div>
	

		
		
	</div>
	
	
</body>


</html>
