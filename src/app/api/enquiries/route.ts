import { NextResponse } from 'next/server';
import db from '@/src/lib/db';
import { checkRateLimit, getClientIp } from '@/src/lib/rateLimit';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rate = checkRateLimit(`enquiry:${clientIp}`, 10, 10 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Too many enquiry submissions. Please wait ${rate.retryAfterSeconds} seconds.` },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim().slice(0, 120) : '';
    const businessName = typeof body.businessName === 'string' ? body.businessName.trim().slice(0, 150) : '';
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 150) : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 50) : '';
    const serviceInterest = typeof body.serviceInterest === 'string' ? body.serviceInterest.trim().slice(0, 150) : '';
    const projectDescription = typeof body.projectDescription === 'string' ? body.projectDescription.trim().slice(0, 2500) : '';
    const estimatedBudget = typeof body.estimatedBudget === 'string' ? body.estimatedBudget.trim().slice(0, 100) : '';
    const preferredContact = typeof body.preferredContact === 'string' ? body.preferredContact.trim().slice(0, 50) : 'WhatsApp';
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId.trim().slice(0, 80) : null;
    const consentGiven = body.consentGiven === true;

    if (!consentGiven) {
      return NextResponse.json(
        { error: 'Please confirm your consent before submitting your contact details.' },
        { status: 400 }
      );
    }

    if (!fullName || fullName.length < 2) {
      return NextResponse.json({ error: 'Please provide your full name.' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }
    if (!phone || phone.length < 6) {
      return NextResponse.json({ error: 'Please provide a valid WhatsApp or telephone number.' }, { status: 400 });
    }
    if (!serviceInterest) {
      return NextResponse.json({ error: 'Please select or specify a service of interest.' }, { status: 400 });
    }
    if (!projectDescription || projectDescription.length < 5) {
      return NextResponse.json({ error: 'Please enter a brief project description.' }, { status: 400 });
    }

    const insertTx = db.transaction(() => {
      const info = db
        .prepare(
          `INSERT INTO enquiries (
            session_id, full_name, business_name, email, phone,
            service_interest, project_description, estimated_budget,
            preferred_contact, consent_given, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'new')`
        )
        .run(
          sessionId,
          fullName,
          businessName,
          email,
          phone,
          serviceInterest,
          projectDescription,
          estimatedBudget,
          preferredContact
        );

      const leadSummary = `[Webhouse AI Enquiry #WH-${info.lastInsertRowid}] Business: ${businessName || 'N/A'} | Service: ${serviceInterest} | Budget: ${estimatedBudget || 'Not specified'} | Preferred: ${preferredContact}\n${projectDescription}`;
      db.prepare(`INSERT INTO leads (name, email, phone, message) VALUES (?, ?, ?, ?)`).run(
        fullName,
        email,
        phone,
        leadSummary
      );

      if (sessionId) {
        db.prepare(
          `UPDATE chat_sessions SET visitor_name = ?, visitor_email = ?, visitor_phone = ?, recommended_service = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        ).run(fullName, email, phone, serviceInterest, sessionId);
      }

      return info.lastInsertRowid;
    });

    const enquiryId = insertTx();
    return NextResponse.json({
      success: true,
      enquiryId,
      referenceCode: `WH-${enquiryId}`,
      message: 'Your enquiry has been securely recorded. Our team will follow up via your preferred contact method.',
    });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json(
      { error: 'Unable to save your enquiry right now. Please try again or reach us on WhatsApp at +234 815 246 9749.' },
      { status: 500 }
    );
  }
}
