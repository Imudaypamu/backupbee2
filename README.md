# 🐝 BackupBee

**BackupBee** is a lightweight VS Code extension that automatically creates versioned backups of your edited files, helping you keep your work safe without any hassle.

---

## 🚀 Features

- **Automatic Backups on Save**  
  Every time you save a file, BackupBee creates a backup copy with a timestamp.

- **Configurable Backup Root Directory**  
  Choose where backups are stored — either inside your project root or a custom directory outside your workspace.

- **Per-File Backup Folders**  
  BackupBee organizes backups into subfolders for each file, keeping your backups tidy.

- **Backup Toggle**  
  Quickly enable or disable automatic backups anytime via a command.

- **Clean Up Backups**  
  Finalize your work and clean all backup files with a single command.

- **Backup Retention**  
  Automatically keeps the latest **7** backups per file, removing older ones.

---

## 📋 Commands

| Command Name                         | Description                                                |
|------------------------------------|------------------------------------------------------------|
| `BackupBee: Toggle Backup On/Off`  | Enable or disable automatic backups on file save.          |
| `BackupBee: Select Backup Root Directory` | Set a custom root directory for all backups. Defaults to file root if unset. |
| `BackupBee: Finalize and Clean`    | Delete all backup files and clean the backup directory.    |

---

## 🎯 How to Use

1. **Start working on your files.**  
   Backups are created automatically every time you save.

2. **Control backups with commands:**  
   Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run any BackupBee command.

3. **Set a custom backup root directory:**  
   Choose a specific folder outside your project if you don’t want backups cluttering your workspace.

4. **Cleanup when done:**  
   Use the finalize command to delete all backups and clean up.

---

## 📦 Installation

Install **BackupBee** directly from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/) by searching for "BackupBee" or install via the Extensions sidebar.

---

## 🛠 Development

To contribute or test locally:

```bash
git clone https://github.com/yourusername/backupbee.git
cd backupbee
npm install
npm run build
code .
