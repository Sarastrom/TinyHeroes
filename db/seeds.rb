# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Mission.destroy_all
WishList.destroy_all
Like.destroy_all
User.destroy_all

# creator: dad - this was in the create above
puts "Create Users"
dad = User.create!(email: "dad@aol.com", password: "123213", avatar: nil, reward_amount: nil, first_name: "Ryan", last_name: "Fleming", parent_id: nil, is_parent: true)
mum = User.create!(email: "mum@aol.com", password: "324123", avatar: nil, reward_amount: nil, first_name: "Betty", last_name: "Fleming", parent_id: nil, is_parent: true)
kid1 = User.create!(email: "kid1@aol.com", password: "2421321", avatar: nil, reward_amount: 250, first_name: "weeRyan", last_name: "Fleming", parent_id: dad.id, is_parent: false)
kid2 = User.create!(email: "kid2@aol.com", password: "5435123", avatar: nil, reward_amount: 550, first_name: "weeBetty", last_name: "Fleming", parent_id: dad.id, is_parent: false)

puts "Create Missions"

Mission.create!(name:"Laundry", description:"I need you to do the white laundry (mainly bed sheets 60 degrees) please add sofening", reward:"20 Coins", creator: dad)
Mission.create!(name:"Dishes", description:"Do the dishes from tonights dinner", reward:"15 Coins", creator: dad)
Mission.create!(name:"Home Work", description:"Do your maths home work", reward:"30 Coins", creator: dad)

puts "Create WL"

wish1 = WishList.new(title: "Winter Disco Chalet Doll Houses", amount: "50 Coins", user: kid2)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574858232/Screenshot_2019-11-27_at_12.30.47_pm_oa6pgn.png')
wish1.image.attach(io: file, filename: 'winter.png', content_type: 'image/png')
wish1.save!

wish2 = WishList.new(title: "Marvel Spider-Man: Far From Home Titan Hero Series", amount:"50 Coins", user: kid1)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574938820/Screenshot_2019-11-28_at_11.00.07_am_vx1klf.png')
wish2.image.attach(io: file, filename: 'Spider-Man.png', content_type: 'image/png')
wish2.save!

wish3 = WishList.new(title: "Avengers Legends Ant-Man Gear", amount: "50 Coins", user: kid2)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574863851/Screenshot_2019-11-27_at_2.03.18_pm_na9frm.png')
wish3.image.attach(io: file, filename: 'ant-man.png', content_type: 'image/png')
wish3.save!

wish4 = WishList.new(title: "Harry Potter Hogwarts Battle Book of Monsters Expansion", amount:"50 Coins", user: kid2)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574863852/Screenshot_2019-11-27_at_2.06.00_pm_l1r3iq.png')
wish4.image.attach(io: file, filename: 'harry-potter.png', content_type: 'image/png')
wish4.save!

wish5 = WishList.new(title: "iPhone 11", amount:"50 Coins", user: kid1)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1575039963/Screenshot_2019-11-29_at_3.05.47_pm_r0iyaf.png')
wish5.image.attach(io: file, filename: 'iphone.png', content_type: 'image/png')
wish5.save!

wish6 = WishList.new(title: "The Sims", amount:"50 Coins", user: kid1)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574863854/Screenshot_2019-11-27_at_2.10.17_pm_epvsbz.png')
wish6.image.attach(io: file, filename: 'sims.png', content_type: 'image/png')
wish6.save!

wish7 = WishList.new(title: "Play fifa for 2 h", amount:"50 Coins", user: kid1)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574937713/Screenshot_2019-11-28_at_10.40.57_am_fhkxvv.png')
wish7.image.attach(io: file, filename: 'default.png', content_type: 'image/png')
wish7.save!

puts "Done!"
