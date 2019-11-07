
var statusCodes = {};
statusCodes[exports.USER_REGISTERED = 201] = "User Registered Sucessfully !";
statusCodes[exports.CONTACT_DETAILS_SAVED = 202] = "User Contact Details Saved Sucessfully !";
statusCodes[exports.USER_ALREADY_REGISTERED = 409] = "User Already Registered !";
statusCodes[exports.CONTACT_ALREADY_EXISTED = 409] = "User contact Details Already Registered !";
statusCodes[exports.INTERNAL_SERVER_ERROR = 500] = "Server Error";
statusCodes[exports.USER_NOT_FOUND = 404] = "User Not Found !";
statusCodes[exports.OK = 200] = "OK";
statusCodes[exports.INVALID_OLD_PASSWORD = 401] = "Invalid Old Password !";
statusCodes[exports.AUTH_FAILURE = 405] = "Authentication Failure !";
statusCodes[exports.INVALID_CREDENTIALS = 402] = "Invalid login credentials !";
statusCodes[exports.USER_ALREADY_LOGGEDIN = 403] = "User already loggedin";
statusCodes[exports.IMAGES_NOT_FOUND = 410] = "Images Not Found !";
statusCodes[exports.BLOG_ADDED = 202] = "Sucessfully Blog Added, Please wait for the successful notification from our side.";


exports.getStatusText = function(statusCode) {
    if (statusCodes.hasOwnProperty(statusCode)) {
      return statusCodes[statusCode];
    } else {
      throw new Error("Status code does not exist: " + statusCode);
    }
  };