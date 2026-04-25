@extends('admin.layouts.app')

@section('content')
<div class="container-fluid py-4">
    <div class="main-content">

        {{-- Header --}}
        <div class="plans-hero mb-4">
            <div class="row g-4 align-items-center">
                <div class="col-lg-8">
                    <span class="plans-badge">
                        <i class="fa-solid fa-layer-group me-2"></i>
                        Subscription Management
                    </span>
                    <h2 class="plans-title mt-3 mb-2">Subscription Plans</h2>
                    <p class="plans-subtitle mb-0">
                        Manage pricing plans, update existing packages and create new offers for your platform.
                    </p>
                </div>

                <div class="col-lg-4">
                    <div class="plans-hero-side">
                        <div class="plans-mini-stat">
                            <span>Total Plans</span>
                            <strong>{{ $subscription_plans->count() }}</strong>
                        </div>

                        <button type="button" class="add-plan-btn w-100 mt-3" data-bs-toggle="modal" data-bs-target="#createPlanModal">
                            <i class="fa-solid fa-plus me-2"></i>
                            Add New Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>

        @if(session('success'))
            <div class="alert custom-success-alert rounded-4 border-0 mb-4">
                <i class="fa-solid fa-circle-check me-2"></i>
                {{ session('success') }}
            </div>
        @endif

        {{-- Cards --}}
        <div class="row g-4">
            @forelse($subscription_plans as $subscription_plan)
                <div class="col-md-6 col-xl-4">
                    <div class="plan-card h-100">
                        <div class="plan-card-top">
                            <div class="plan-icon">
                                <i class="fa-solid fa-crown"></i>
                            </div>

                            <span class="plan-price-badge">
                                € {{ number_format($subscription_plan->price, 2) }}
                            </span>
                        </div>

                        <div class="plan-card-body">
                            <h3 class="plan-name">{{ $subscription_plan->name }}</h3>
                            <p class="plan-id mb-4">Plan ID: #{{ $subscription_plan->id }}</p>

                            <div class="plan-meta-list">
                                <div class="plan-meta-item">
                                    <div class="meta-icon">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </div>
                                    <div>
                                        <span>Created on</span>
                                        <strong>{{ optional($subscription_plan->created_at)->format('d M Y') }}</strong>
                                    </div>
                                </div>

                                <div class="plan-meta-item">
                                    <div class="meta-icon">
                                        <i class="fa-solid fa-clock-rotate-left"></i>
                                    </div>
                                    <div>
                                        <span>Last updated</span>
                                        <strong>{{ optional($subscription_plan->updated_at)->format('d M Y') }}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="plan-card-footer">
                            <button
                                type="button"
                                class="plan-action-btn edit-btn"
                                data-id="{{ $subscription_plan->id }}"
                                data-name="{{ $subscription_plan->name }}"
                                data-price="{{ $subscription_plan->price }}"
                                onclick="prepareEditForm(this)"
                            >
                                <i class="fa-solid fa-pen-to-square me-2"></i>
                                Edit
                            </button>

                            <form action="{{ route('admin.subscription-plans.destroy', $subscription_plan->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this plan?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="plan-action-btn delete-btn">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-12">
                    <div class="empty-plans-state text-center">
                        <div class="empty-icon-wrap">
                            <i class="fa-solid fa-layer-group"></i>
                        </div>
                        <h4 class="mt-4 mb-2">No Subscription Plans Yet</h4>
                        <p class="text-muted mb-4">
                            Start by creating your first subscription plan for users.
                        </p>
                        <button type="button" class="add-plan-btn" data-bs-toggle="modal" data-bs-target="#createPlanModal">
                            <i class="fa-solid fa-plus me-2"></i>
                            Create First Plan
                        </button>
                    </div>
                </div>
            @endforelse
        </div>
    </div>
</div>

