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

 CREATE OR REPLACE PROCEDURE TEST_BOARD_DATA AS
BEGIN 
 FOR CNT IN 1..100 LOOP
    insert into board values (SEQ_BID.nextval, '안녕하세요'||SEQ_BID.nextval,'user'||SEQ_BID.nextval,'반가워요',0,sysdate,sysdate,default);
 END LOOP;
  COMMIT;
END;
/

EXEC TEST_BOARD_DATA;
insert into board values (SEQ_BID.nextval, '테스트'||SEQ_BID.nextval,'user','안녕하세요',0,sysdate,sysdate,default);
insert into board values (SEQ_BID.nextval, '테스트1'||SEQ_BID.nextval,'user','체크입니다',0,sysdate,sysdate,default);

 update board set BTITLE ='제목검색용입니다.1', bWriter ='user'
	 WHERE BID = 77;

 update board set BTITLE ='제목검색용입니다.22', bWriter ='user'
	 WHERE BID = 20;

 update board set BTITLE ='User검색되나?', bWriter ='User'
	 WHERE BID = 98;
     
update board set BTITLE ='작성자 검색용', bWriter ='작성자'
	 WHERE BID = 99;
commit;
