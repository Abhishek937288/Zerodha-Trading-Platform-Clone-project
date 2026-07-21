// ====== Shared Styles ======
const brandColor = "#387ed1";
const brandDark = "#1e4a8a";
const bgColor = "#f4f4f4";
const cardBg = "#ffffff";
const textColor = "#333333";
const textMuted = "#666666";
const borderColor = "#e0e0e0";

const baseStyles = `
  body {
    background-color: ${bgColor};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 560px;
    margin: 0 auto;
    padding: 32px 16px;
  }
  .card {
    background-color: ${cardBg};
    border-radius: 12px;
    padding: 40px 32px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .logo {
    text-align: center;
    margin-bottom: 32px;
  }
  .logo-text {
    font-size: 28px;
    font-weight: 700;
    color: ${brandColor};
    letter-spacing: -0.5px;
  }
  .logo-dot {
    color: #ff6b35;
  }
  h1 {
    font-size: 22px;
    font-weight: 600;
    color: ${textColor};
    margin: 0 0 8px 0;
    text-align: center;
  }
  p {
    font-size: 15px;
    line-height: 1.6;
    color: ${textMuted};
    margin: 0 0 16px 0;
    text-align: center;
  }
  .code-box {
    background-color: #f8f9fb;
    border: 2px dashed ${brandColor}40;
    border-radius: 10px;
    padding: 20px;
    margin: 24px 0;
    text-align: center;
  }
  .code {
    font-size: 36px;
    font-weight: 700;
    letter-spacing: 8px;
    color: ${brandColor};
    font-family: 'Courier New', monospace;
  }
  .code-note {
    font-size: 13px;
    color: ${textMuted};
    text-align: center;
    margin-top: 8px;
  }
  .btn {
    display: inline-block;
    background-color: ${brandColor};
    color: #ffffff;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    padding: 14px 36px;
    border-radius: 8px;
    margin: 24px 0 8px;
  }
  .btn:hover {
    background-color: ${brandDark};
  }
  .divider {
    height: 1px;
    background-color: ${borderColor};
    margin: 28px 0;
    border: none;
  }
  .footer {
    text-align: center;
    padding: 24px 0 0;
  }
  .footer p {
    font-size: 12px;
    color: #999999;
    margin: 4px 0;
  }
  .greeting {
    font-size: 16px;
    font-weight: 500;
    color: ${textColor};
    text-align: left;
    margin-bottom: 12px;
  }
  .content-left {
    text-align: left;
  }
`;

// ====== Email Verification Template ======
export const verificationEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo">
        <span class="logo-text">Stock<span class="logo-dot">.in</span></span>
      </div>

      <h1>Verify your email address</h1>
      <p>Thanks for creating an account! Please use the verification code below to complete your registration.</p>

      <div class="code-box">
        <div class="code">{verificationToken}</div>
      </div>
      <p class="code-note">This code is valid for 10 minutes</p>

      <hr class="divider" />

      <p style="font-size:13px; color:#999;">
        If you didn't create an account with Stock.in, you can safely ignore this email.
      </p>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Stock.in. All rights reserved.</p>
      <p>Stock Trading Platform</p>
    </div>
  </div>
</body>
</html>`;

// ====== Welcome Email Template ======
export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo">
        <span class="logo-text">Stock<span class="logo-dot">.in</span></span>
      </div>

      <h1>Welcome aboard, {name}! 🎉</h1>
      <p>Your email has been verified successfully. You're now ready to start your trading journey with Stock.in.</p>

      <div style="text-align:center;">
        <a href="{dashboardUrl}" class="btn">Go to Dashboard</a>
      </div>

      <hr class="divider" />

      <p style="font-size:13px; text-align:left; color:#666;">
        <strong>What you can do now:</strong>
      </p>
      <table style="font-size:14px; color:#555; line-height:1.8; margin-bottom:16px;">
        <tr><td>📊 &nbsp; Track real-time stock prices</td></tr>
        <tr><td>🛒 &nbsp; Buy and sell stocks instantly</td></tr>
        <tr><td>📈 &nbsp; Monitor your portfolio and holdings</td></tr>
        <tr><td>📋 &nbsp; View your order history</td></tr>
      </table>

      <p style="font-size:13px; color:#999;">
        If you have any questions, feel free to reach out to our support team.
      </p>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Stock.in. All rights reserved.</p>
      <p>Stock Trading Platform</p>
    </div>
  </div>
</body>
</html>`;

// ====== Forgot Password Template ======
export const FORGOT_PASSWORD_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo">
        <span class="logo-text">Stock<span class="logo-dot">.in</span></span>
      </div>

      <h1>Reset your password</h1>
      <p>We received a request to reset the password for your Stock.in account. Click the button below to set a new password.</p>

      <div style="text-align:center;">
        <a href="{resetUrl}" class="btn">Reset Password</a>
      </div>

      <p style="font-size:13px; color:#999; margin-top:20px;">
        This link will expire in 10 minutes. If you didn't request a password reset, you can safely ignore this email.
      </p>

      <hr class="divider" />

      <p style="font-size:13px; color:#999;">
        If the button above doesn't work, copy and paste this URL into your browser:
      </p>
      <p style="font-size:12px; color:#387ed1; word-break:break-all; text-align:center;">
        {resetUrl}
      </p>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Stock.in. All rights reserved.</p>
      <p>Stock Trading Platform</p>
    </div>
  </div>
</body>
</html>`;

// ====== Password Updated Template ======
export const PASSWORD_UPDATED_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo">
        <span class="logo-text">Stock<span class="logo-dot">.in</span></span>
      </div>

      <h1>Password updated successfully ✅</h1>
      <p>Hi {name}, your Stock.in account password has been changed successfully.</p>

      <hr class="divider" />

      <p style="font-size:13px; color:#666; text-align:left;">
        If you did not make this change, please contact our support team immediately to secure your account.
      </p>

      <div style="text-align:center;">
        <a href="{dashboardUrl}" class="btn">Go to Dashboard</a>
      </div>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Stock.in. All rights reserved.</p>
      <p>Stock Trading Platform</p>
    </div>
  </div>
</body>
</html>`;
