export const sendEmail = async () => {
  try {
    const res = await fetch("/api/email", { method: "POST" });
    const data = await res.json();
    console.log("Response:", data);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
