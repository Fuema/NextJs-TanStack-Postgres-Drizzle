import { Resend } from "resend";
import { env } from "@/config/env";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

export interface SecurityAlertParams {
  action: string;
  targetEntity: string;
  actorId: string;
  details?: string;
}

export async function sendSecurityAlertEmail(params: SecurityAlertParams) {
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || "admin@example.com";

  if (!resend) {
    console.log(`[DEV EMAIL MOCK] Security alert dispatch to ${adminEmail}:`, params);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: "Security Guard <security@yourdomain.com>",
      to: [adminEmail],
      subject: `🚨 Security Alert: Destructive Action Executed (${params.action})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 12px;">
          <h2 style="color: #ef4444;">🚨 Security Notification</h2>
          <p>A critical data destruction or sensitive mutation event was triggered in Enterprise Admin Core OS.</p>
          <hr style="border-color: #334155;" />
          <ul>
            <li><strong>Action:</strong> ${params.action}</li>
            <li><strong>Target Entity:</strong> ${params.targetEntity}</li>
            <li><strong>Actor ID:</strong> ${params.actorId}</li>
            <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
            ${params.details ? `<li><strong>Details:</strong> ${params.details}</li>` : ""}
          </ul>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send Resend security email:", error);
    return { success: false, error };
  }
}
