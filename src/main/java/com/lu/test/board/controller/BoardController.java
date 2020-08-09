package com.lu.test.board.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lu.test.board.model.service.BoardService;
import com.lu.test.board.model.vo.Board;
import com.lu.test.board.model.vo.PageInfo;
import com.lu.test.board.model.vo.Search;

@Controller
public class BoardController {
	
	@Autowired
	private BoardService bService;
	
	
	/**
	 * @Method 설명: 보드리스트 가져오기 + 페이징
	 * @param response
	 * @param currentPage
	 * @param sc
	 * @return
	 */
	@ResponseBody
	@RequestMapping("board.do")
	public Map<String,Object> boardList  (  @RequestParam(value="currentPage",required=false,defaultValue="1") int currentPage,
			@ModelAttribute Search sc) {

		PageInfo pi;

		ArrayList<Board> boardList;
		if(sc.getKeyword()=="") {
			sc.setKeyword(null);
		}
		
		
	
		
		int listCount = bService.getBoardListCount(sc);

		//페이지네이션
		int pageLimit = 5;
		int boardLimit=10;
		
		int maxPage = (int)Math.ceil((double)listCount/boardLimit);
		int startPage = (currentPage-1)/pageLimit*pageLimit +1;
		int endPage = startPage + pageLimit -1;
		
		if(endPage>maxPage) {
			endPage = maxPage;
		}
		
		 pi = new PageInfo(currentPage, listCount, pageLimit, maxPage, startPage, endPage,boardLimit );
		 boardList= bService.boardList(pi, sc);
		 
		 Map<String,Object> pulling = new HashMap();
		 
		 pulling.put("list",boardList);
		 pulling.put("pi",pi);
		 
		 return pulling;
		 
	}
	
	/**
	 * @Method 설명: 게시글 읽기
	 * @param response
	 * @param bo
	 * @return
	 * @throws IOException
	 */
	@ResponseBody
	@RequestMapping("bRead.do")
	public HashMap<String,Object> boardRead(HttpServletResponse response, @RequestBody Board bo) throws IOException {
		response.setContentType("application/json; charset=UTF-8");
		
		bo = bService.getReadBoard(bo.getbId());

		HashMap<String,Object> map = new HashMap<String, Object>();
		
		map.put("bo",bo);
		return map;
	
	}
	
	
	/**
	 * @Method 설명: 게시글 넣기
	 * @param response
	 * @param bo
	 * @return
	 */
	@ResponseBody
	@RequestMapping("bInsert.do")
	public HashMap<String,Object> boardInsert(HttpServletResponse response, @RequestBody Board bo)  {
		response.setContentType("application/json; charset=UTF-8");
		int result =0;
		result = bService.boardInsert(bo);

		return returnMsg(result);
		
	}
	

	/**
	 * @Method 설명: 게시글 업데이트
	 * @param response
	 * @param bo
	 * @return
	 */
	@ResponseBody
	@RequestMapping("bUpdate.do")
	public HashMap<String,Object> boardUpdate(HttpServletResponse response, @RequestBody Board bo)  {
		int result =0;
		response.setContentType("application/json; charset=UTF-8");

		
		
		result = bService.boardUpdate(bo);
		
		return returnMsg(result);
		
		
		 
	}
	

	
	/**
	 * @Method 설명: 게시글 삭제
	 * @param bo
	 * @return
	 */
	
	@ResponseBody
	@RequestMapping("bDelete.do")
	public Map<String,Object> boardDelete(@RequestBody Board bo) {
		int result =0;
		
		int bId= bo.getbId();
		
		result = bService.boardDelete(bId);
		
		return returnMsg(result);
	}
	
	
	/**
	 * @Method 설명: 성공/실패메세지 보내기(alert)
	 * @param result
	 * @return
	 */
	public HashMap<String,Object> returnMsg(int result) {
		String msg="";
		if(result == 1) {
			msg ="완료";
		}else {
			msg ="실패";
		}
		
		HashMap<String,Object> map = new HashMap<String, Object>();
		
		map.put("msg",msg);
		 return map;
	}
	

}
