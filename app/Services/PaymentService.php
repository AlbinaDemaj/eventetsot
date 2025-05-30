<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PaymentService
{
    protected string $baseUrl = 'https://ibascommerce.pbc.group';
    protected string $key;
    protected string $secret;
    protected ?string $token = null;

    public function __construct()
    {
        $this->key = config('services.ibas.key');
        $this->secret = config('services.ibas.secret');
    }

    /**
     * Generate authentication token
     */
    public function generateToken(): void
    {
        $this->token = $this->key.':'.$this->secret;
    }

    /**
     * Process payment with IBAS
     */
    public function processPayment(
        string $clientOrderId,
        float $amount,
        string $callbackUrl,
        string $redirectUrl = null
    ): string {
        if (!$this->token) {
            $this->generateToken();
        }

        $payload = [
            'ClientOrderId' => $clientOrderId,
            'Amount' => $amount,
            'CallbackUrl' => $callbackUrl,
            'Language' => 'EN'
        ];

        if ($redirectUrl) {
            $payload['RedirectUrl'] = $redirectUrl;
        }

        $response = Http::withHeaders([
            'Token' => $this->token,
        ])->post("{$this->baseUrl}/Banking", $payload);

        if (!$response->successful()) {
            Log::error('IBAS Payment Processing Failed', [
                'status' => $response->status(),
                'response' => $response->body(),
                'payload' => $payload
            ]);
            throw new \Exception('Payment processing failed');
        }

        return $response->body(); // Return raw HTML form
    }

    /**
     * Verify payment status
     */
    public function verifyPayment(string $orderId): bool
    {
        if (!$this->token) {
            $this->generateToken();
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->token
        ])->get("{$this->baseUrl}/Payment/Verify/{$orderId}");

        if ($response->successful()) {
            return $response->json('IsSuccess', false);
        }

        Log::error('IBAS Payment Verification Failed', [
            'status' => $response->status(),
            'response' => $response->body(),
            'orderId' => $orderId
        ]);

        return false;
    }

    public function handleCallback(array $data): array
    {
        return [
            'success' => filter_var($data['IsSuccess'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'transaction_id' => $data['OrderId'] ?? null,
            'client_order_id' => $data['ClientOrderId'] ?? null
        ];
    }
}
