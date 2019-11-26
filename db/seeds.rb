# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Mission.destroy_all
User.destroy_all

puts "Create Users"
ryan = User.create(email: "ryan@gmail.com", password: "123456")
sara = User.create(email: "sara@gmail.com", password: "123456")
phelim = User.create(email: "phelim@gmail.com", password: "123456")

puts "Create Missions"

Mission.create(name:"Laundry", description:"I need you to do the white laundry (mainly bed sheets 60 degrees) please add sofening", reward:"20 Coins", creator: ryan)
Mission.create(name:"Dishes", description:"Do the dishes from tonights dinner", reward:"15 Coins", creator: sara)
Mission.create(name:"Home Work", description:"Do your maths home work", reward:"30 Coins", creator: phelim)
