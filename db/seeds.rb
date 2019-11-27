# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Mission.destroy_all
WishList.destroy_all
User.destroy_all

puts "Create Users"
ryan = User.create(email: "ryan@gmail.com", password: "123456")
sara = User.create(email: "sara@gmail.com", password: "123456")
phelim = User.create(email: "phelim@gmail.com", password: "123456")

puts "Create Missions"

Mission.create(name:"Laundry", description:"I need you to do the white laundry (mainly bed sheets 60 degrees) please add sofening", reward:"20 Coins", creator: ryan)
Mission.create(name:"Dishes", description:"Do the dishes from tonights dinner", reward:"15 Coins", creator: sara)
Mission.create(name:"Home Work", description:"Do your maths home work", reward:"30 Coins", creator: phelim)

puts "Create WL"

wish1 = WishList.new(title: "Winter Disco Chalet Doll Houses", amount: "50 Coins", user: ryan)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574858232/Screenshot_2019-11-27_at_12.30.47_pm_oa6pgn.png')
wish1.photo.attach(io: file, filename: 'winter.jpg', content_type: 'image/jpg')
wish1.save!

wish2 = WishList.new(title: "Marvel Spider-Man: Far From Home Titan Hero Series", amount:"50 Coins", user: sara)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574862857/Screenshot_2019-11-27_at_1.53.24_pm_sqp4yc.png')
wish2.photo.attach(io: file, filename: 'Spider-Man.jpg', content_type: 'image/jpg')
wish2.save!

wish3 = WishList.new(title: "Avengers Legends Ant-Man Gear", amount: "50 Coins", user: phelim)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574863851/Screenshot_2019-11-27_at_2.03.18_pm_na9frm.png')
wish3.photo.attach(io: file, filename: 'ant-man.jpg', content_type: 'image/jpg')
wish3.save!

wish4 = WishList.new(title: "Harry Potter Hogwarts Battle Book of Monsters Expansion", amount:"50 Coins", user: ryan)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574863852/Screenshot_2019-11-27_at_2.06.00_pm_l1r3iq.png')
wish4.photo.attach(io: file, filename: 'harry-potter.jpg', content_type: 'image/jpg')
wish4.save!

wish5 = WishList.new(title: "iPhone 11", amount:"50 Coins", user: sara)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574863853/Screenshot_2019-11-27_at_2.09.19_pm_ieh1c8.png')
wish5.photo.attach(io: file, filename: 'iphone.jpg', content_type: 'image/jpg')
wish5.save!

wish6 = WishList.new(title: "The Sims", amount:"50 Coins", user: phelim)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574863854/Screenshot_2019-11-27_at_2.10.17_pm_epvsbz.png')
wish6.photo.attach(io: file, filename: 'sims.jpg', content_type: 'image/jpg')
wish6.save!

puts "Done!"

