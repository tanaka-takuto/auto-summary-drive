import { GetOcrText, GetSummarizationTargetFiles, MoveFile, RenameFile } from "./drive";
import { OpenAIClient } from "./chatgpt";
import { CATEGORIES, OPEN_AI_API_KEY, SLACK_WEBHOOK_URL, STORING_TARGET_FOLDER_ID, SUMMARIZATION_TARGET_FOLDER_ID } from "./spreadsheet";
import { SlackClient } from "./slack";

// まとめて実行するファイル数
const EXECUTE_FILE_COUNT = 1;

export async function main() {
  // 設定をチェックする
  if (!checkSetting()) return;

  // ChatGPTクライアントを作成する
  const chatGPTClient = new OpenAIClient(OPEN_AI_API_KEY);

  // Slackクライアントを作成する
  const slackClient = new SlackClient(SLACK_WEBHOOK_URL);

  // 要約対象ファイル一覧を取得する
  const allSummaryTargetFiles = GetSummarizationTargetFiles(SUMMARIZATION_TARGET_FOLDER_ID);
  if (allSummaryTargetFiles.length === 0) {
    Logger.log('要約対象ファイルがありませんでした');
    return;
  }
  Logger.log(`要約対象ファイル数: ${allSummaryTargetFiles.length}件`)
  Logger.log(allSummaryTargetFiles);

  // 件数を制限する
  const summaryTargetFiles = allSummaryTargetFiles.slice(0, EXECUTE_FILE_COUNT);

  summaryTargetFiles.forEach(async (summaryTargetFile) => {
    // 要約を作成
    const ocr = GetOcrText(summaryTargetFile.file);
    const summary = await chatGPTClient.summaryOCR(ocr, CATEGORIES);
    Logger.log(summary);

    // リネームと移動
    RenameFile(summaryTargetFile.file, summary.category, summary.title);
    MoveFile(summaryTargetFile.file, STORING_TARGET_FOLDER_ID);

    // 通知する
    slackClient.notify(summaryTargetFile.file, summary.summary, summary.todo);
  });
}


// 設定をチェックする
function checkSetting(): boolean {
  if (!OPEN_AI_API_KEY) {
    Logger.log('APIキーが設定されていません');
    return false;
  }

  if (!STORING_TARGET_FOLDER_ID) {
    Logger.log('格納先フォルダが設定されていません');
    return false;
  }

  if (SUMMARIZATION_TARGET_FOLDER_ID.length === 0) {
    Logger.log('要約対象フォルダが設定されていません');
    return false;
  }

  if (!SLACK_WEBHOOK_URL) {
    Logger.log('Slack WebHook URLが設定されていません');
    return false;
  }

  if (CATEGORIES.length === 0) {
    Logger.log('カテゴリが設定されていません');
    return false;
  }

  return true;
}
