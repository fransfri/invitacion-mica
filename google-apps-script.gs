function doPost(event) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = event.parameter;

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Fecha de respuesta', 'Nombre', 'Correo', 'Personas', 'Restricciones', 'Mensaje']);
  }

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || '',
    data.email || '',
    data.guests || '1',
    data.dietary || '',
    data.message || '',
  ]);

  return ContentService.createTextOutput('OK');
}