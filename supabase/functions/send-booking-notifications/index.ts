import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  bookingRef: string;
  contentType: string;
  contentName: string;
  firstName: string;
  lastName: string;
  email: string;
  groupSize: number;
  startDate: string;
  endDate?: string;
  specialRequests?: string;
}

const OWNER_EMAIL = "torreslj@dukes.jmu.edu";
const TEAM_EMAILS = [
  "torreslj@dukes.jmu.edu",
  // Add more team member emails here
];

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingNotificationRequest = await req.json();
    
    console.log("Processing booking notification for:", bookingData.bookingRef);

    const {
      bookingRef,
      contentType,
      contentName,
      firstName,
      lastName,
      email,
      groupSize,
      startDate,
      endDate,
      specialRequests,
    } = bookingData;

    const fullName = `${firstName} ${lastName}`;
    const contentTypeLabel = contentType === 'safari' ? 'Safari' : 
                            contentType === 'activity' ? 'Activity' : 'Location';

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
              <td style="padding: 8px 0;">${new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
            ${endDate ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">End Date:</td>
              <td style="padding: 8px 0;">${new Date(endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
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

    // Email 2: Alert to the Product Owner/Team
    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <h1 style="color: #d32f2f; background-color: #ffebee; padding: 15px; border-radius: 8px;">
          🔔 NEW BOOKING REQUEST
        </h1>
        
        <p style="font-size: 16px; margin: 20px 0;">A new booking request has been submitted and requires your attention.</p>
        
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
              <td style="padding: 10px; background-color: #ffffff;">${new Date(startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
            ${endDate ? `
            <tr>
              <td style="padding: 10px; background-color: #e8f5e9; font-weight: bold;">End Date</td>
              <td style="padding: 10px; background-color: #ffffff;">${new Date(endDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
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
          <p style="margin: 0;"><strong>⚡ Action Required:</strong> Please review this booking request and contact the customer within 24 hours to confirm availability and finalize the booking details.</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        
        <p style="color: #666; font-size: 12px;">
          This is an automated notification from the Grant Expedition booking system.<br>
          Booking submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Dar_es_Salaam' })} (EAT)
        </p>
      </div>
    `;

    // Send both emails
    const [userEmailResponse, ownerEmailResponse] = await Promise.all([
      // User confirmation email
      resend.emails.send({
        from: "Grant Expedition <onboarding@resend.dev>", // Update with verified domain
        to: [email],
        subject: `${contentName} Booking Request Received (Ref: ${bookingRef})`,
        html: userEmailHtml,
      }),
      
      // Owner and team alert email
      resend.emails.send({
        from: "Grant Expedition Bookings <onboarding@resend.dev>", // Update with verified domain
        to: TEAM_EMAILS,
        subject: `NEW BOOKING REQUEST: ${contentName} - ${new Date(startDate).toLocaleDateString()}`,
        html: ownerEmailHtml,
      }),
    ]);

    console.log("User email response:", userEmailResponse);
    console.log("Owner email response:", ownerEmailResponse);

    if (userEmailResponse.error || ownerEmailResponse.error) {
      throw new Error(
        `Email sending failed: ${userEmailResponse.error?.message || ownerEmailResponse.error?.message}`
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Booking notifications sent successfully",
        userEmailId: userEmailResponse.data?.id,
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
