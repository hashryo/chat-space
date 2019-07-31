# chat-space
## membersテーブル
|Column|Type|Options|
|------|----|-------|
|member_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|name|string|null: false|
|Email|string|null: false|
|password|string|null: false|
### Association
- has_many :chats
- has_many :groups, through: :members_groups
## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|group_name|string|null: false|
### Association
- has_many :chats
- has_many :members, through: :members_groups
## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|member_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :member
- belongs_to :group
## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|chat_id|integer|null: false|
|member_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|text|text|null: false|
|image|text||
### Association
- belongs_to :member
- belongs_to :group