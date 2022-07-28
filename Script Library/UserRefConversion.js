//This script will replace all references to a given sys_user to another chosen user.
//Note: This is an EXPENSIVE script. I advise testing this in a non production environment and observing the impact before making the decision if you should run this in production.

//By default this will just print all the reference records that are pointing to the oldUser, you can comment out the lines 33-36 to automatically update to the new user.
//I highly recommend AGAINST doing this, in most cases you will just want to do the task tables or cmdb tables and not bring over all the extra 'baggage' use liberal debug printing and ensure you truly want to update all records before uncommenting

//Depending on the size of your instance this may take a VERY long time or even time out. In that event I recommend altering this script to target one table at a time.

var oldUserID = 'fedcba9876543210fedcba9876543210';
var newUserID = '0123456789abcdef0123456789abcdef';

var oldUserGR = new GlideRecord('sys_user');
oldUserGR.get(oldUserID);

var newUserGR = new GlideRecord('sys_user');
newUserGR.get(newUserID);

gs.print("List of Refs for User " + oldUserGR.name);

var dictGR = new GlideRecord("sys_dictionary");
//Find all dictionary entries that reference the sys_user table
dictGR.addEncodedQuery("reference=sys_user^internal_type=reference^name!=cmn_notif_device^nameNOT LIKEvar__^nameNOT LIKEsys_");
dictGR.query();

while(dictGR.next()) {
    //For each reference go to the table and check for entries for the oldUser
    var recordGR = new GlideRecord(dictGR.name);
    recordGR.addQuery(dictGR.element, oldUserGR.sys_id);
    recordGR.query();
    while(recordGR.next() ){
        gs.print(dictGR.name + " sys_id - " + recordGR.sys_id + " " + dictGR.element + " references " + oldUserGR.user_name);
        //WARNING READ THE HEADER BEFORE UNCOMMENTING THESE LINES AND TEST IN SUBPROD
             // recordGR[dictGR.element] = newUserGR.sys_id;
             // recordGR.autoSysField(false); // so that the records don't have system updates
             // recordGR.setWorkflow(false); // so no business rules are run
             // recordGR.update();
    }
}