{{-- Create Modal --}}
<div class="modal fade" id="createPlanModal" tabindex="-1" aria-labelledby="createPlanModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content premium-modal">
            <div class="modal-header border-0 pb-0">
                <div>
                    <h5 class="modal-title fw-bold" id="createPlanModalLabel">Add Subscription Plan</h5>
                    <p class="text-muted small mb-0">Create a new pricing package</p>
                </div>
                <button type="button" class="btn-close-custom" data-bs-dismiss="modal" aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="modal-body pt-3">
                <form action="{{ route('admin.subscription-plans.store') }}" method="POST">
                    @csrf

                    <div class="premium-form-group mb-3">
                        <label for="create_name">Plan Name</label>
                        <input
                            type="text"
                            id="create_name"
                            name="name"
                            class="form-control premium-input"
                            placeholder="Enter plan name"
                            required
                        >
                    </div>

                    <div class="premium-form-group mb-4">
                        <label for="create_price">Price (€)</label>
                        <input
                            type="number"
                            id="create_price"
                            name="price"
                            class="form-control premium-input"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            required
                        >
                    </div>

                    <div class="d-flex justify-content-end">
                        <button type="submit" class="submit-plan-btn">
                            <i class="fa-solid fa-plus me-2"></i>
                            Create Plan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

