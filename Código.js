const idSheet = '1IRoa2bgCBsAo1BlmJfSQgF-EGAxTfh913Hp69ILby7w';
const sheetRequest = SpreadsheetApp.openById(idSheet);

function doGet(){
  return HtmlService.createTemplateFromFile("index").evaluate();
}

function include(route){
  return HtmlService.createHtmlOutputFromFile(route).getContent();
}

function getLastId() {
  const requests = sheetRequest.getDataRange().getValues();
  return requests[requests.length - 1][0];
}

function registerRequest(dataRequest) {
  const { startDate, finishDate } = dataRequest.period;
  const { typeRequest, boss } = dataRequest.typeRequest;
  const { userId, userName, lastName } = dataRequest.infoUser;
  
  sheetRequest.appendRow([
    getLastId() + 1,
    Session.getUser().getEmail(),
    userId,
    userName,
    lastName,
    Utilities.formatDate(new Date(startDate), 'Etc/GMT', 'yyyy/MM/dd'),
    Utilities.formatDate(new Date(finishDate), 'Etc/GMT', 'yyyy/MM/dd'),
    boss,
    typeRequest,
    'SOLICITUD',
    Utilities.formatDate(new Date(), 'Etc/GMT', 'yyyy/MM/dd')]);
}
