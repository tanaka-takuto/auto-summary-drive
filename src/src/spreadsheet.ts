// スクリプトスプレッドシート
const sheet = SpreadsheetApp.getActiveSpreadsheet()

// OPEN AI API KEY
const OPEN_AI_API_KEY = sheet.getRange('B3').getValue() as string

// 格納先フォルダID
const STORING_TARGET_FOLDER_ID = sheet.getRange('D3').getValue() as string

// 要約対象フォルダID
const SUMMARIZATION_TARGET_FOLDER_ID = sheet.getRange('D6').getValue() as string

// Slack WebHook URL
const SLACK_WEBHOOK_URL = sheet.getRange('G3').getValue() as string

// カテゴリ一覧
const CATEGORIES = sheet.getRange('I3:I30').getValues().flat().filter((v) => !!v) as string[]

export {
  OPEN_AI_API_KEY,
  STORING_TARGET_FOLDER_ID,
  SUMMARIZATION_TARGET_FOLDER_ID,
  SLACK_WEBHOOK_URL,
  CATEGORIES
}
