import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Comprehensive validation schema
const bookingSchema = z.object({
  bookingRef: z.string().trim().min(1, "Booking reference is required").max(20, "Booking reference too long"),
  contentType: z.enum(['safari', 'activity', 'location'], { errorMap: () => ({ message: "Invalid content type" }) }),
  contentName: z.string().trim().min(1, "Content name is required").max(200, "Content name too long"),
  firstName: z.string().trim().min(1, "First name is required").max(100, "First name too long"),
  lastName: z.string().trim().min(1, "Last name is required").max(100, "Last name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  groupSize: z.number().int("Group size must be an integer").min(1, "Group size must be at least 1").max(100, "Group size too large"),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date format (expected YYYY-MM-DD)"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid end date format (expected YYYY-MM-DD)").optional().nullable(),
  specialRequests: z.string().trim().max(2000, "Special requests too long").optional(),
});

const OWNER_EMAIL = "torreslj@dukes.jmu.edu";
const TEAM_EMAILS = [
  "torreslj@dukes.jmu.edu",
  // Add more team member emails here
];

// HTML escape function to prevent XSS in email templates
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate input
    const rawData = await req.json();
    const bookingData = bookingSchema.parse(rawData);
    
    console.log("Processing booking notification for:", bookingData.bookingRef);

    // Sanitize all user inputs for HTML templates
    const bookingRef = escapeHtml(bookingData.bookingRef);
    const contentName = escapeHtml(bookingData.contentName);
    const firstName = escapeHtml(bookingData.firstName);
    const lastName = escapeHtml(bookingData.lastName);
    const email = bookingData.email; // Already validated as email format
    const groupSize = bookingData.groupSize;
    const specialRequests = bookingData.specialRequests ? escapeHtml(bookingData.specialRequests) : '';

    const fullName = `${firstName} ${lastName}`;
    const contentTypeLabel = bookingData.contentType === 'safari' ? 'Safari' : 
                            bookingData.contentType === 'activity' ? 'Activity' : 'Location';

    // Email 1: Confirmation to the User
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2c5530; border-bottom: 3px solid #2c5530; padding-bottom: 10px;">
          Booking Request Received
        </h1>
        
        <p>Hi <strong>${fullName}</strong>,</p>
        
        <p>Thank you for your booking request with Grant Expedition! We've received your request and our team is reviewing it.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #2c5530; margin-top: 0;">Booking Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Reference Number:</td>
              <td style="padding: 8px 0;"><code style="background-color: #e0e0e0; padding: 4px 8px; border-radius: 4px;">${bookingRef}</code></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">${contentTypeLabel}:</td>
              <td style="padding: 8px 0;">${contentName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Start Date:</td>
              <td style="padding: 8px 0;">${new Date(bookingData.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
            ${bookingData.endDate ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">End Date:</td>
              <td style="padding: 8px 0;">${new Date(bookingData.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Group Size:</td>
              <td style="padding: 8px 0;">${groupSize} ${groupSize === 1 ? 'person' : 'people'}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
          <p style="margin: 0;"><strong>⏳ Status:</strong> Your request is pending review and is not yet confirmed.</p>
        </div>
        
        <h3 style="color: #2c5530;">What happens next?</h3>
        <ol style="line-height: 1.8;">
          <li>Our team will review your booking request and check availability</li>
          <li>We'll contact you at <strong>${email}</strong> within 24 hours</li>
          <li>Once confirmed, we'll send you a detailed itinerary and payment instructions</li>
        </ol>
        
        <p>If you have any questions or need to make changes to your booking, please reply to this email with your booking reference number: <strong>${bookingRef}</strong></p>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        
        <p style="color: #666; font-size: 14px;">
          <strong>Grant Expedition</strong><br>
          Creating unforgettable African adventures<br>
          Email: hello@grantexpedition.com
        </p>
      </div>
    `;

    // Get admin URL from environment
    const supabaseUrl = Deno.env.get("VITE_SUPABASE_URL") || "";
    const adminUrl = supabaseUrl.replace("https://", "https://").replace(".supabase.co", ".lovableproject.com");
    const manageBookingUrl = `${adminUrl}/admin?bookingRef=${encodeURIComponent(bookingRef)}`;

    // Email 2: Alert to the Product Owner/Team
    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <h1 style="color: #d32f2f; background-color: #ffebee; padding: 15px; border-radius: 8px;">
          🔔 NEW BOOKING REQUEST
        </h1>
        
        <p style="font-size: 16px; margin: 20px 0;">A new booking request has been submitted and requires your attention.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${manageBookingUrl}" style="display: inline-block; background-color: #2c5530; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            📋 Manage Booking Requests
          </a>
          <p style="margin-top: 10px; font-size: 14px; color: #666;">Click to view and respond to this booking</p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #2c5530; margin-top: 0;">Booking Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; background-color: #e8f5e9; font-weight: bold; width: 40%;">Reference Number</td>
              <td style="padding: 10px; background-color: #ffffff;"><code style="background-color: #e0e0e0; padding: 4px 8px; border-radius: 4px;">${bookingRef}</code></td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #e8f5e9; font-weight: bold;">Customer Name</td>
              <td style="padding: 10px; background-color: #ffffff;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #e8f5e9; font-weight: bold;">Email</td>
              <td style="padding: 10px; background-color: #ffffff;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #e8f5e9; font-weight: bold;">${contentTypeLabel}</td>
              <td style="padding: 10px; background-color: #ffffff;"><strong>${contentName}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #e8f5e9; font-weight: bold;">Content Type</td>
              <td style="padding: 10px; background-color: #ffffff;">${contentTypeLabel}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #e8f5e9; font-weight: bold;">Start Date</td>
              <td style="padding: 10px; background-color: #ffffff;">${new Date(bookingData.startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
            ${bookingData.endDate ? `
            <tr>
              <td style="padding: 10px; background-color: #e8f5e9; font-weight: bold;">End Date</td>
              <td style="padding: 10px; background-color: #ffffff;">${new Date(bookingData.endDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; background-color: #e8f5e9; font-weight: bold;">Group Size</td>
              <td style="padding: 10px; background-color: #ffffff;">${groupSize} ${groupSize === 1 ? 'person' : 'people'}</td>
            </tr>
            ${specialRequests ? `
            <tr>
              <td style="padding: 10px; background-color: #e8f5e9; font-weight: bold; vertical-align: top;">Special Requests</td>
              <td style="padding: 10px; background-color: #ffffff;">${specialRequests}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
          <p style="margin: 0;"><strong>⚡ Action Required:</strong> Please review this booking request and contact the customer within 1-3 business days to confirm availability and finalize the booking details.</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        
        <p style="color: #666; font-size: 12px;">
          This is an automated notification from the Grant Expedition booking system.<br>
          Booking submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Dar_es_Salaam' })} (EAT)
        </p>
      </div>
    `;

    // Note: Customer confirmation emails are currently disabled
    // To enable them, verify a domain at resend.com/domains and update the 'from' address
    console.log("Customer confirmation email skipped (requires domain verification in Resend)");
    console.log("Customer would receive email at:", email);
    
    // Send owner notification email only
    console.log("Sending owner notification email to:", TEAM_EMAILS);
    const ownerEmailResponse = await resend.emails.send({
      from: "Grant Expedition <onboarding@resend.dev>",
      to: TEAM_EMAILS,
      subject: `NEW BOOKING REQUEST: ${contentName} - ${new Date(bookingData.startDate).toLocaleDateString()}`,
      html: ownerEmailHtml,
    });

    console.log("Owner email response:", ownerEmailResponse);

    if (ownerEmailResponse.error) {
      throw new Error(
        `Email sending failed: ${ownerEmailResponse.error?.message}`
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Owner notification sent successfully. Customer email skipped (requires domain verification).",
        ownerEmailId: ownerEmailResponse.data?.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-notifications function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString(),
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
