package com.lu.test.board.model.dao;

import java.util.ArrayList;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.lu.test.board.model.vo.Board;
import com.lu.test.board.model.vo.PageInfo;
import com.lu.test.board.model.vo.Search;

@Repository("bDao")
public class BoardDao {
	
	@Autowired
	SqlSessionTemplate sqlSession;
	
	public int getBoardListCount(Search sc) {
		return sqlSession.selectOne("boardMapper.getListCount",sc);
	}
	
	public ArrayList<Board> getBoardList(PageInfo pi, Search sc){
		int offset =(pi.getCurrentPage()-1)*pi.getBoardLimit();
		RowBounds rw = new RowBounds(offset, pi.getBoardLimit());
		
		return (ArrayList)sqlSession.selectList("boardMapper.getList",sc,rw);
	}
	
	public int updateCount(int bId) {
		
		return sqlSession.update("boardMapper.countUp",bId);
	}
	
	public Board getReadBoard(int bId) {
		
		return sqlSession.selectOne("boardMapper.readBoard",bId);
	}
	
	


	public int insertBoard(Board bo) {
		
		return sqlSession.insert("boardMapper.insertBoard",bo);
	}

	public int updateBoard(Board bo) {
		System.out.println(bo);
		return sqlSession.update("boardMapper.updateBoard",bo);
	}

	public int deleteBoard(int bId) {
		
		return sqlSession.delete("boardMapper.deleteBoard",bId);
	}

}
