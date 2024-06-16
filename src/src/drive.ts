// 要約対象ファイル
export class SummarizationTargetFile {
  file: GoogleAppsScript.Drive.File;
}

// 要約対象ファイル一覧を取得する
export function GetSummarizationTargetFiles(
  folderID: string,
): SummarizationTargetFile[] {
  Logger.log(`--- start GetSummarizationTargetFiles ---: ${folderID}`);
  const responseFiles: SummarizationTargetFile[] = [];

  let folder: GoogleAppsScript.Drive.Folder;
  try {
    folder = DriveApp.getFolderById(folderID);
  } catch (error) {
    Logger.log(`フォルダが取得できませんでした: ${folderID}`);
    return [];
  }

  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    if (file.getMimeType() === "application/pdf") {
      responseFiles.push({ file: file });
    }
  }

  const childFolders = folder.getFolders();
  while (childFolders.hasNext()) {
    const childFolder = childFolders.next();
    responseFiles.push(...GetSummarizationTargetFiles(childFolder.getId()));
  }

  return responseFiles;
}

// OCRの結果を取得する
export function GetOcrText(file: GoogleAppsScript.Drive.File): string {
  Logger.log(`--- start GetOcrText ---: ${file.getName()}`);

  const document = Drive.Files.copy(
    { title: `_tmp_${file.getId()}` },
    file.getId(),
    { ocr: true },
  );
  const docFile = DocumentApp.openById(document.id);
  const body = docFile.getBody();
  const text = body.getText();

  DriveApp.getFileById(document.id).setTrashed(true);

  return text;
}

// ファイル名を変更する
export function RenameFile(
  file: GoogleAppsScript.Drive.File,
  category: string,
  title: string,
) {
  Logger.log(`--- start RenameFile ---: ${file.getName()}`);

  const createdAt = Utilities.formatDate(
    file.getDateCreated(),
    "JST",
    "yyyyMMddHHmmss",
  );
  const fileExtension = file.getName().split(".").pop();

  const newFileName = `[${createdAt}][${category}]${title}.${fileExtension}`;
  file.setName(newFileName);
}

// ファイルを移動する
export function MoveFile(file: GoogleAppsScript.Drive.File, folderID: string) {
  Logger.log(`--- start MoveFile ---: ${file.getName()}`);

  const folder = DriveApp.getFolderById(folderID);
  file.moveTo(folder);
}
