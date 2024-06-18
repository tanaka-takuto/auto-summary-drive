export enum Importance {
  Low = 'Low',
  Middle = 'Middle',
  High = 'High',
}

// 要約レスポンス
export class SummaryResponse {
  title: string;
  summary: string;
  importance: Importance;
  category: string;
  todo: string[];
}

export class OpenAIClient {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /*
  TODO: 
  ChatGPTにPDFファイルをVectorStoreにアップロードしてChatGPTに解析してもらいたいが
  しかし、現時点(2024/06)では、VectorStoreへのアップロードで失敗してしまう。
  GoogleDriveのOCR機能をを使用して、テキストとして解析してもらう
   */

  // OCR結果を要約する
  async summaryOCR(
    ocr: string,
    categories: string[],
  ): Promise<SummaryResponse> {
    Logger.log('--- start summaryOCR ---');

    const COMPLETIONS_API = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };
    const systemPrompt = `PDFのOCR結果を入力します。
OCRの結果を下記JSONにまとめてください。

# 今日
今日は'${new Date().toLocaleString()}'です。

# 制約
- 日本語
- 下記JSONで出力
- importance
  - Low: 対応不要
  - Middle: 近い内に対応が必要、したほうがいいこと
  - High: すぐに対応が必要、法的な対応が必要

# JSON
{
  "title": "タイトル(50文字以内,記号は使わない)",
  "summary": "要約(500文字以内)"
  "importance": "重要度(${Object.values(Importance).join(' or ')})",
  "category": "カテゴリ(${categories.join(' or ')})",
  "todo": ["するべきこと(50文字以内)"]
}
`;
    const body = {
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: ocr },
      ],
      response_format: { type: 'json_object' },
    };

    try {
      const response = UrlFetchApp.fetch(COMPLETIONS_API, {
        method: 'post',
        headers: headers,
        payload: JSON.stringify(body),
      });
      Logger.log({
        statusCode: response.getResponseCode(),
        headers: response.getAllHeaders(),
        content: response.getContentText(),
      });
      const responseJson = JSON.parse(response.getContentText());
      return JSON.parse(
        responseJson.choices[0].message.content,
      ) as SummaryResponse;
    } catch (error) {
      Logger.log(error);
      throw error;
    }
  }
}
