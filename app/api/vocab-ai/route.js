import openai from "@/services/openai";
import db from "@/services/db";

export async function GET() {
    // 取得集合內的所有文件
    // 按造建立的時間排序(新=>舊).ordetBy是由舊到新，再加入desc就會修正為新到舊
    const docList = await db.collection("vocab-ai").orderBy("createdAt", "desc").get();
    // 準備要回應給前端的資料
    const vocabList = [];
    docList.forEach(doc => {
        const result = doc.data();
        // console.log("result:", result);
        // 將result存入vocabList
        vocabList.push(result);
    })
    // 將vocabList回傳給前端
    return Response.json(vocabList);
}
export async function POST(req) {
    const body = await req.json();
    // console.log("body:", body);
    const { userInput, language } = body;
    // 透過gpt-4o-mini模型讓AI回傳相關單字
    // 文件連結：https://platform.openai.com/docs/guides/text-generation/chat-completions-api?lang=node.js
    // JSON Mode: https://platform.openai.com/docs/guides/text-generation/json-mode?lang=node.js
    const systemPrompt = `請作為一個單字聯想AI根據所提供的單字聯想5個相關單字並提供對應的繁體中文意思
    例如：
    單字:水果
    語言：英文
    回應JSON範例:
    {
    wordList: [apple,banana,...],
    zhWordList: [蘋果,香蕉,...],
    }
    `;
    const propmpt = `單字: ${userInput} 語言: ${language} `;

    const openAIReqBody = {
        messages: [
            { "role": "system", "content": systemPrompt },
            { "role": "user", "content": propmpt }
        ],
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
    };
    const completion = await openai.chat.completions.create(openAIReqBody);
    // JSON.parse("{}") => {}
    const payload = JSON.parse(completion.choices[0].message.content);
    // console.log("payload:", payload);

    const result = {
        title: userInput,
        payload,
        language,
        createdAt: new Date().getTime(),
    }

    const firestoreRes = await db.collection("vocab-ai").add(result);
    // console.log("新增文件的ID:", firestoreRes.id);

    return Response.json(result);
}