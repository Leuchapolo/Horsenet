User.create!([
  {email: "taco@meatball.com", encrypted_password: "$2a$11$wHn3ndOHgzqoKiZBdUnXce/cABgnO2XxYUgEaHO30QW3Iz7G1H356", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2016-05-12 22:32:06", last_sign_in_at: "2016-05-12 22:32:06", current_sign_in_ip: "::1", last_sign_in_ip: "::1", name: "Taco", place_of_birth: nil, current_place_of_residence: nil, work: nil, current_show: nil, next_class: nil, specialization: nil, bio: nil, profile_picture: nil},
  {email: "mikesta@gmail.com", encrypted_password: "$2a$11$t.NPYMxF2pNYDbsg2dW52uFRT1.wmFtZS/wDznuRX2VHzLpqE9NBC", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 3, current_sign_in_at: "2016-05-12 23:25:29", last_sign_in_at: "2016-05-12 22:42:42", current_sign_in_ip: "::1", last_sign_in_ip: "::1", name: "Noah", place_of_birth: nil, current_place_of_residence: nil, work: nil, current_show: nil, next_class: nil, specialization: nil, bio: nil, profile_picture: nil},
  {email: "leucha@gmail.com", encrypted_password: "$2a$11$pQbx6bWN8fkxbmfV2Pv.8uBCKHZaTcZ18LRO6I0SOu6y7H.DHdtte", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 3, current_sign_in_at: "2016-05-14 22:13:26", last_sign_in_at: "2016-05-12 23:25:12", current_sign_in_ip: "::1", last_sign_in_ip: "::1", name: "Michael", place_of_birth: "Key Biscayne, FL", current_place_of_residence: "Wellington, FL", work: "Software Engineer at Google", current_show: "WEF", next_class: "High Juniors", specialization: "Jumpers", bio: "I love horses. And lamp.", profile_picture: "mikeyProfilePicture.jpg"}
])
Horse.create!([
  {name: "Petunia", user_id: 1, birth_year: 2004, specialty: "Hunters", profile_picture: "horse-jumping.jpg"}
])
Post.create!([
  {text: "Just won a big class", original_poster: 1},
  {text: "Just won an even bigger class", original_poster: 1},
  {text: "Broke my femur and will be retiring", original_poster: 1},
  {text: "This text shouldn't show up", original_poster: 2},
  {text: "This text should not show", original_poster: 2},
  {text: "I just tweeted a lot of bad things about you.", original_poster: 3},
  {text: "I like unicorns better than horses. They make better candidates for my best friend. Of all time that is", original_poster: 3},
  {text: "I really like riding around on horses but I wish they were dragons", original_poster: 3},
  {text: "I eat pickles with marinara sauce", original_poster: 1},
  {text: "Banana republic has the best shirts", original_poster: 1},
  {text: "I go to prom in Cabo every year ", original_poster: 1},
  {text: "I'm a king kong man, I'm a voodoo man, no I'm an Apeman", original_poster: 2},
  {text: "Really thinking about letting my horse live in my house let me know your thoughts", original_poster: 1},
  {text: "OMG finally found my saddle", original_poster: 3},
  {text: "I ate a camel once", original_poster: 2}
])
PostTag.create!([
  {taggable_id: 1, taggable_type: "User", post_id: 1},
  {taggable_id: 1, taggable_type: "User", post_id: 2},
  {taggable_id: 1, taggable_type: "User", post_id: 3},
  {taggable_id: 2, taggable_type: "User", post_id: 4},
  {taggable_id: 2, taggable_type: "User", post_id: 5},
  {taggable_id: 3, taggable_type: "User", post_id: 6},
  {taggable_id: 3, taggable_type: "User", post_id: 7},
  {taggable_id: 3, taggable_type: "User", post_id: 1},
  {taggable_id: 1, taggable_type: "User", post_id: 1},
  {taggable_id: 2, taggable_type: "User", post_id: 1},
  {taggable_id: 3, taggable_type: "User", post_id: 8},
  {taggable_id: 1, taggable_type: "User", post_id: 9},
  {taggable_id: 1, taggable_type: "User", post_id: 12},
  {taggable_id: 1, taggable_type: "User", post_id: nil},
  {taggable_id: 2, taggable_type: "User", post_id: 13},
  {taggable_id: 1, taggable_type: "User", post_id: 14},
  {taggable_id: 1, taggable_type: "Horse", post_id: 16}
])
UserFollow.create!([
  {follower_id: 2, following_id: 1, following_type: "User"},
  {follower_id: 1, following_id: 2, following_type: "User"},
  {follower_id: 2, following_id: 3, following_type: "User"}
])
