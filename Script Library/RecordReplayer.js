/*

Record Replayer

I have found that occasionally I need to reinsert a record fresh into a table in order to trigger workflows/transform maps/etc. 
While some things like emails have a nice 'Reprocess' button, other tables and especially custom tables aren't so easy.
This script will take a given record, copy all the fields that are not system (sys_) or in the blacklist and reinsert it fresh. The old record is not altered in any way.

*/

// Configuration Variables
var tableName = 'u_example_table';
var recordID  = '0123456789abcdef0123456789abcdef';
var blackListFields = ['u_dont_copy_this_field', 'u_or_this_field']; //This array of field names will not be copied to the new record

// End of configuration Variables

// Load the record to be duplicated
var gr = new GlideRecord(tableName);
gr.get(recordID);

//Enumerate all fields we will copy
var fieldList = Object.getOwnPropertyNames(gr);
var copyFields = [];

//Remove all blackListFields and systemFields
while (fieldList.length > 0) {
    var nextField = fieldList.pop();
    if (blackListFields.indexOf(nextField) != -1 ||
        nextField.substring(0, 4) == 'sys_') { //Automatically remove all fields that start with sys_
        continue; //Skip adding this to the copy fields
    }
    copyFields.push(nextField); //Add this element to the to be copied field array
}

//Prepare new record
var newGR = new GlideRecord(tableName);
newGR.initalize();
for (var i = 0; i < copyFields.length; i++) {
    newGR[copyFields[i]] = gr[copyFields[i]];
}
newGR.insert();
