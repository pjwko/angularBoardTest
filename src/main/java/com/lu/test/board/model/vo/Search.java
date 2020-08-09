package com.lu.test.board.model.vo;

public class Search {
	private String category;
	private String keyword;
	public Search() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Search(String category, String keyword) {
		super();
		this.category = category;
		this.keyword = keyword;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	@Override
	public String toString() {
		return "Search [category=" + category + ", keyword=" + keyword + "]";
	}
	
	
}
