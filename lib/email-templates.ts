export const emailTemplates = {
  welcome: (appName: string, verificationLink: string) => ({
    subject: `Welcome to ${appName}! Verify Your Email`,
    html: `
      <p>Welcome to ${appName}!</p>
      <p>Thank you for registering. To complete your registration, please verify your email address by clicking the link below:</p>
      <p><a href="${verificationLink}">Verify Email Address</a></p>
      <p>If you did not register for an account, please ignore this email.</p>
      <p>Best regards,</p>
      <p>The ${appName} Team</p>
    `,
    text: `
      Welcome to ${appName}!

      Thank you for registering. To complete your registration, please verify your email address by clicking the link below:

      ${verificationLink}

      If you did not register for an account, please ignore this email.

      Best regards,
      The ${appName} Team
    `,
  }),
  passwordReset: (appName: string, resetLink: string) => ({
    subject: `Password Reset for ${appName}`,
    html: `
      <p>You have requested a password reset for your ${appName} account.</p>
      <p>Please click the link below to reset your password:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>This link will expire in 1 hour. If you did not request a password reset, please ignore this email.</p>
      <p>Best regards,</p>
      <p>The ${appName} Team</p>
    `,
    text: `
      You have requested a password reset for your ${appName} account.

      Please click the link below to reset your password:

      ${resetLink}

      This link will expire in 1 hour. If you did not request a password reset, please ignore this email.

      Best regards,
      The ${appName} Team
    `,
  }),
  emailVerification: (verificationLink: string) => ({
    subject: "Verify Your FastContracts Email",
    html: `
      <h1>Email Verification</h1>
      <p>Thank you for signing up for FastContracts. Please verify your email address by clicking the link below:</p>
      <p><a href="${verificationLink}">${verificationLink}</a></p>
      <p>If you did not sign up for FastContracts, please ignore this email.</p>
      <p>Best regards,</p>
      <p>The FastContracts Team</p>
    `,
    text: `
      Email Verification

      Thank you for signing up for FastContracts. Please verify your email address by clicking the link below:

      ${verificationLink}

      If you did not sign up for FastContracts, please ignore this email.

      Best regards,
      The FastContracts Team
    `,
  }),
}
