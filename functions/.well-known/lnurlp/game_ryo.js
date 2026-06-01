export async function onRequest(context) {
  // あなたのご自身のNostr公開鍵（npub）から生成された「16進数（Hex）のパブリックキー」
  const pubkeyHex = "003e790b1e0ad37313603234331c377810dfe09b633d2808402dd3c6c6461b69"; 

  // あなたが先ほど用意した「Minibits Mint」のビットコイン決済サーバー（エンドポイント）
  const mintUrl = "https://mint.minibits.cash/Bitcoin";

  const lnurlResponse = {
    // 【修正】${ } を使って、間にスラッシュ（/）を入れました
    "callback": `${mintUrl}/${pubkeyHex}`, 
    "maxSendable": 100000000, // 最大送金額（ミリサトシ）
    "minSendable": 1000,      // 最小送金額（ミリサトシ）
    "metadata": "[[\"text/plain\",\"Zap to Ryopc (Self-Hosted on Cloudflare Pages)\"]]",
    "tag": "payRequest"
  };

  // 正しいJSON形式で一発でブラウザに返答を返し、CORSエラー（外部アプリからの遮断）を100%防止する
  return new Response(JSON.stringify(lnurlResponse), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*" 
    }
  });
}
