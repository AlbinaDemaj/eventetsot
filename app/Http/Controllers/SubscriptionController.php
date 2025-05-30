<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use App\Services\PaymentService;
use App\Services\SubscriptionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SubscriptionController extends Controller
{
    public function __construct(
        protected SubscriptionService $subscriptionService,
        protected PaymentService $paymentService
    ) {
        $this->middleware('auth');
    }

    public function index()
    {
        $plans = SubscriptionPlan::active()->get();
        $activeSubscription = Auth::user()->activeSubscription;

        return view('pricing', compact('plans', 'activeSubscription'));
    }

    public function subscribe(Request $request, SubscriptionPlan $plan)
    {
        $user = $request->user();

        if ($plan->price <= 0) {
            $subscription = $this->subscriptionService->createSubscription(
                user: $user,
                plan: $plan,
                autoRenew: $request->boolean('auto_renew', true),
                paymentMethod: 'free',
                status: 'active'
            );

            return redirect()->route('pricing')
                ->with('success', __('Successfully subscribed to :plan', ['plan' => $plan->name]));
        }

        try {
            // Create pending subscription first
            $subscription = $this->subscriptionService->createSubscription(
                user: $user,
                plan: $plan,
                autoRenew: $request->boolean('auto_renew', true),
                paymentMethod: 'ibas',
                status: 'pending',
            );

            $callbackUrl = route('subscription.payment.callback', [
                'plan' => $plan->id,
                'subscription' => $subscription->id,
            ]);
            $callbackUrl = $callbackUrl . '?' . http_build_query(['orderId' => $subscription->id]);

            $redirectUrl = route('subscription.payment.redirect', [
                'plan' => $plan->id,
                'subscription' => $subscription->id
            ]);
            $redirectUrl = $redirectUrl . '?' . http_build_query(['orderId' => $subscription->id]);


            $paymentFormHtml = $this->paymentService->processPayment(
                clientOrderId: $subscription->id, // Use subscription ID as ClientOrderId
                amount: $plan->price,
                callbackUrl: $callbackUrl,
                redirectUrl: $redirectUrl
            );

            return view('website.payment-form', [
                'formHtml' => $paymentFormHtml,
                'plan' => $plan
            ]);

        } catch (\Exception $e) {
            // Mark as failed if error occurs
            if (isset($subscription)) {
                $subscription->update(['status' => 'failed']);
            }

            return redirect()->back()
                ->with('error', __('Payment failed: :message', [
                    'message' => $e->getMessage()
                ]));
        }
    }

    public function handlePaymentCallback(Request $request, SubscriptionPlan $plan, UserSubscription $subscription)
    {
        try {
            Log::info('IBAS Callback: ', $request->all());
            return response('OK');
            $callbackData = $this->paymentService->handleCallback($request->all());

            if ($callbackData['success']) {
                $this->subscriptionService->activateSubscription(
                    $subscription,
                    $callbackData['transaction_id'] ?? $request->input('OrderId')
                );

                // Additional payment success logic if needed
            } else {
                $subscription->update(['status' => 'failed']);
            }

            return response()->json(['status' => 'success']);

        } catch (\Exception $e) {
            Log::error('Subscription callback failed', [
                'error' => $e->getMessage(),
                'subscription_id' => $subscription->id
            ]);

            $subscription->update(['status' => 'failed']);

            return response()->json(['status' => 'error'], 500);
        }
    }

    public function handlePaymentRedirect(Request $request, SubscriptionPlan $plan, UserSubscription $subscription)
    {
        try {
            $callbackData = $this->paymentService->handleCallback($request->all());

            if ($callbackData['success']) {
                $this->subscriptionService->activateSubscription(
                    $subscription,
                    $callbackData['transaction_id'] ?? $request->input('OrderId')
                );

                return redirect()->route('pricing')
                    ->with('success', __('Subscription activated successfully!'));
            }

            $subscription->update(['status' => 'failed']);
            return redirect()->route('pricing')
                ->with('error', __('Payment failed. Please try again.'));

        } catch (\Exception $e) {
            $subscription->update(['status' => 'failed']);
            return redirect()->route('pricing')
                ->with('error', __('There was an error processing your payment.'));
        }
    }
}
