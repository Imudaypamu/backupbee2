import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let backupEnabled = true;
let backupRoot: string | null = null;

export function activate(context: vscode.ExtensionContext) {
  console.log('File Backup Manager is active.');

  // Toggle backup
  context.subscriptions.push(vscode.commands.registerCommand('backup.toggle', () => {
    backupEnabled = !backupEnabled;
    vscode.window.showInformationMessage(`Backup is now ${backupEnabled ? 'enabled' : 'disabled'}`);
  }));

  // Set backup root directory
  context.subscriptions.push(vscode.commands.registerCommand('backup.setDirectory', async () => {
    const folder = await vscode.window.showOpenDialog({
      canSelectFolders: true,
      openLabel: 'Set Backup Root Directory'
    });

    if (folder && folder.length > 0) {
      backupRoot = folder[0].fsPath;
      vscode.window.showInformationMessage(`Backup directory set to: ${backupRoot}`);
    }
  }));

  // Finalize: Delete all backup files
  context.subscriptions.push(vscode.commands.registerCommand('backup.finalize', () => {
    const target = backupRoot || vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (target) {
      const backupPath = path.join(target, '__backups__');
      if (fs.existsSync(backupPath)) {
        fs.rmSync(backupPath, { recursive: true, force: true });
        vscode.window.showInformationMessage('All backup files deleted.');
      } else {
        vscode.window.showInformationMessage('No backup directory found.');
      }
    } else {
      vscode.window.showInformationMessage('No backup root directory set.');
    }
  }));

  // Auto-backup on save
  context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(doc => {
    if (!backupEnabled) return;

    const filePath = doc.fileName;
    const fileName = path.basename(filePath);
    const fileDir = path.dirname(filePath);
    const workspaceDir = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || fileDir;

    const root = backupRoot || fileDir;
    const backupBaseDir = path.join(root, '__backups__');
    const fileBackupDir = path.join(backupBaseDir, fileName.replace(/[\/\\:.]/g, '_'));

    fs.mkdirSync(fileBackupDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(fileBackupDir, `${fileName}.${timestamp}.bak`);

    fs.copyFileSync(filePath, backupFile);

    // Keep only latest 7 backups
    const backups = fs.readdirSync(fileBackupDir)
      .map(f => ({
        name: f,
        time: fs.statSync(path.join(fileBackupDir, f)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time);

    backups.slice(7).forEach(old => {
      fs.unlinkSync(path.join(fileBackupDir, old.name));
    });
  }));
}

export function deactivate() {}
