Mission.destroy_all
WishList.destroy_all
Like.destroy_all
User.destroy_all

# creator: dad - this was in the create above
puts "Create Users"
mum1 = User.create!(email: "sara@google.com", password: "123123", avatar: "003-dinosaur.png", reward_amount: nil, first_name: "Sara", last_name: "Strom", parent_id: nil, is_parent: true)
mum2 = User.create!(email: "sara@gmail.com", password: "123123", avatar: "wizard.png", reward_amount: nil, first_name: "Sara", last_name: "Strom", parent_id: nil, is_parent: true)
kid1 = User.create!(email: "charlie@google.com", password: "123123", avatar: "pegasus.png", reward_amount: 0, first_name: "Charlie", last_name: "Strom", parent_id: mum2.id, is_parent: false)
kid2 = User.create!(email: "charlie@gmail.com", password: "123123", avatar: "robot.png", reward_amount: 0, first_name: "Charlie", last_name: "Strom", parent_id: mum1.id, is_parent: false)

puts "Create Missions"

Mission.create!(name:"Laundry", description:"I need you to do the white laundry (mainly bed sheets 60 degrees)", reward: 20, creator: mum2, completed: false, icon: "laundryright.png", verify: false, user: kid1)
Mission.create!(name:"Dishes", description:"Do the dishes from tonights dinner", reward: 15, creator: mum1, completed: true, icon: "dish.png", verify: false, user: kid1)
Mission.create!(name:"Walk the dog", description:"Not Hugo, only Dennis", reward: 30, creator: mum2, completed: true, icon: "dog.png", verify: true, user: kid2)

puts "Create WL"

wish1 = WishList.new(title: "Doll House", amount: 100, user: kid2)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1575453764/dollhouse_rkqoe4.jpg')
wish1.photo.attach(io: file, filename: 'winter.png', content_type: 'image/png')
wish1.save!

wish7 = WishList.new(title: "Stay up an extra hour", amount: 40, user: kid1)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1575456477/Screenshot_2019-12-04_at_10.47.13_am_nh6wlb.png')
wish7.photo.attach(io: file, filename: 'default.png', content_type: 'image/png')
wish7.save!

wish2 = WishList.new(title: "Batman Figure", amount: 50, user: kid1)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1575452999/Screenshot_2019-12-04_at_9.49.33_am_yx7lr6.png')
wish2.photo.attach(io: file, filename: 'Spider-Man.png', content_type: 'image/png')
wish2.save!

wish6 = WishList.new(title: "The Sims", amount: 60, user: kid1)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574863854/Screenshot_2019-11-27_at_2.10.17_pm_epvsbz.png')
wish6.photo.attach(io: file, filename: 'sims.png', content_type: 'image/png')
wish6.save!

wish3 = WishList.new(title: "Avengers Legends Ant-Man Gear", amount: 100, user: kid2)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574863851/Screenshot_2019-11-27_at_2.03.18_pm_na9frm.png')
wish3.photo.attach(io: file, filename: 'ant-man.png', content_type: 'image/png')
wish3.save!

wish4 = WishList.new(title: "Harry Potter Hogwarts Battle Book of Monsters Expansion", amount: 250, user: kid2)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1574863852/Screenshot_2019-11-27_at_2.06.00_pm_l1r3iq.png')
wish4.photo.attach(io: file, filename: 'harry-potter.png', content_type: 'image/png')
wish4.save!

wish5 = WishList.new(title: "Fifa 20", amount: 60, user: kid2)
file = URI.open('https://res.cloudinary.com/debjoekzj/image/upload/v1575455232/fifa_hi8n5b.jpg')
wish5.photo.attach(io: file, filename: 'fifa', content_type: 'image/png')
wish5.save!

puts "Done!"
