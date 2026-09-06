import "server-only";

export interface OrderRow {
  name: string;
  phone: string;
  governorate: string;
  address: string;
  quantity: number;
  unitPrice: number;
  totalProducts: number;
  shipping: number;
  grandTotal: number;
  productName: string;
  colorAndSize: string;
  orderId: string;
  taagerId: string;
  date: string;
}

/**
 * Sends a new order row to the Google Sheets Apps Script webhook.
 * The webhook URL (and any secret/key it needs) lives only in server
 * environment variables and is never exposed to the browser.
 */
export async function appendOrderToSheet(row: OrderRow): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not configured");
  }

  // Column order MUST match the sheet headers exactly:
  // A..N -> الاسم, رقم الهاتف, المدينة, العنوان, الكمية, السعر, إجمالي السعر,
  //         الشحن, الإجمالي الكلي, اسم المنتج, اللون والمقاس, رقم الطلب, Taager ID, التاريخ
  const rowValues = [
  row.name,
  row.phone,
  row.governorate,
  row.address,
  row.quantity,
  row.unitPrice,
  row.shipping,
  row.grandTotal,
  row.productName,
  row.colorAndSize,
  row.date,
  row.orderId,
  row.taagerId,
];

  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  // Payload contract expected by the Apps Script doPost handler
  // (see README.md -> "Google Sheets Apps Script" for the exact script to deploy):
  //   { apiKey?: string, row: [14 values in column A..N order] }
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...(apiKey ? { apiKey } : {}),
      row: rowValues,
    }),
    // Apps Script webhooks can be slow to cold-start; give it a moment.
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Google Sheets webhook failed (${response.status}): ${text}`);
  }
}
