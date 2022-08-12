/*
    Typically a record is placed into an inactive state and left in the system. IE Users and Groups.
    This is the best practice as it allows any old items referencing the record to still show the friendly data.
    Sometimes you want to fully delete a record without leaving invalid references behind.
    This script will take a given record and table and find all references to that record to allow you to take any necessary actions to cleanup the data
    
    WARNING: This is an intensive script and I recommend running in a non-production instance or outside of business hours.
*/

var record_sys_id = '0123456789abcdef0123456789abcdef';
var record_table_name = 'sys_user';

var instanceURL = gs.getProperty('glide.servlet.uri');

//Find all dictionary fields across all tables that reference our target record
var dictGR = new GlideRecord('sys_dictionary');
dictGR.addQuery('internal_type', 'reference');
dictGR.addQuery('reference', record_table_name);
dictGR.addActiveQuery();
dictGR.query();

gs.print("Entries referencing our target record")
while (dictGR.next()) {
    var tableGR = new GlideRecord(dictGR.name);
    tableGR.addQuery(dictGR.element, record_sys_id); //Query table with reference if it has any records pointing at our target record
    tableGR.query()
    while (tableGR.next()) {
        gs.print(instanceURL + tableGR.getLink() + " References by field " + dictGR.element)
    }
}