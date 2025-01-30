"use client";
import { useState } from "react";
import {
  getConnectCaptcha,
  ConnectWithEmailParam,
} from "@particle-network/auth-core";
import {
  useConnect,
  useEthereum,
  useAuthCore,
} from "@particle-network/authkit";

export default function SendOTP() {
  const { connect, disconnect } = useConnect();
  const { address } = useEthereum();
  const { userInfo } = useAuthCore();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Step 1: Send OTP
  const sendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const success = await getConnectCaptcha({ email });
      if (success) {
        setMessage(
          "We have sent a verification code to your email. Please check your inbox (and spam folder)."
        );
        setStep(2);
      } else {
        setMessage("Failed to send OTP. Try again.");
      }
    } catch (err) {
      setMessage("Error sending OTP. Please try again.");
    }
    setLoading(false);
  };

  // Step 2: Verify OTP & Login
  const verifyOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const loginParams: ConnectWithEmailParam = { email, code: otp };
      await connect(loginParams);

      setMessage("Login successful!");
    } catch (err) {
      setMessage("The verification code is incorrect. Please try again.");
    }
    setLoading(false);
  };

  // Handle user disconnect
  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-10">
      <h1 className="text-2xl font-bold text-white mb-4">
        Particle Auth Custom OTP Login
      </h1>

      {!userInfo ? (
        <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
          {step === 1 ? (
            <div>
              <h2 className="text-xl font-bold mb-3">Enter Your Email</h2>
              <p className="text-gray-700 mb-3">
                We will send a verification code to your email.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border rounded mb-3 text-black"
              />
              <button
                onClick={sendOtp}
                className="w-full p-2 bg-blue-600 text-white rounded"
                disabled={loading || !email}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-3">Verify Your Email</h2>
              <p className="text-gray-700 mb-3">
                Please enter the verification code we emailed you to continue
                (check your spam folder too).
              </p>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full p-2 border rounded mb-3 text-black"
              />
              <button
                onClick={verifyOtp}
                className="w-full p-2 bg-green-600 text-white rounded"
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}
          {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-lg font-bold text-white mb-2">
            Welcome, {userInfo.email}!
          </h2>
          <p className="text-gray-300 mb-2">Your address: {address}</p>
          <button
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      )}
    </main>
  );
}
