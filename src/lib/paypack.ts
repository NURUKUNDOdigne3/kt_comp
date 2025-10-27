export interface PaypackAuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface PaypackPaymentRequest {
  amount: number;
  number: string;
  environment: "production" | "sandbox";
  return_url: string;
  webhook_url?: string;
}

export interface PaypackPaymentResponse {
  ref: string;
  redirect_url: string;
  status: string;
}

export class PaypackService {
  private baseUrl: string;
  private clientId: string;
  private clientSecret: string;

  constructor() {
    this.baseUrl = process.env.PAYPACK_BASE_URL || "https://payments.paypack.rw/api";
    this.clientId = process.env.PAYPACK_CLIENT_ID || "";
    this.clientSecret = process.env.PAYPACK_CLIENT_SECRET || "";
  }

  async authenticate(): Promise<PaypackAuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/agents/authorize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Authentication failed");
    }

    return response.json();
  }

  async initiatePayment(
    accessToken: string,
    paymentData: PaypackPaymentRequest
  ): Promise<PaypackPaymentResponse> {
    const response = await fetch(`${this.baseUrl}/transactions/cashin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Payment initiation failed");
    }

    return response.json();
  }

  async checkTransactionStatus(
    accessToken: string,
    transactionRef: string
  ): Promise<any> {
    const response = await fetch(`${this.baseUrl}/transactions/${transactionRef}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to check transaction status");
    }

    return response.json();
  }
}

export const paypackService = new PaypackService();