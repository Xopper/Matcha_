--- if the logged user has sexual pref like male or female
SELECT * FROM `users`
WHERE users.id NOT IN 
(SELECT users.id from users left join Block on (users.id = Block.blocked_id OR users.id = Block.blocker_id) WHERE (Block.blocker_id = 1 or Block.blocked_id = 1))
AND users.id <> 1
AND users.completed = 0
AND users.gender <> [mySelectedSexPrefs]

--- else he is bi we don't need to specifie the gender :)

SELECT * FROM `users`
WHERE users.id NOT IN 
(SELECT users.id from users left join Block on (users.id = Block.blocked_id OR users.id = Block.blocker_id) WHERE (Block.blocker_id = 1 or Block.blocked_id = 1))
AND users.id <> 1
AND users.completed = 0