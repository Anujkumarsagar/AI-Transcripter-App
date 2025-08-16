export const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>{{subject}}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      width: 100%;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .email-header {
      background: linear-gradient(90deg, #4F46E5, #1E90FF);
      padding: 20px;
      color: #ffffff;
      text-align: center;
    }
    .email-content {
      padding: 30px;
      font-size: 16px;
      color: #333333;
      line-height: 1.6;
    }
    .summary {
      background-color: #f0f0ff;
      padding: 15px;
      border-left: 4px solid #4F46E5;
      margin-bottom: 20px;
    }
    .email-footer {
      text-align: center;
      padding: 16px;
      font-size: 13px;
      color: #888888;
      background-color: #fafafa;
    }
    .button {
      display: inline-block;
      background-color: #4F46E5;
      color: #ffffff !important;
      padding: 12px 20px;
      border-radius: 5px;
      text-decoration: none;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="email-wrapper">
      <div class="email-header">
        <h2>{{subject}}</h2>
      </div>
      <div class="email-content">
        <div class="summary">
          <strong>Summary:</strong>
          <p>{{summary}}</p>
        </div>
        <p>{{message}}</p>
        <a href="#" class="button">Open Dashboard</a>
      </div>
      <div class="email-footer">
        <p>Sent by {{sentBy}}</p>
        <p>for contacting you can visit here.</p>
        <p>For contacting, you can visit here:</p>
        <a href="https://linkedin.com/in/anujkumarsagar"        target="_blank">LinkedIn</a> |
        <a href="https://github.com/anujkumarsagar"         target="_blank">GitHub</a> |
        <a href="https://cvnauj.vercel.app" target="_blank">Portfolio</a>

        <p>Thank you for using our service!</p>
      </div>
    </div>
  </div>
</body>
</html>
`
