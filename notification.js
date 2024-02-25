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

function isTimeForNotification(notificationTime) {
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();

  hourAndMinute = notificationTime.split(':')
  var notificationHour = parseInt(hourAndMinute[0]);
  var notificationMinute = parseInt(hourAndMinute[1]);
      
  return currentHour === notificationHour && currentMinute === notificationMinute;
}

function getDataFromSheet() {
  var userInfoSheet = SpreadsheetApp.openById('13OWFRS1Xbt0gZ8Wy-7Aep35vEVP59h9S-cvVfvOU5Qw').getSheetByName('users');
  var notiTimeSheet = SpreadsheetApp.openById('13OWFRS1Xbt0gZ8Wy-7Aep35vEVP59h9S-cvVfvOU5Qw').getSheetByName('notifications');

  var users = userInfoSheet.getDataRange().getValues(); // Fetch all user data at once
  var notifications = notiTimeSheet.getDataRange().getValues(); // Fetch all notification data at once
  
  Logger.log("Users: " + JSON.stringify(users)); // Logging user data
  Logger.log("Notifications: " + JSON.stringify(notifications)); // Logging notification data
  
  return {
    users: users,
    notifications: notifications
  };
}

function sendNotificationToUser(lineAuthToken, message, userName) {
  var apiUrl = 'https://notify-api.line.me/api/notify?message=' + message;

  var options = {
    'method': 'POST',
    'headers': {
      'Authorization': 'Bearer ' + lineAuthToken,
      'Content-Type': 'application/json'
    },
  };

  Logger.log("options: " + JSON.stringify(options)); // Logging options

  // Make the API request
  var response = UrlFetchApp.fetch(apiUrl, options);

  // Parse the JSON response
  var responseData = JSON.parse(response.getContentText());
  
  // Log the response data (you can also do other things with the data)
  Logger.log("Notification sent to " + userName + ". Response: " + responseData);
}
