import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Verzeichnis der aktuellen Datei ermitteln (ES Modules haben kein __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dateien, die wir verarbeiten möchten
const htmlFiles = [
  'index.html',
  'preise.html',
  'datenschutz.html',
  'impressum.html'
];

// Funktion zum Korrigieren der Pfade in einer Datei
function fixPathsInFile(filePath) {
  try {
    console.log(`Bearbeite: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Ersetze absoluten Pfad (/etwas.jpg) durch relativen Pfad (etwas.jpg)
    // Wir entfernen den führenden Slash komplett, da die Dateien im Root-Verzeichnis liegen
    content = content.replace(/src="\//g, 'src="');
    content = content.replace(/href="\//g, 'href="');
    
    // Speichere die aktualisierte Datei
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Pfade in ${filePath} korrigiert`);
  } catch (error) {
    console.error(`❌ Fehler bei ${filePath}:`, error);
  }
}

// Hauptfunktion
function main() {
  console.log('Starte Pfad-Korrektur...');
  
  htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      fixPathsInFile(filePath);
    } else {
      console.warn(`⚠️ Datei nicht gefunden: ${filePath}`);
    }
  });
  
  console.log('Pfad-Korrektur abgeschlossen.');
}

main();
