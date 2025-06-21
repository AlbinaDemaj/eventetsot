@extends('admin.layouts.app')

@section('content')
    <div class="container-fluid">
        <div class="main-content">
            <div class="create-event-head">
                <div class="view-event-text">
                    <h2>Subscription Plans</h2>
                    <p>Manage your subscription plans</p>
                </div>
            </div>
            <div class="row">
                @foreach($subscription_plans as $subscription_plan)
                    <div class="col-md-4 mb-4"
                         onclick="prepareEditForm({{ json_encode($subscription_plan) }})"
                         style="cursor: pointer">
                        <div class="event-card">
                            <div class="event-card-header">
                                <h3>{{ $subscription_plan->name }}</h3>
                            </div>
                            <span class="plan-badge text-capitalize">€ {{ $subscription_plan->price }}</span>
                            <div class="event-card-list">
                                <i class="fa-solid fa-calendar-days"></i>
                                <h5><span>Created on</span> {{ $subscription_plan->created_at->format('d M Y') }}</h5>
                            </div>
                            <div class="event-card-btn">
                                Update Plan
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>

    <!-- Edit Plan Modal -->
    <div class="modal fade" id="planModal" tabindex="-1" aria-labelledby="planModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content add-event">
                <div class="modal-header">
                    <h5 class="modal-title" id="planModalLabel">Edit Subscription Plan</h5>
                    <button type="button" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-area">
                        <form id="planForm" method="POST">
                            @csrf
                            @method('PUT')
                            <input type="hidden" id="planId" name="plan_id">

                            <div class="form-group">
                                <label for="name">Plan Name</label>
                                <div class="input-wrapper">
                                    <input type="text" id="name" name="name" placeholder="Plan Name" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="price">Price (€)</label>
                                <div class="input-wrapper">
                                    <input type="number" id="price" name="price" step="0.01" min="0" placeholder="0.00" required>
                                </div>
                            </div>

                            <div class="d-flex justify-content-between">
                                <button type="submit" class="login-btn mb-3">
                                    Update Plan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function prepareEditForm(planData) {
            // Populate form directly from the passed data
            document.getElementById('planId').value = planData.id;
            document.getElementById('name').value = planData.name;
            document.getElementById('price').value = planData.price;

            // Set form action
            document.getElementById('planForm').action = `/admin/subscription-plans/${planData.id}`;

            // Show modal
            const modal = new bootstrap.Modal(document.getElementById('planModal'));
            modal.show();
        }
    </script>
@endsection
