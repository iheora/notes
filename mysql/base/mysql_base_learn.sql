# mysql 必知必会

## 1. 数据存储过程

-- 创建数据库

CREATE DATABASE demo;

-- 查看所有数据库

SHOW DATABASES;

-- 创建数据表

CREATE TABLE
    demo.test (
        barcode text,
        goodsname text,
        price int
    );

-- 查看表结构

DESCRIBE demo.test;

-- 查看表

USE demo;

SHOW TABLES;

-- 添加主键，修改表结构

ALTER TABLE demo.test
ADD
    COLUMN itemnumber int PRIMARY KEY AUTO_INCREMENT;

-- 插入数据

INSERT INTO
    demo.test (barcode, goodsname, price)
VALUES ('001', '本', 3);

## 2. 字段类型

-- 创建数据表

CREATE TABLE
    demo.goodsmaster (
        barcode text,
        goodsname text,
        price double,
        itemnumber int PRIMARY KEY AUTO_INCREMENT
    );

-- 插入数据

INSERT INTO
    demo.goodsmaster (barcode, goodsname, price)
VALUES ('0001', '书', 0.47);

INSERT INTO
    demo.goodsmaster (barcode, goodsname, price)
VALUES ('0002', '笔', 0.44);

INSERT INTO
    demo.goodsmaster (barcode, goodsname, price)
VALUES ('0002', '胶水', 0.19);

-- 查询数据

SELECT * FROM demo.goodsmaster;

SELECT SUM(price) FROM demo.goodsmaster;

-- 修改表字段类型

ALTER TABLE demo.goodsmaster MODIFY COLUMN price DECIMAL(5,2);

## 3. 创建、修改数据表

-- 创建表 importhead

CREATE TABLE
    demo.importhead (
        listnumber INT,
        supplierid INT,
        stocknumber INT,
        -- 设置默认值 1
        importtype INT DEFAULT 1,
        quantity DECIMAL(10, 3),
        importvalue DECIMAL(10, 2),
        recorder INT,
        recordingdate DATETIME
    );

-- 插入数据

INSERT INTO
    demo.importhead (
        listnumber,
        supplierid,
        stocknumber,
        -- 没有插入字段 importtype
        quantity,
        importvalue,
        recorder,
        recordingdate
    )
VALUES (
        1234,
        1,
        1,
        10,
        100,
        1,
        '2023-10-09'
    );

-- 查询数据

SELECT * from demo.importhead;