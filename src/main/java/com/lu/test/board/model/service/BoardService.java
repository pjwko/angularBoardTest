package com.lu.test.board.model.service;

import java.util.ArrayList;

import com.lu.test.board.model.vo.Board;
import com.lu.test.board.model.vo.PageInfo;
import com.lu.test.board.model.vo.Search;

public interface BoardService {
	
	int getBoardListCount(Search sc);
	
	ArrayList<Board> boardList(PageInfo pi, Search sc);
	
	Board getReadBoard(int bId);

	int boardInsert(Board bo);

	int boardUpdate(Board bo);

	int boardDelete(int bId);

	
}
