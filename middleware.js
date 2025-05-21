// Middleware für Passwortschutz
export default async function middleware(request) {
  const url = new URL(request.url);
  
  // Wenn ein Passwort bereits in der Session gespeichert ist
  const sessionPassword = request.cookies.get('auth');
  if (sessionPassword && sessionPassword.value === 'LosGehts') {
    return;
  }

  // Wenn das Formular mit dem Passwort gesendet wurde
  if (request.method === 'POST' && url.pathname === '/api/auth') {
    const body = await request.text();
    const params = new URLSearchParams(body);
    const password = params.get('password');

    if (password === 'LosGehts') {
      const response = new Response('', {
        status: 302,
        headers: {
          'Location': '/',
          'Set-Cookie': 'auth=LosGehts; Path=/; HttpOnly; SameSite=Strict',
        },
      });
      return response;
    } else {
      // Falsches Passwort
      return new Response('Falsches Passwort', {
        status: 401,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
  }

  // Ansonsten zeige das Login-Formular
  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Avanti Landingpage - Zugangsbeschränkt</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #27416b;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            color: white;
          }
          .container {
            background-color: rgba(0, 0, 0, 0.2);
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 90%;
            text-align: center;
          }
          h1 {
            color: #f7941d;
            margin-bottom: 20px;
          }
          form {
            display: flex;
            flex-direction: column;
          }
          input {
            padding: 12px;
            margin: 10px 0;
            border: none;
            border-radius: 5px;
            font-size: 16px;
          }
          button {
            background-color: #f7941d;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
            font-weight: bold;
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #e07b0d;
          }
          .logo {
            max-width: 150px;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="/logo.png" alt="Avanti Logo" class="logo">
          <h1>Zugangsbeschränkt</h1>
          <p>Bitte geben Sie das Passwort ein, um Zugang zur Avanti Landingpage zu erhalten.</p>
          <form method="post" action="/api/auth">
            <input type="password" name="password" placeholder="Passwort" required>
            <button type="submit">Zugang erhalten</button>
          </form>
        </div>
      </body>
    </html>
  `, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

// Konfiguration der Middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
};
