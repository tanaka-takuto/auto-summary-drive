
// セリフ一覧
const SERIFS = [
  "こんにちは、おまとめんだよ！\nPDFを要約したよ。\nこれで大事なポイントが一目でわかるね！\n書類整理はぼくにおまかせなのですっきりん！",
  "やあ、おまとめんだよ！\nPDFを簡単に要約したから、もう読むのに時間はかからないよ。\n書類整理はぼくにまかせてすっきりん！",
  "おまとめんだよ！\nPDFを要約してみたよ。\nこれで重要な部分だけをすぐにチェックできるね。\n書類整理はぼくにおまかせなのですっきりん！",
  "こんにちは、ぼくはおまとめん！\nPDFをぱっと要約したよ。\nポイントをすぐに知りたいなら、ぼくにまかせてね！\nすっきりん！",
  "おまとめんだよ！\nPDFを要約しておいたよ。\nこれで大事なところがすぐに見つかるよ。\n書類整理はぼくにおまかせなのですっきりん！",
  "こんにちは、おまとめんだよ！\nPDFの要点をまとめたよ。\nこれで効率よくチェックできるね！\nすっきりん！",
  "やっほー、おまとめんだよ！\nPDFを要約しておいたから、重要な部分がすぐにわかるよ。\n書類整理はおまかせ！",
  "おまとめんだよ！\nPDFを短く要約したよ。\nこれで時間を節約できるね。\nすっきりん！",
  "こんにちは、ぼくはおまとめん！\nPDFをさっと要約したよ。\nポイントが一目でわかるようにしたよ。\nすっきりん！",
  "おまとめんだよ！\nPDFの重要ポイントを要約したよ。\nこれで見やすくなったね。\n書類整理はぼくにおまかせ！",
  "やあ、おまとめんだよ！\nPDFを簡潔にまとめたよ。\nこれで必要な情報がすぐに見つかるよ。\nすっきりん！",
  "こんにちは、おまとめんです！\nPDFを要約したよ。\n大事なところだけをピックアップしたよ。\n書類整理はぼくにおまかせ！",
  "おまとめんだよ！\nPDFの要約が完了したよ。\nこれで重要なポイントが一目でわかるね。\nすっきりん！",
  "やっほー、おまとめんだよ！\nPDFをさくっと要約したから、すぐにポイントがわかるよ。\n書類整理はおまかせ！",
  "おまとめんだよ！\nPDFを要約しておいたよ。\n大事な部分を見逃さないよ。\nすっきりん！",
  "こんにちは、ぼくはおまとめん！\nPDFを短くまとめたよ。\nポイントがわかりやすくなったよ。\nすっきりん！",
  "おまとめんだよ！\nPDFの要約を済ませたよ。\nこれで重要なところがすぐにわかるね。\n書類整理はおまかせ！",
  "やあ、おまとめんだよ！\nPDFを要約してみたよ。\nこれで時間を有効に使えるね。\nすっきりん！",
  "こんにちは、おまとめんだよ！\nPDFのポイントをまとめたよ。\nこれで効率よく読めるよ。\nすっきりん！",
  "おまとめんだよ！\nPDFを要約して整理したよ。\n重要な部分が一目でわかるようにしたよ。\n書類整理はおまかせ！",
  "やっほー、おまとめんだよ！\nPDFをぱぱっと要約したから、すぐに読めるよ。\nすっきりん！",
  "おまとめんだよ！\nPDFの要約ができたよ。\nこれで必要な情報がすぐに見つかるよ。\n書類整理はおまかせ！",
  "こんにちは、ぼくはおまとめん！\nPDFをさっとまとめたよ。\nポイントがわかりやすくなったね。\nすっきりん！",
  "おまとめんだよ！\nPDFの重要部分を要約したよ。\nこれで見やすくなったよ。\n書類整理はおまかせ！",
  "やあ、おまとめんだよ！\nPDFを短く要約したから、時間を節約できるよ。\nすっきりん！",
  "こんにちは、おまとめんです！\nPDFを要約したよ。\n大事なところをピックアップしたよ。\n書類整理はおまかせ！",
  "おまとめんだよ！\nPDFの要約を完了したよ。\nこれで重要なポイントが一目でわかるね。\nすっきりん！",
  "やっほー、おまとめんだよ！\nPDFをさくっと要約したから、すぐにポイントがわかるよ。\n書類整理はおまかせ！",
  "おまとめんだよ！\nPDFを要約しておいたよ。\n大事な部分を見逃さないよ。\nすっきりん！",
  "こんにちは、ぼくはおまとめん！\nPDFを短くまとめたよ。\nポイントがわかりやすくなったよ。\nすっきりん！"
]

// ランダムなセリフを取得する
function getRandomSerif() {
  const random = (new Date().getMilliseconds()) % SERIFS.length
  return SERIFS[random];
}



export class SlackClient {
  private readonly webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  // 通知する
  notify(file: GoogleAppsScript.Drive.File, summary: string, todos: string[]) {
    Logger.log('--- start notify ---');

    const todoBlock = [{
      "type": "divider"
    },
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "すること",
        "emoji": true
      }
    },
    {
      "type": "rich_text",
      "elements": [
        {
          "type": "rich_text_list",
          "style": "bullet",
          "elements":
            todos.map(todo => {
              return {
                "type": "rich_text_section",
                "elements": [
                  {
                    "type": "text",
                    "text": todo
                  }
                ]
              }
            })
        }
      ]
    }]

    const payload = {
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "plain_text",
            "text": getRandomSerif(),
            "emoji": true
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `ファイル名: <${file.getUrl()}|${file.getName()}>`
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "ダウンロード",
              "emoji": true
            },
            "value": "click_me_123",
            "url": file.getDownloadUrl(),
            "action_id": "button-action"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "要約",
            "emoji": true
          }
        },
        {
          "type": "section",
          "text": {
            "type": "plain_text",
            "text": summary,
            "emoji": true
          }
        }
      ]
    }

    if (todos.length > 0) {
      payload.blocks.push(...todoBlock)
    }

    const response = UrlFetchApp.fetch(this.webhookUrl, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    })
    Logger.log({ statusCode: response.getResponseCode(), headers: response.getAllHeaders(), content: response.getContentText() });
  }
}
