package com.lu.test.board.model.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lu.test.board.model.dao.BoardDao;
import com.lu.test.board.model.vo.Board;
import com.lu.test.board.model.vo.PageInfo;
import com.lu.test.board.model.vo.Search;

@Service("bService")
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	private BoardDao bDao;

	@Override
	public int getBoardListCount(Search sc) {
		
		return bDao.getBoardListCount(sc);
	}

	@Override
	public ArrayList<Board> boardList(PageInfo pi, Search sc) {
		// TODO Auto-generated method stub
		return  bDao.getBoardList(pi, sc);
		}
	
	@Override
	public Board getReadBoard(int bId) {
		
		int count = bDao.updateCount(bId);
		Board bo = bDao.getReadBoard(bId);
		return bo;
	}

	@Override
	public int boardInsert(Board bo) {
		
		return bDao.insertBoard(bo);
	}

	@Override
	public int boardUpdate(Board bo) {
		
		return bDao.updateBoard(bo);
	}

	@Override
	public int boardDelete(int bId) {
		return bDao.deleteBoard(bId);
	}

	
	

}
