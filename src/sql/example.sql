create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price numeric(10, 2) not null,
  stock_quantity integer not null default 0,
  created_at timestamptz default now() not null
);

alter table products enable row level security;

create policy "Allow public read"
  on products for select
  using (true);


-- addding data

insert into products (name, category, price, stock_quantity) values

('Sony WH-1000XM5 Headphones', 'Electronics', 349.99, 34),
('Apple AirPods Pro 2nd Gen', 'Electronics', 249.99, 67),
('Samsung 65" QLED TV', 'Electronics', 1199.99, 8),
('Logitech MX Master 3S Mouse', 'Electronics', 99.99, 145),
('Dell 27" 4K Monitor', 'Electronics', 449.99, 22),
('Anker 26800mAh Power Bank', 'Electronics', 69.99, 89),
('Bose QuietComfort 45', 'Electronics', 279.99, 0),
('iPad Pro 12.9" M2', 'Electronics', 1099.99, 15),
('Mechanical Keyboard GMMK Pro', 'Electronics', 169.99, 41),
('Elgato Stream Deck MK.2', 'Electronics', 149.99, 28),

('Levi''s 511 Slim Jeans', 'Clothing', 69.99, 203),
('Nike Tech Fleece Hoodie', 'Clothing', 119.99, 88),
('Patagonia Down Sweater', 'Clothing', 229.99, 33),
('Adidas Ultraboost 22', 'Clothing', 189.99, 0),
('Uniqlo Ultra Light Down Jacket', 'Clothing', 89.99, 156),
('Champion Reverse Weave Crewneck', 'Clothing', 59.99, 74),
('New Balance 990v5', 'Clothing', 184.99, 19),
('Carhartt WIP Watch Hat', 'Clothing', 29.99, 312),
('Arc''teryx Beta AR Jacket', 'Clothing', 799.99, 7),
('Vans Old Skool Pro', 'Clothing', 74.99, 91),

('Dyson V15 Detect Vacuum', 'Home & Garden', 749.99, 23),
('Philips Hue Starter Kit', 'Home & Garden', 199.99, 55),
('Instant Pot Duo 7-in-1', 'Home & Garden', 99.99, 134),
('Ninja AF101 Air Fryer', 'Home & Garden', 129.99, 78),
('Cuisinart 14-Cup Coffee Maker', 'Home & Garden', 149.99, 44),
('iRobot Roomba j7+', 'Home & Garden', 599.99, 0),
('Weber Spirit II Gas Grill', 'Home & Garden', 529.99, 11),
('Vitamix 5200 Blender', 'Home & Garden', 449.99, 17),
('Nespresso Vertuo Next', 'Home & Garden', 179.99, 62),
('Himalayan Salt Lamp Large', 'Home & Garden', 34.99, 190),

('Peloton Bike+', 'Sports', 2495.00, 5),
('Hydro Flask 32oz Water Bottle', 'Sports', 49.99, 234),
('TRX All-in-One Suspension Trainer', 'Sports', 189.99, 38),
('Bowflex SelectTech 552 Dumbbells', 'Sports', 429.99, 14),
('Garmin Forerunner 955', 'Sports', 499.99, 29),
('Osprey Atmos AG 65 Backpack', 'Sports', 289.99, 0),
('GoPro HERO11 Black', 'Sports', 399.99, 43),
('Lululemon Yoga Mat 5mm', 'Sports', 88.00, 127),
('Theragun PRO', 'Sports', 599.00, 21),
('Manduka PRO Yoga Mat', 'Sports', 120.00, 86),

('Atomic Habits - James Clear', 'Books', 16.99, 500),
('The Lean Startup - Eric Ries', 'Books', 14.99, 342),
('Clean Code - Robert Martin', 'Books', 44.99, 178),
('Designing Data-Intensive Apps', 'Books', 59.99, 95),
('Zero to One - Peter Thiel', 'Books', 17.99, 267),
('The Pragmatic Programmer', 'Books', 49.99, 133),
('Deep Work - Cal Newport', 'Books', 15.99, 411),
('System Design Interview Vol 2', 'Books', 35.99, 88),
('The Psychology of Money', 'Books', 18.99, 359),
('Dune - Frank Herbert', 'Books', 19.99, 0),

('Milwaukee M18 Drill Combo Kit', 'Tools', 329.99, 31),
('DeWalt 20V MAX Circular Saw', 'Tools', 179.99, 47),
('Makita 18V LXT Jigsaw', 'Tools', 159.99, 0),
('Klein Tools Multimeter', 'Tools', 89.99, 76),
('WORKPRO 320-Piece Tool Set', 'Tools', 109.99, 54),
('Bosch 12V Max Rotary Tool', 'Tools', 129.99, 28),
('Ryobi 18V ONE+ Combo Kit', 'Tools', 279.99, 39),
('Fluke 117 Electricians Multimeter', 'Tools', 219.99, 12),
('Stanley FatMax Toolbox', 'Tools', 79.99, 163),
('Milwaukee Packout Rolling Cart', 'Tools', 349.99, 9);
