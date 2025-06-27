export default {
  async fetch(request, env, ctx) {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    
    const res = await fetch("https://yourdomain.com/threatmanager/spamcheck.php", {
      headers: {
        "X-Forwarded-For": ip,
        "User-Agent": request.headers.get("User-Agent")
      }
    });

    const data = await res.json();

    if (data.block) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "https://messenger.willtech.com.au"
        }
      });
    }

    return fetch(request); // Allow request to proceed
  }
}
