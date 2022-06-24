/*

Report Ownership Changer

This script can help transfer the ownership of one or more reports from one user to another. This will allow the new user ability to edit and change the sharing of the report.

WARNING: Ensure you have a proper and limited queryString variable before executing this code or you may end up transferring more reports than intended.

*/

//Configuration Variables

var queryString = 'created_by_user=b3f095241300e7805cc870146144b01a^titleLIKEReportToChange'; //The encoded query string limiting which reports to change
var newUserID = 'fedcba9876543210fedcba9876543210'; //The sys_id of the sys_user that will take ownership of the report

// End of configuration Variables

var reportGR = new GlideRecord('sys_report');
reportGR.addEncodedQuery(queryString);
reportGR.query();

gs.print("Total Reports: " + reportGR.getRowCount());

while(reportGR.next()) {
    reportGR.created_by_user = newUserID;
    reportGR.update();
}