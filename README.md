# glide-app-low-code-notification-app

&nbsp;&nbsp;&nbsp;&nbsp;This app is being built using a low-code platform like [Glide App](https://www.glideapps.com/), along with a bit of coding([code is here!](https://github.com/rachataptnn/lowCodeNotificationApp/blob/main/notification.js)) in [Google App Script](https://www.google.com/script/start/). Its purpose is to create a Notification App quickly ⏫. I believe that combining **Glide App** with **Google Sheets** and **Google Apps Script** is very versatility. 

&nbsp;&nbsp;&nbsp;&nbsp;If anyone wants to build their own app, whether for fun or it's your homework, Never hesitate to ask me if you encounter any difficulties. 😎

<br/>

## Guide Outline
#### Tables Infomations
| Topic | Description |
|----------|----------|
| [users table](#1-users-table-) | What is table look like and tell you what data use for |
| [notification](#2-notifications-table-) | What is table look like and tell you what data use for |

#### Implement Things in Glide App
| Topic | Description |
|----------|----------|
| [Prepare data source](#1-prepare-data-source) | How to plug google sheet to Glide App |
| [User list](#2-create-ui-for-user-list) | Create User List UI step by step |
| [Notification list](#3-add-notification-list) | How to build Notification List UI |
| [Filter Notification list](#4-filter-out-irrelevant-data) | How to filter non-related data out of Noti List |
| [Edit user issue](#5-fix-issue-in-the-edit-user-page) | If you have problem with editing User, read this |
| [Edit notification issue](#6-fix-issue-in-the-edit-notification-page) | have some trouble about Notification editing? |
| [Create notification issue](#7-fix-issue-in-the-create-notification-page) | Did you create noti successful? if not read this |

#### Google App Script
| Topic | Description |
|----------|----------|
| [How to set Trigger](#how-to-set-google-app-script-trigger) | about to set the Trigger |

<br/>

## Tables 
&nbsp;&nbsp;&nbsp;&nbsp;only two tables for make this App work! one for storing user data and another for storing notification data. [click to see an example google sheet](https://docs.google.com/spreadsheets/d/13OWFRS1Xbt0gZ8Wy-7Aep35vEVP59h9S-cvVfvOU5Qw/edit#gid=1847604068)

### 1. users table 👤
![table-users](https://github.com/rachataptnn/lowCodeNotificationApp/assets/133649727/7d529742-544e-44eb-b7ea-e032c9d86a31)
#### Usage
- **UI** : name, description, image
- **Line Messaging** : lineAuthToken
- **Table joining** : Row ID

<br/>

### 2. notifications table 🔔
![table-notifications](https://github.com/rachataptnn/lowCodeNotificationApp/assets/133649727/75543bee-c5bf-4b0e-b019-7bcb39223dd1)
#### Usage
- **UI** : Time, Message, Name, Image
- **Line Messaging** : UserID(for find lineAuthToken), Time, Message

<br/>

## Glide APP

### 1. Prepare Data source 
![prepare-data-source](https://github.com/rachataptnn/lowCodeNotificationApp/assets/133649727/01f16210-a67d-45e1-bccb-72c53336e0b3)

1. Create google sheet: users, notification
2. read this for config your [Row ID](https://www.glideapps.com/docs/row-id-column)
3. Create new app in Glide App
4. Connect your Google Sheet to GlideApp by clicking the **'+'** button at the top left.

<br/>

### 2. Create UI for User List
![ui-user-list](https://github.com/rachataptnn/lowCodeNotificationApp/assets/133649727/4d1c8959-a99b-4883-8376-7917b7067979)

1. Delete all existing components.
2. Click the **'+'** button and search for 'Collection'. Select the type 'Card'.
3. Choose the data source 'users' at the top right.
4. Modify the title, style, and select columns for UI mapping at the bottom right.

<br/>

### 3. Add Notification List

![add-noti-list](https://github.com/rachataptnn/glide-app-low-code-notification-app/assets/133649727/a063aab3-fdaf-4c12-a68f-6f2c29538e67)

- To access this page, click on any picture on the list page.
- Add component 'Collection', this time i choose 'List' Type
- select 'Notifications' data source at the top right
- Modify style, and select columns for UI mapping at the bottom right.
- adjust Page size at the bottom right for make Pagination UI

<br/>

### 4. Filter out irrelevant data! 

![noti9](https://github.com/rachataptnn/lowCodeNotificationApp/assets/133649727/877f1339-8045-43fe-9cda-1fafc9d50f90)

- At the top right, Click 'Option'
- Again, I use filter like this → If **UserID** == "a"(**UserID** never been "a", when we creating the notifications we grab UserID from column **Row ID** in the table users)
- If success the notifications list should be shorter 🎉

<br/>

### 5. Fix issue in the Edit User Page
- Click the **'...'** at the top right of the Image
  
![user-list](https://github.com/rachataptnn/lowCodeNotificationApp/assets/133649727/140dd96b-4c2a-4358-95f2-09baa5334df6)

- We need to remove **Row ID** out from UI. users are not allow to edit this field

![noti6](https://github.com/rachataptnn/lowCodeNotificationApp/assets/133649727/1e351f29-40c3-4a10-beeb-ae43e61567c4)

#### How? 

- Click tab 'Option' at the top right.
- Create any filter that return **False** for make this Field invisible(we need to send this field while updating data, just hide it from user)
- For me I use filter like this → If **Row ID** == "a"(**Row ID** that GlideApp was generated never been "a" so it always **False**)

![noti7](https://github.com/rachataptnn/lowCodeNotificationApp/assets/133649727/28e04c49-7129-46bd-a62c-d7c52dd5e0ce)

<br/>

### 6. Fix issue in the Edit Notification Page

![user-id-should-not-visible](https://github.com/rachataptnn/lowCodeNotificationApp/assets/133649727/59e8281d-1b64-4c49-9cc7-6df76a928c65)

- same as Edit User Page, This page need to send UserID but no need to let's use modify it

![user-id-in-edit-noti-was-removed](https://github.com/rachataptnn/lowCodeNotificationApp/assets/133649727/337305f1-d0d1-4b8c-873d-e24bb3c7a81f)

- Click tab 'Option'
- Put any false condition to it for make this UI invisible

<br/>

### 7. Fix issue in the Create Notification Page
&nbsp;&nbsp;&nbsp;&nbsp;too lazy to fully explain, just map **Row ID** correctly. 🚀🚀

<br/>

## Google App Script
### How to set google app script Trigger
&nbsp;&nbsp;&nbsp;&nbsp;just set like this

exec function **sendDailyNotifications()** every 1 minute
