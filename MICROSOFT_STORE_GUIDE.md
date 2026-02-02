# Publishing Insight AI to Microsoft Store

Publishing to the Microsoft Store allows you to bypass the "Unknown Publisher" SmartScreen warning and reach more users.

## Prerequisites

1.  **System:** You must build the package on Windows (which you are already doing).
2.  **Account:** A Microsoft Developer Account (Individual cost is ~$19 USD one-time fee).

## Step 1: Register as a Microsoft App Developer

1.  Go to [Microsoft Partner Center](https://partner.microsoft.com/dashboard/registration).
2.  Sign up with your Microsoft account.
3.  Pay the registration fee.
4.  Verify your email/identity.

## Step 2: Reserve Your App Name

1.  In Partner Center, go to **Apps and games** -> **New product**.
2.  Select **MSIX or PWA App**.
3.  Enter "Insight AI" (or your preferred name) and check availability.
4.  Click **Reserve product name**.

## Step 3: Get Your Publisher Details (CRITICAL)

To build the package successfully, you need 2 pieces of ID from Microsoft.

1.  In Partner Center, go to your app's **Product management** -> **Product Identity**.
2.  Find the following values:
    *   **Package/Identity/Name** (e.g., `12345InsightAI.Checker`)
    *   **Package/Identity/Publisher** (e.g., `CN=A1B2C3D4-E5F6-...`)

## Step 4: Update package.json

Open `package.json` in this project and find the `"appx"` section I created for you. Replace the placeholders:

```json
"appx": {
  "applicationId": "InsightAI.Checker",
  "identityName": "PASTE_YOUR_IDENTITY_NAME_HERE", 
  "publisher": "PASTE_YOUR_PUBLISHER_STRING_HERE",
  ...
}
```

*   `identityName`: Must match the **Package/Identity/Name** from Partner Center exactly.
*   `publisher`: Must match the **Package/Identity/Publisher** from Partner Center exactly.

## Step 5: Build the Store Package

Run this command in your terminal:

```bash
npm run build:store
```

This will create a `.appx` file in the `release/` folder (e.g., `release/Insight AI 1.0.1.appx`).

## Step 6: Upload to Store

1.  Go back to Partner Center -> **Packages**.
2.  Drag and drop your `.appx` file.
3.  Microsoft will validate it. If it passes, fill out the Store Listing (Description, Screenshots, etc.).
4.  Click **Submit to Store**.

## Certification

Microsoft usually reviews apps within 24-48 hours. Once approved, your app will be live on the Microsoft Store!
