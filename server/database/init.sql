-- ====================================
-- 1. 會員登入資訊表
-- ====================================

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

CREATE TABLE member_basic_info (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE,
  age INTEGER DEFAULT 20,
  gender VARCHAR(10) DEFAULT 'man',
  phone VARCHAR(20),
  address VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES member_info(id) ON DELETE CASCADE
);

CREATE INDEX idx_member_basic_user_id ON member_basic_info(user_id);

-- ====================================
-- 3. 商品資訊表
-- ====================================

CREATE TABLE product_info (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
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

CREATE TABLE order_info (
  cart_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  product_price INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  total INTEGER NOT NULL,
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

-- 插入測試商品
INSERT INTO product_info (name, price, quantity, description, category, product_pic) VALUES
('乳清蛋白粉', 1500, 200, '高品質乳清蛋白粉，1.7kg裝', '營養品', 'https://images.unsplash.com/photo-1584116831322-57d789ed6a40?q=80&w=360'),
('健身手套', 350, 150, '專業健身手套，防滑耐磨', '配件', 'https://images.unsplash.com/photo-1579178937321-3ac1437a28ae?q=80&w=360'),
('運動毛巾', 200, 300, '吸汗快乾運動毛巾', '配件', 'https://images.unsplash.com/photo-1639298107851-058984903954?q=80&w=360');

-- 注意：會員資料由註冊流程自動建立
-- member_basic_info 會在首次訪問時由 API 自動建立

SELECT '資料庫初始化完成！' as message;