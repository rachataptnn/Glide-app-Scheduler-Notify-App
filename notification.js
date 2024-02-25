/**
 * This function sends messages to people at specific times every day. 
 * It gets a list of people and the messages from google sheet. 
 * Then, it checks the list of messages one by one. 
 * If it's time to send a message, 
 * it looks up the person who should get the message. 
 * After finding the person in google sheet, it sends them the message.
 */
function sendDailyNotifications() {
  // Retrieve user and notification data from the sheet
  var data = getDataFromSheet();
  var users = data.users;
  var notifications = data.notifications;

  // Iterate through each notification entry
  for (var i = 1; i < notifications.length; i++) {
    var notificationRow = notifications[i];
    var notificationTime = notificationRow[1];
    var notificationMessage = notificationRow[2];
     
    // Check if it's time for this notification
    if (isTimeForNotification(notificationTime)) {
      var userId = notificationRow[0];

      // Find the user corresponding to the notification
      var foundUser = users.find(function(user) {
        return user[0] == userId;
      });
      
      // If user is found, send the notification
      if (foundUser) {
        var userName = foundUser[1];
        var lineAuthToken = foundUser[2];
        sendNotificationToUser(lineAuthToken, notificationMessage, userName);
      } else {
        // Log an error if user is not found
        Logger.log("User ID: " + userId + " is not found in the Users sheet.");
      }
    }
  }
}

/**
 * This function checks if it's time to send a message.
 * It compares the current time with the time for the message.
 * If they match, it's time to send the message!
 */
function isTimeForNotification(notificationTime) {
  // Get the current time
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();

  // Get the hour and minute for the message
  var hourAndMinute = notificationTime.split(':');
  var notificationHour = parseInt(hourAndMinute[0]);
  var notificationMinute = parseInt(hourAndMinute[1]);
      
  // Check if the current time matches the message time
  return currentHour === notificationHour && currentMinute === notificationMinute;
}

/**
 * This function gets data from google sheet.
 * It finds two lists inside the sheet: one for users and one for notifications.
 */
function getDataFromSheet() {
  // Open the spreadsheet and find the lists of users and notifications
  var userInfoSheet = SpreadsheetApp.openById('13OWFRS1Xbt0gZ8Wy-7Aep35vEVP59h9S-cvVfvOU5Qw').getSheetByName('users');
  var notiTimeSheet = SpreadsheetApp.openById('13OWFRS1Xbt0gZ8Wy-7Aep35vEVP59h9S-cvVfvOU5Qw').getSheetByName('notifications');

  // Get all the data from the user and notification lists
  var users = userInfoSheet.getDataRange().getValues(); // Get all user data
  var notifications = notiTimeSheet.getDataRange().getValues(); // Get all notification data
  
  // Log the collected data so we can see it
  Logger.log("Users: " + JSON.stringify(users)); // Log user data
  Logger.log("Notifications: " + JSON.stringify(notifications)); // Log notification data
  
  // Return the collected data for users and notifications
  return {
    users: users,
    notifications: notifications
  };
}

/**
 * This function sends a message to a person by using LINE.
 * It needs three things to work: 
 * - the message to send, 
 * - a special token for LINE,
 * First, it creates a web address where the message will go.
 * Then, it prepares some options for sending the message, like who is sending it.
 * After that, it sends the message using the web address and options.
*/
function sendNotificationToUser(lineAuthToken, message, userName) {
  // Create the web address where the message will go
  var apiUrl = 'https://notify-api.line.me/api/notify?message=' + message;

  // Prepare options for sending the message
  var options = {
    'method': 'POST', // This says we're sending data to LINE
    'headers': { // This says who is sending the message
      'Authorization': 'Bearer ' + lineAuthToken, // This is the special token for LINE
      'Content-Type': 'application/json' // This tells LINE what kind of data we're sending
    },
  };

  // Log the options we've prepared
  Logger.log("options: " + JSON.stringify(options));

  // Send the message using the web address and options
  var response = UrlFetchApp.fetch(apiUrl, options);

  // Get the response from sending the message
  var responseData = JSON.parse(response.getContentText());
  
  // Log if the message was sent successfully or not
  Logger.log("Notification sent to " + userName + ". Response: " + responseData);
}

