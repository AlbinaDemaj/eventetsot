<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentService
{
    protected string $baseUrl = 'https://ecommerce.ibas.world';
    protected string $key;
    protected string $secret;
    protected ?string $token = null;

    public function __construct()
    {
        $this->key = (string) config('services.ibas.key');
        $this->secret = (string) config('services.ibas.secret');
    }

    public function generateToken(): void
    {
        // Shpesh gateway-t presin base64 të key:secret
        $this->token = base64_encode($this->key . ':' . $this->secret);
    }

    public function processPayment(
        string $clientOrderId,
        float $amount,
        string $callbackUrl,
        string $redirectUrl = null
    ): string {
        if (!$this->token) {
            $this->generateToken();
        }

        $formattedAmount = number_format($amount, 2, '.', '');

        $payload = [
            'ClientOrderId' => (string) $clientOrderId,
            'Amount' => $formattedAmount,
            'CallbackUrl' => $callbackUrl,
        ];

        if (!empty($redirectUrl)) {
            $payload['RedirectUrl'] = $redirectUrl;
        }

        Log::info('IBAS payment request', [
            'url' => "{$this->baseUrl}/Banking",
            'payload' => $payload,
            'callbackUrl' => $callbackUrl,
            'redirectUrl' => $redirectUrl,
            'is_local_callback' => str_contains($callbackUrl, '127.0.0.1') || str_contains($callbackUrl, 'localhost'),
        ]);

        $response = Http::withHeaders([
            'Token' => $this->token,
            'Accept' => 'text/html,application/json',
        ])->post("{$this->baseUrl}/Banking", $payload);

        if (!$response->successful()) {
            Log::error('IBAS Payment Processing Failed', [
                'status' => $response->status(),
                'response' => $response->body(),
                'payload' => $payload,
            ]);

            throw new \Exception('Payment processing failed: ' . $response->body());
        }

        $body = $response->body();

        Log::info('IBAS payment response received', [
            'status' => $response->status(),
            'body_preview' => mb_substr($body, 0, 500),
        ]);

        return $body;
    }

    public function verifyPayment(string $orderId): bool
    {
        if (!$this->token) {
            $this->generateToken();
        }

        $response = Http::withHeaders([
            'Token' => $this->token,
            'Accept' => 'application/json',
        ])->get("{$this->baseUrl}/Payment/Verify/{$orderId}");

        if ($response->successful()) {
            return (bool) $response->json('IsSuccess', false);
        }

        Log::error('IBAS Payment Verification Failed', [
            'status' => $response->status(),
            'response' => $response->body(),
            'orderId' => $orderId,
        ]);

        return false;
    }

    public function handleCallback(array $data): array
    {
        return [
            'success' => true,
            'transaction_id' => $data['orderId'] ?? null,
            'client_order_id' => $data['ClientOrderId'] ?? null,
        ];
    }
}