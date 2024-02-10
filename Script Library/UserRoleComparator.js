/*

User Role Comparison

Set the first two variables to sys_ids of 2 different users, this script will output which roles they have in common and which ones are different


*/

var user1_id = '0123456789abcdef0123456789abcdef'; //Set this to the sys_id of the first user you want to compare
var user2_id = 'fedcba9876543210fedcba9876543210'; //Set this to the sys_id of the second user you want to compare

var user1GR = new GlideRecord('sys_user');
user1GR.get(user1_id);
var user2GR = new GlideRecord('sys_user');
user2GR.get(user2_id);

var user1Roles = [];
var user2Roles= [];
var sharedRoles = [];

var userRoleGR = new GlideRecord('sys_user_has_role');
userRoleGR.addEncodedQuery('user=' + user1_id + '^ORuser=' + user2_id);
userRoleGR.query();

//Get both users roles in a single GR for performance
while (userRoleGR.next()) {
    if (userRoleGR.user.sys_id.toString() == user1_id) {
        user1Roles.push(userRoleGR.role.name.toString());
    } else {
        user2Roles.push(userRoleGR.role.name.toString())
    }
}

//Enumerate the two arrays and determine which are shared and exclusive
var user1ExclusiveRoles = [];
for (var i = 0; i < user1Roles.length; i++) {
    var idx = user2Roles.indexOf(user1Roles[i]);
    if (idx != -1) {
        sharedRoles.push(user1Roles[i]);
        user2Roles.splice(idx, 1);
    }
    else {
        user1ExclusiveRoles.push(user1Roles[i]);
    }
}

//Sort alphabetically
user1ExclusiveRoles.sort();
user2Roles.sort();
sharedRoles.sort();

gs.print(user1GR.name + ' (' + user1_id + ') exclusive roles:');
gs.print(user1ExclusiveRoles);

gs.print(' ')

gs.print(user2GR.name + ' (' + user2_id + ') exclusive roles:');
gs.print(user2Roles);

gs.print(' ')

gs.print("Shared roles for both users:");
gs.print(sharedRoles);