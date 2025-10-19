-- ====================================
-- 瀘州健身房管理系統 - PostgreSQL 初始化腳本
-- ====================================

-- 創建資料庫（需要先以超級用戶登入執行）
-- CREATE DATABASE luzhou_gym WITH ENCODING 'UTF8';
-- \c luzhou_gym;

-- ====================================
-- 1. 會員登入資訊表
-- ====================================
DROP TABLE IF EXISTS member_info CASCADE;

CREATE TABLE member_info (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  vertify SMALLINT DEFAULT 0 CHECK (vertify IN (0, 1))
);

CREATE INDEX idx_member_user ON member_info(username);
CREATE INDEX idx_member_email ON member_info(email);
CREATE INDEX idx_member_vertify ON member_info(vertify);

-- ====================================
-- 2. 會員基本資料表
-- ====================================
DROP TABLE IF EXISTS member_basic_info CASCADE;

CREATE TABLE member_basic_info (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE,
  age INTEGER DEFAULT NULL,
  gender VARCHAR(10) DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES member_info(id) ON DELETE CASCADE
);

CREATE INDEX idx_member_basic_user_id ON member_basic_info(user_id);

-- ====================================
-- 3. 商品資訊表
-- ====================================
DROP TABLE IF EXISTS product_info CASCADE;

CREATE TABLE product_info (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  description TEXT DEFAULT NULL,
  product_pic VARCHAR(255) DEFAULT NULL,
  category VARCHAR(50) DEFAULT NULL,
  status SMALLINT DEFAULT 1 CHECK (status IN (0, 1)),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_name ON product_info(name);
CREATE INDEX idx_product_category ON product_info(category);
CREATE INDEX idx_product_status ON product_info(status);

-- ====================================
-- 4. 訂單資訊表
-- ====================================
DROP TABLE IF EXISTS order_info CASCADE;

CREATE TABLE order_info (
  cart_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  product_price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  total NUMERIC(10,2) NOT NULL,
  product_pic VARCHAR(255) DEFAULT NULL,
  pay SMALLINT DEFAULT 0 CHECK (pay IN (0, 1)),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES member_info(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product_info(id) ON DELETE RESTRICT
);

CREATE INDEX idx_order_user_id ON order_info(user_id);
CREATE INDEX idx_order_product_id ON order_info(product_id);
CREATE INDEX idx_order_pay ON order_info(pay);
CREATE INDEX idx_order_created_at ON order_info(created_at);

-- ====================================
-- 5. 驗證碼表
-- ====================================
DROP TABLE IF EXISTS random_table CASCADE;

CREATE TABLE random_table (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  randomCode VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES member_info(id) ON DELETE CASCADE
);

CREATE INDEX idx_random_user_id ON random_table(user_id);
CREATE INDEX idx_random_code ON random_table(randomCode);
CREATE INDEX idx_random_created_at ON random_table(created_at);

-- ====================================
-- 插入測試資料
-- ====================================
INSERT INTO member_info (username, password, email, vertify) VALUES
('testuser1', '$2a$10$example.hash.password.here', 'test1@example.com', 1),
('testuser2', '$2a$10$example.hash.password.here', 'test2@example.com', 1);

INSERT INTO member_basic_info (user_id, age, gender) VALUES
(1, 25, '男'),
(2, 28, '女');

INSERT INTO product_info (name, price, quantity, description, category, product_pic) VALUES
('月費會籍', 1200.00, 999, '單月健身房使用權限', '會籍', '/images/monthly_membership.jpg'),
('季費會籍', 3200.00, 999, '三個月健身房使用權限，享95折優惠', '會籍', '/images/quarterly_membership.jpg'),
('年費會籍', 10800.00, 999, '全年健身房使用權限，享75折優惠', '會籍', '/images/annual_membership.jpg'),
('個人教練課程 (5堂)', 5000.00, 50, '一對一私人教練課程，5堂優惠組合', '課程', '/images/personal_training.jpg'),
('團體課程 (10堂)', 3000.00, 100, '團體健身課程，10堂優惠組合', '課程', '/images/group_class.jpg'),
('乳清蛋白粉', 1500.00, 200, '高品質乳清蛋白粉，1kg裝', '營養品', '/images/protein.jpg'),
('健身手套', 350.00, 150, '專業健身手套，防滑耐磨', '配件', '/images/gloves.jpg'),
('運動毛巾', 200.00, 300, '吸汗快乾運動毛巾', '配件', '/images/towel.jpg');

SELECT '資料庫初始化完成！' as message;