{{-- Edit Modal --}}
<div class="modal fade" id="planModal" tabindex="-1" aria-labelledby="planModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content premium-modal">
            <div class="modal-header border-0 pb-0">
                <div>
                    <h5 class="modal-title fw-bold" id="planModalLabel">Edit Subscription Plan</h5>
                    <p class="text-muted small mb-0">Update plan details</p>
                </div>
                <button type="button" class="btn-close-custom" data-bs-dismiss="modal" aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="modal-body pt-3">
                <form id="planForm" method="POST">
                    @csrf
                    @method('PUT')

                    <input type="hidden" id="planId" name="plan_id">

                    <div class="premium-form-group mb-3">
                        <label for="name">Plan Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            class="form-control premium-input"
                            placeholder="Enter plan name"
                            required
                        >
                    </div>

                    <div class="premium-form-group mb-4">
                        <label for="price">Price (€)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            class="form-control premium-input"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            required
                        >
                    </div>

                    <div class="d-flex justify-content-end">
                        <button type="submit" class="submit-plan-btn">
                            <i class="fa-solid fa-floppy-disk me-2"></i>
                            Update Plan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<style>
    .plans-hero {
        background: linear-gradient(135deg, #ffffff 0%, #f8fbff 45%, #f5f7fb 100%);
        border: 1px solid #edf2f7;
        border-radius: 28px;
        padding: 32px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 18px 45px rgba(15, 23, 42, 0.05);
    }

    .plans-hero::before {
        content: "";
        position: absolute;
        top: -70px;
        right: -70px;
        width: 220px;
        height: 220px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.10), transparent 70%);
        border-radius: 50%;
    }

    .plans-badge {
        display: inline-flex;
        align-items: center;
        background: #eef2ff;
        color: #4338ca;
        padding: 8px 14px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 700;
    }

    .plans-title {
        font-size: 34px;
        font-weight: 800;
        color: #0f172a;
        letter-spacing: -0.03em;
    }

    .plans-subtitle {
        color: #64748b;
        max-width: 620px;
    }

    .plans-hero-side {
        background: rgba(255,255,255,0.8);
        border: 1px solid #eef2f7;
        border-radius: 22px;
        padding: 20px;
        backdrop-filter: blur(8px);
    }

    .plans-mini-stat {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .plans-mini-stat span {
        color: #64748b;
        font-size: 14px;
    }

    .plans-mini-stat strong {
        font-size: 28px;
        font-weight: 800;
        color: #0f172a;
    }

    .add-plan-btn {
        border: none;
        background: linear-gradient(135deg, #111827, #1f2937);
        color: #fff;
        padding: 14px 20px;
        border-radius: 14px;
        font-weight: 700;
        transition: all 0.25s ease;
    }

    .add-plan-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 28px rgba(17, 24, 39, 0.18);
    }

    .custom-success-alert {
        background: #ecfdf3;
        color: #166534;
        padding: 16px 18px;
        box-shadow: 0 10px 24px rgba(22, 101, 52, 0.08);
    }

    .plan-card {
        background: linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
        border: 1px solid #eef2f7;
        border-radius: 24px;
        padding: 22px;
        box-shadow: 0 14px 34px rgba(15, 23, 42, 0.05);
        transition: all 0.28s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100%;
    }

    .plan-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 24px 50px rgba(15, 23, 42, 0.10);
        border-color: #dbe4f0;
    }

    .plan-card-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 22px;
    }

    .plan-icon {
        width: 58px;
        height: 58px;
        border-radius: 18px;
        background: linear-gradient(135deg, #2563eb, #4338ca);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        box-shadow: 0 14px 28px rgba(37, 99, 235, 0.22);
    }

    .plan-price-badge {
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        color: #0f172a;
        padding: 10px 14px;
        border-radius: 999px;
        font-size: 15px;
        font-weight: 800;
    }

    .plan-name {
        font-size: 24px;
        font-weight: 800;
        color: #0f172a;
        margin-bottom: 6px;
    }

    .plan-id {
        color: #94a3b8;
        font-size: 13px;
    }

    .plan-meta-list {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    .plan-meta-item {
        display: flex;
        align-items: center;
        gap: 14px;
        background: #f8fafc;
        border: 1px solid #eef2f7;
        border-radius: 16px;
        padding: 14px;
    }

    .meta-icon {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: #eef2ff;
        color: #4338ca;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .plan-meta-item span {
        display: block;
        font-size: 12px;
        color: #94a3b8;
        margin-bottom: 2px;
    }

    .plan-meta-item strong {
        color: #0f172a;
        font-size: 14px;
    }

    .plan-card-footer {
        display: flex;
        gap: 12px;
        margin-top: 24px;
    }

    .plan-action-btn {
        border: none;
        border-radius: 14px;
        font-weight: 700;
        transition: all 0.25s ease;
    }

    .edit-btn {
        flex: 1;
        background: linear-gradient(135deg, #111827, #1f2937);
        color: #fff;
        padding: 13px 16px;
    }

    .edit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 24px rgba(17, 24, 39, 0.16);
    }

    .delete-btn {
        width: 52px;
        height: 52px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: #fff;
    }

    .delete-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 24px rgba(220, 38, 38, 0.18);
    }

    .empty-plans-state {
        background: #ffffff;
        border: 1px solid #eef2f7;
        border-radius: 28px;
        padding: 60px 20px;
        box-shadow: 0 14px 34px rgba(15, 23, 42, 0.05);
    }

    .empty-icon-wrap {
        width: 84px;
        height: 84px;
        margin: 0 auto;
        border-radius: 24px;
        background: linear-gradient(135deg, #eef2ff, #f8fafc);
        color: #4338ca;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
    }

    .premium-modal {
        border: none;
        border-radius: 24px;
        box-shadow: 0 30px 60px rgba(15, 23, 42, 0.15);
        overflow: hidden;
    }

    .premium-form-group label {
        display: block;
        font-size: 14px;
        font-weight: 700;
        color: #334155;
        margin-bottom: 8px;
    }

    .premium-input {
        height: 52px;
        border-radius: 14px;
        border: 1px solid #dbe4f0;
        padding: 0 16px;
        box-shadow: none !important;
    }

    .premium-input:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08) !important;
    }

    .submit-plan-btn {
        border: none;
        background: linear-gradient(135deg, #2563eb, #4338ca);
        color: white;
        padding: 13px 20px;
        border-radius: 14px;
        font-weight: 700;
        transition: all 0.25s ease;
    }

    .submit-plan-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 28px rgba(37, 99, 235, 0.20);
    }

    .btn-close-custom {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        border: none;
        background: #f8fafc;
        color: #64748b;
        transition: all 0.2s ease;
    }

    .btn-close-custom:hover {
        background: #eef2f7;
        color: #0f172a;
    }

    @media (max-width: 768px) {
        .plans-hero {
            padding: 24px;
        }

        .plans-title {
            font-size: 28px;
        }

        .plan-card {
            padding: 18px;
        }
    }
</style>

<script>
    function prepareEditForm(button) {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = button.dataset.price;

        document.getElementById('planId').value = id;
        document.getElementById('name').value = name;
        document.getElementById('price').value = price;
        document.getElementById('planForm').action = `/admin/subscription-plans/${id}`;

        const modal = new bootstrap.Modal(document.getElementById('planModal'));
        modal.show();
    }
</script>
@endsection