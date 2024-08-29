'use strict';


/**
 * User login
 * Authenticates a user and returns a JWT token.
 *
 * body LoginRequest 
 * returns inline_response_200
 **/
exports.authLoginPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Password recovery
 * Sends a password recovery email to the user.
 *
 * body Auth_password_body 
 * no response value expected for this operation
 **/
exports.authPasswordPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * User registration
 * Registers a new user in the system.
 *
 * body RegisterRequest 
 * returns UserResponse
 **/
exports.authRegisterPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "John",
  "lastName" : "Doe",
  "role" : "user",
  "id" : "60a7842f58d6c90d58f4e2b6",
  "email" : "johndoe@example.com",
  "username" : "johndoe"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all users
 * Returns a list of all registered users.
 *
 * returns List
 **/
exports.usersGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "firstName" : "John",
  "lastName" : "Doe",
  "role" : "user",
  "id" : "60a7842f58d6c90d58f4e2b6",
  "email" : "johndoe@example.com",
  "username" : "johndoe"
}, {
  "firstName" : "John",
  "lastName" : "Doe",
  "role" : "user",
  "id" : "60a7842f58d6c90d58f4e2b6",
  "email" : "johndoe@example.com",
  "username" : "johndoe"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a user by ID
 * Deletes a user from the system by their ID.
 *
 * id String 
 * no response value expected for this operation
 **/
exports.usersIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a user by ID
 * Returns a single user by their ID.
 *
 * id String 
 * returns UserResponse
 **/
exports.usersIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "John",
  "lastName" : "Doe",
  "role" : "user",
  "id" : "60a7842f58d6c90d58f4e2b6",
  "email" : "johndoe@example.com",
  "username" : "johndoe"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Partially update a user by ID
 * Updates one or more user attributes by their ID.
 *
 * body UserUpdate 
 * id String 
 * no response value expected for this operation
 **/
exports.usersIdPATCH = function(body,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update a user by ID
 * Updates user details by their ID.
 *
 * body User 
 * id String 
 * no response value expected for this operation
 **/
exports.usersIdPUT = function(body,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

