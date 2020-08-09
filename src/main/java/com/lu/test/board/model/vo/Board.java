package com.lu.test.board.model.vo;

import java.sql.Date;

import org.springframework.stereotype.Component;

@Component
public class Board {
	private int bId;
	private String bTitle;
	private String bWriter;
	private String bContent;
	private int bCount;
	private Date createDate;
	private Date modifyDate;
	private char status;
	
	
	public Board() {

	}


	public Board(String bTitle, String bWriter, String bContent) {
		
		this.bTitle = bTitle;
		this.bWriter = bWriter;
		this.bContent = bContent;
	}


	public Board(int bId, String bTitle, String bWriter, String bContent, int bCount, Date createDate,
			Date modifyDate, char status) {
		super();
		this.bId = bId;
		this.bTitle = bTitle;
		this.bWriter = bWriter;
		this.bContent = bContent;
		this.bCount = bCount;
		this.createDate = createDate;
		this.modifyDate = modifyDate;
		this.status = status;
	}


	public int getbId() {
		return bId;
	}


	public void setbId(int bId) {
		this.bId = bId;
	}


	public String getbTitle() {
		return bTitle;
	}


	public void setbTitle(String bTitle) {
		this.bTitle = bTitle;
	}


	public String getbWriter() {
		return bWriter;
	}


	public void setbWriter(String bWriter) {
		this.bWriter = bWriter;
	}


	public String getbContent() {
		return bContent;
	}


	public void setbContent(String bContent) {
		this.bContent = bContent;
	}


	public int getbCount() {
		return bCount;
	}


	public void setbCount(int bCount) {
		this.bCount = bCount;
	}


	public Date getCreateDate() {
		return createDate;
	}


	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}


	public Date getModifyDate() {
		return modifyDate;
	}


	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}


	public char getStatus() {
		return status;
	}


	public void setStatus(char status) {
		this.status = status;
	}


	@Override
	public String toString() {
		return "bId=" + bId + ", bTitle=" + bTitle + ", bWriter=" + bWriter + ", bContent=" + bContent
				+ ", bCount=" + bCount + ", createDate=" + createDate + ", modifyDate=" + modifyDate + ", status="
				+ status ;
	}
	
	
	
	
	
}
