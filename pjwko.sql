drop table board;
CREATE TABLE BOARD(
    BID NUMBER CONSTRAINT boardPk primary key,
    BTITLE VARCHAR(100),
    BWRITER VARCHAR2(50),
    BCONTENT VARCHAR2(1000),
    BCOUNT NUMBER DEFAULT 0, 
    CREATE_DATE DATE DEFAULT SYSDATE,
    MODIFY_DATE DATE DEFAULT SYSDATE,
    STATUS VARCHAR2(10) DEFAULT 'Y'
);

DROP SEQUENCE SEQ_BID;
CREATE SEQUENCE SEQ_BID
START WITH 1
INCREMENT BY 1
NOCYCLE
NOCACHE;
commit;


insert into board values (SEQ_BID.nextval, '안녕하세요','user01','반가워요',0,sysdate,sysdate,default);
commit;
	 update board set BTITLE ='ada', BCONTENT = '123123', MODIFY_DATE = sysdate
	 WHERE BID = 4;
select * from board where bTitle like '%안녕%' or bcontent like '%안녕%';
commit;
update board set btitle='안녕' where bId BETWEEN  30 and 50;
