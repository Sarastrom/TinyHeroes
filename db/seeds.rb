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
dad = User.create!(email: "dad@aol.com", password: "123213", avatar: nil, reward_amount: nil, first_name: "Ryan", last_name: "Fleming", parent_id: nil, is_parent: true)
mum = User.create!(email: "mum@aol.com", password: "324123", avatar: nil, reward_amount: nil, first_name: "Betty", last_name: "Fleming", parent_id: nil, is_parent: true)
kid1 = User.create!(email: "kid1@aol.com", password: "2421321", avatar: nil, reward_amount: 250, first_name: "weeRyan", last_name: "Fleming", parent_id: dad.id, is_parent: false)
kid2 = User.create!(email: "kid2@aol.com", password: "5435123", avatar: nil, reward_amount: 550, first_name: "weeBetty", last_name: "Fleming", parent_id: dad.id, is_parent: false)

puts "Create Missions"

Mission.create!(name:"Laundry", description:"I need you to do the white laundry (mainly bed sheets 60 degrees) please add sofening", reward:"20 Coins", creator: dad)
Mission.create!(name:"Dishes", description:"Do the dishes from tonights dinner", reward:"15 Coins", creator: dad)
Mission.create!(name:"Home Work", description:"Do your maths home work", reward:"30 Coins", creator: dad)


# creator: dad - this was in the create above
