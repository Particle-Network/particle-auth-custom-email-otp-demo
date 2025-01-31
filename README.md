<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" />
  </a>
  <h3>
 @particle-network/authkit custom email login Demo Application 
  </h3>
</div>

# Particle Auth Custom Email Login

⚡️ Basic demo application using `@particle-network/authkit` to showcase how to implement custom email login, request and verify the OTP code.


👉 Learn more about [Particle Auth](https://developers.particle.network/api-reference/auth/desktop-sdks/web).

👉 Learn more about [Particle Network](https://particle.network).

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/Particle-Network/particle-auth-custom-email-otp-demo
```

### Move into the app directory

```sh
cd connectkit-aa-usage
```

### Install dependencies

```sh
yarn install
```

Or

```sh
npm install
```

### Set environment variables
This project requires several keys from Particle Network to be defined in `.env`. The following should be defined:
- `NEXT_PUBLIC_PROJECT_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `NEXT_PUBLIC_CLIENT_KEY`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `NEXT_PUBLIC_APP_ID`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).

### Start the project
```sh
npm run dev
```

Or

```sh
yarn dev
```

## Development

Start from `app/page.tsx`.

### Config custom email login

**Step 1: Request an OTP**

Use the `getConnectCaptcha()` function from `@particle-network/auth-core` to send an **OTP** to the user’s email.

```tsx page.tsx
import { getConnectCaptcha } from "@particle-network/auth-core";

// Send an OTP to the email
const sendOtpRequest = async (email) => {
  const success = await getConnectCaptcha({ email });
  console.log(success ? "OTP sent successfully!" : "Failed to request OTP. Try again.");
};
```

**Step 2: Verify OTP & Log In**

Once the user receives the OTP, use the `connect()` function, including OTP and email within `loginParams`, to verify it and complete the login.

```tsx page.tsx
import { ConnectWithEmailParam } from "@particle-network/auth-core";

// Verify the OTP and log in
const verifyOtp = async (email, otp) => {
    const loginParams: ConnectWithEmailParam = { email, code: otp };
    await connect(loginParams);
    console.log("Login successful!");
};
```
