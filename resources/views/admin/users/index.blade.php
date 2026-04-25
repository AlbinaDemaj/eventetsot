@extends('admin.layouts.app')

@section('content')
<div class="container-fluid py-4">
    <div class="main-content">

        {{-- Hero Header --}}
        <div class="users-hero mb-4">
            <div class="row g-4 align-items-center">
                <div class="col-lg-8">
                    <span class="users-badge">
                        <i class="fa-solid fa-users me-2"></i>
                        User Management
                    </span>

                    <h2 class="users-title mt-3 mb-2">Users</h2>
                    <p class="users-subtitle mb-0">
                        Manage registered users, control member type and keep your platform organized in one place.
                    </p>
                </div>

                <div class="col-lg-4">
                    <div class="users-hero-side">
                        <div class="users-mini-stat">
                            <span>Total Users</span>
                            <strong>{{ $users->count() }}</strong>
                        </div>

                        <button
                            type="button"
                            class="add-user-btn w-100 mt-3"
                            onclick="prepareCreateForm()"
                            data-bs-toggle="modal"
                            data-bs-target="#userModal"
                        >
                            <i class="fa-solid fa-circle-plus me-2"></i>
                            Create User
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {{-- Optional quick stats --}}
        <div class="row g-4 mb-4">
            <div class="col-md-4">
                <div class="mini-stat-card">
                    <div class="mini-stat-icon blue">
                        <i class="fa-solid fa-users"></i>
                    </div>
                    <div>
                        <span>Total Users</span>
                        <strong>{{ $users->count() }}</strong>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="mini-stat-card">
                    <div class="mini-stat-icon green">
                        <i class="fa-solid fa-user-check"></i>
                    </div>
                    <div>
                        <span>Paid Members</span>
                        <strong>{{ $users->filter(fn($user) => $user->activeSubscription && optional($user->activeSubscription()->first())->payment_method !== 'free')->count() }}</strong>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="mini-stat-card">
                    <div class="mini-stat-icon orange">
                        <i class="fa-solid fa-user-clock"></i>
                    </div>
                    <div>
                        <span>Free / No Plan</span>
                        <strong>{{ $users->filter(fn($user) => !$user->activeSubscription || optional($user->activeSubscription()->first())->payment_method === 'free')->count() }}</strong>
                    </div>
                </div>
            </div>
        </div>

        {{-- User cards --}}
        <div class="row g-4">
            @forelse($users as $user)
                @php
                    $subscription = $user->activeSubscription ? $user->activeSubscription()->first() : null;
                    $isPaid = $subscription && $subscription->payment_method !== 'free';
                    $hasNoSubscription = !$subscription;
                @endphp

                <div class="col-md-6 col-xl-4">
                    <div class="user-card h-100" onclick="prepareEditForm({{ $user->id }})" style="cursor: pointer">
                        <div class="user-card-top">
                            <div class="user-avatar">
                                {{ strtoupper(substr($user->name, 0, 1)) }}
                            </div>

                            @if($hasNoSubscription)
                                <span class="status-badge status-muted">
                                    <i class="fa-solid fa-circle-minus me-1"></i>
                                    No Subscription
                                </span>
                            @elseif($isPaid)
                                <span class="status-badge status-paid">
                                    <i class="fa-solid fa-crown me-1"></i>
                                    Paid Member
                                </span>
                            @else
                                <span class="status-badge status-free">
                                    <i class="fa-solid fa-gift me-1"></i>
                                    Free Member
                                </span>
                            @endif
                        </div>

                        <div class="user-card-body">
                            <h3 class="user-name">{{ $user->name }}</h3>
                            <p class="user-email">{{ $user->email }}</p>

                            <div class="user-meta-list">
                                <div class="user-meta-item">
                                    <div class="meta-icon">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </div>
                                    <div>
                                        <span>Created on</span>
                                        <strong>{{ optional($user->created_at)->format('d M Y') }}</strong>
                                    </div>
                                </div>

                                <div class="user-meta-item">
                                    <div class="meta-icon">
                                        <i class="fa-solid fa-id-badge"></i>
                                    </div>
                                    <div>
                                        <span>User ID</span>
                                        <strong>#{{ $user->id }}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="user-card-footer">
                            <div class="manage-user-btn">
                                <i class="fa-solid fa-pen-to-square me-2"></i>
                                Manage User
                            </div>
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-12">
                    <div class="empty-users-state text-center">
                        <div class="empty-icon-wrap">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <h4 class="mt-4 mb-2">No Users Found</h4>
                        <p class="text-muted mb-4">
                            There are no registered users yet. Start by creating the first user.
                        </p>
                        <button
                            type="button"
                            class="add-user-btn"
                            onclick="prepareCreateForm()"
                            data-bs-toggle="modal"
                            data-bs-target="#userModal"
                        >
                            <i class="fa-solid fa-circle-plus me-2"></i>
                            Create First User
                        </button>
                    </div>
                </div>
            @endforelse
        </div>
    </div>
</div>

{{-- User Modal --}}
<div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content premium-modal">
            <div class="modal-header border-0 pb-0">
                <div>
                    <h5 class="modal-title fw-bold" id="userModalLabel">Manage User</h5>
                    <p class="text-muted small mb-0">Create or update user details</p>
                </div>
                <button type="button" class="btn-close-custom" data-bs-dismiss="modal" aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="modal-body pt-3">
                <form id="userForm" method="POST">
                    @csrf
                    <input type="hidden" id="formMethod" name="_method" value="POST">
                    <input type="hidden" id="userId" name="user_id">

                    <div class="premium-form-group mb-3">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" class="form-control premium-input" placeholder="Full Name" required>
                    </div>

                    <div class="premium-form-group mb-3">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" class="form-control premium-input" placeholder="Email" required>
                    </div>

                    <div class="premium-form-group mb-3">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" class="form-control premium-input" placeholder="Password">
                        <small class="text-muted">Leave blank to keep current password for updates.</small>
                    </div>

                    <div class="premium-switch-box mb-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-1 fw-bold">Paid Member</h6>
                                <p class="text-muted small mb-0">Enable if this user should have a paid membership type.</p>
                            </div>

                            <label class="switch">
                                <input id="is_paid" name="is_paid" type="checkbox" value="1">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>

                    <div class="d-flex gap-2 justify-content-between flex-wrap">
                        <button type="submit" class="submit-user-btn">
                            <span id="submitButtonText">Create User</span>
                        </button>

                        <button
                            type="button"
                            id="deleteButton"
                            class="delete-user-trigger"
                            style="display: none;"
                            onclick="confirmDelete()"
                        >
                            <i class="fa-solid fa-trash me-2"></i>
                            Delete User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

{{-- Delete Confirm Modal --}}
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content premium-modal danger-modal">
            <div class="modal-header border-0 pb-0">
                <div>
                    <h5 class="modal-title fw-bold" id="deleteModalTitle">Confirm Delete</h5>
                    <p class="text-muted small mb-0">This action cannot be undone</p>
                </div>
                <button type="button" class="btn-close-custom" data-bs-dismiss="modal" aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="modal-body pt-3">
                <div class="delete-warning-box mb-4">
                    <div class="delete-warning-icon">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <div>
                        <h6 class="fw-bold mb-1">Delete this user?</h6>
                        <p class="text-muted small mb-0">
                            Are you sure you want to delete this user? This action cannot be reversed.
                        </p>
                    </div>
                </div>

                <div class="d-flex justify-content-end gap-2">
                    <button type="button" class="cancel-btn" data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button type="button" class="confirm-delete-btn" onclick="deleteUser()">
                        <i class="fa-solid fa-trash me-2"></i>
                        Delete User
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .users-hero {
        background: linear-gradient(135deg, #ffffff 0%, #f8fbff 45%, #f5f7fb 100%);
        border: 1px solid #edf2f7;
        border-radius: 28px;
        padding: 32px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 18px 45px rgba(15, 23, 42, 0.05);
    }

    .users-hero::before {
        content: "";
        position: absolute;
        top: -70px;
        right: -70px;
        width: 220px;
        height: 220px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.10), transparent 70%);
        border-radius: 50%;
    }

    .users-badge {
        display: inline-flex;
        align-items: center;
        background: #eef2ff;
        color: #4338ca;
        padding: 8px 14px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 700;
    }

    .users-title {
        font-size: 34px;
        font-weight: 800;
        color: #0f172a;
        letter-spacing: -0.03em;
    }

    .users-subtitle {
        color: #64748b;
        max-width: 620px;
    }

    .users-hero-side {
        background: rgba(255,255,255,0.82);
        border: 1px solid #eef2f7;
        border-radius: 22px;
        padding: 20px;
        backdrop-filter: blur(8px);
    }

    .users-mini-stat {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .users-mini-stat span {
        color: #64748b;
        font-size: 14px;
    }

    .users-mini-stat strong {
        font-size: 28px;
        font-weight: 800;
        color: #0f172a;
    }

    .add-user-btn {
        border: none;
        background: linear-gradient(135deg, #111827, #1f2937);
        color: #fff;
        padding: 14px 20px;
        border-radius: 14px;
        font-weight: 700;
        transition: all 0.25s ease;
    }

    .add-user-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 28px rgba(17, 24, 39, 0.18);
    }

    .mini-stat-card {
        display: flex;
        align-items: center;
        gap: 14px;
        background: #fff;
        border: 1px solid #eef2f7;
        border-radius: 20px;
        padding: 18px;
        box-shadow: 0 10px 28px rgba(15, 23, 42, 0.04);
    }

    .mini-stat-card span {
        display: block;
        color: #64748b;
        font-size: 13px;
        margin-bottom: 2px;
    }

    .mini-stat-card strong {
        font-size: 24px;
        color: #0f172a;
        font-weight: 800;
    }

    .mini-stat-icon {
        width: 52px;
        height: 52px;
        border-radius: 16px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        flex-shrink: 0;
    }

    .mini-stat-icon.blue { background: linear-gradient(135deg, #2563eb, #1d4ed8); }
    .mini-stat-icon.green { background: linear-gradient(135deg, #16a34a, #15803d); }
    .mini-stat-icon.orange { background: linear-gradient(135deg, #f59e0b, #d97706); }

    .user-card {
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

    .user-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 24px 50px rgba(15, 23, 42, 0.10);
        border-color: #dbe4f0;
    }

    .user-card-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 22px;
    }

    .user-avatar {
        width: 58px;
        height: 58px;
        border-radius: 18px;
        background: linear-gradient(135deg, #2563eb, #4338ca);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        font-weight: 800;
        box-shadow: 0 14px 28px rgba(37, 99, 235, 0.22);
        flex-shrink: 0;
    }

    .status-badge {
        display: inline-flex;
        align-items: center;
        padding: 9px 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
    }

    .status-paid {
        background: #ecfdf3;
        color: #166534;
        border: 1px solid #bbf7d0;
    }

    .status-free {
        background: #eff6ff;
        color: #1d4ed8;
        border: 1px solid #bfdbfe;
    }

    .status-muted {
        background: #f8fafc;
        color: #475569;
        border: 1px solid #e2e8f0;
    }

    .user-name {
        font-size: 24px;
        font-weight: 800;
        color: #0f172a;
        margin-bottom: 6px;
    }

    .user-email {
        color: #64748b;
        margin-bottom: 18px;
        word-break: break-word;
    }

    .user-meta-list {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    .user-meta-item {
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

    .user-meta-item span {
        display: block;
        font-size: 12px;
        color: #94a3b8;
        margin-bottom: 2px;
    }

    .user-meta-item strong {
        color: #0f172a;
        font-size: 14px;
    }

    .user-card-footer {
        margin-top: 24px;
    }

    .manage-user-btn {
        background: linear-gradient(135deg, #111827, #1f2937);
        color: #fff;
        text-align: center;
        padding: 13px 16px;
        border-radius: 14px;
        font-weight: 700;
        transition: all 0.25s ease;
    }

    .user-card:hover .manage-user-btn {
        box-shadow: 0 12px 24px rgba(17, 24, 39, 0.16);
    }

    .empty-users-state {
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

    .danger-modal {
        border: 1px solid #fee2e2;
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

    .premium-switch-box {
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 18px;
        padding: 16px;
    }

    .submit-user-btn {
        border: none;
        background: linear-gradient(135deg, #2563eb, #4338ca);
        color: white;
        padding: 13px 20px;
        border-radius: 14px;
        font-weight: 700;
        transition: all 0.25s ease;
    }

    .submit-user-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 28px rgba(37, 99, 235, 0.20);
    }

    .delete-user-trigger {
        border: none;
        background: #fff1f2;
        color: #dc2626;
        padding: 13px 18px;
        border-radius: 14px;
        font-weight: 700;
        transition: all 0.25s ease;
    }

    .delete-user-trigger:hover {
        background: #ffe4e6;
    }

    .delete-warning-box {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        background: #fff7ed;
        border: 1px solid #fed7aa;
        border-radius: 18px;
        padding: 16px;
    }

    .delete-warning-icon {
        width: 46px;
        height: 46px;
        border-radius: 14px;
        background: #ffedd5;
        color: #ea580c;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .cancel-btn {
        border: none;
        background: #f8fafc;
        color: #0f172a;
        padding: 12px 18px;
        border-radius: 14px;
        font-weight: 700;
    }

    .confirm-delete-btn {
        border: none;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: #fff;
        padding: 12px 18px;
        border-radius: 14px;
        font-weight: 700;
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

    .switch {
        position: relative;
        display: inline-block;
        width: 54px;
        height: 30px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        inset: 0;
        cursor: pointer;
        background-color: #d1d5db;
        transition: .3s;
        border-radius: 999px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: 4px;
        top: 4px;
        background-color: white;
        transition: .3s;
        border-radius: 50%;
    }

    .switch input:checked + .slider {
        background: linear-gradient(135deg, #2563eb, #4338ca);
    }

    .switch input:checked + .slider:before {
        transform: translateX(24px);
    }

    @media (max-width: 768px) {
        .users-hero {
            padding: 24px;
        }

        .users-title {
            font-size: 28px;
        }

        .user-card {
            padding: 18px;
        }

        .user-card-top {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>

<script>
    function prepareCreateForm() {
        document.getElementById('userModalLabel').innerText = 'Create User';
        document.getElementById('formMethod').value = 'POST';
        document.getElementById('userForm').action = "{{ route('admin.users.store') }}";
        document.getElementById('userId').value = '';
        document.getElementById('submitButtonText').innerText = 'Create User';
        document.getElementById('deleteButton').style.display = 'none';

        document.getElementById('userForm').reset();
        document.getElementById('password').required = true;
    }

    function prepareEditForm(userId) {
        document.getElementById('userModalLabel').innerText = 'Edit User';
        document.getElementById('formMethod').value = 'PUT';
        document.getElementById('userForm').action = `/admin/users/${userId}`;
        document.getElementById('userId').value = userId;
        document.getElementById('submitButtonText').innerText = 'Update User';
        document.getElementById('deleteButton').style.display = 'inline-flex';

        fetch(`/admin/users/${userId}/edit`)
            .then(response => response.json())
            .then(data => {
                const user = data.user;

                document.getElementById('name').value = user.name;
                document.getElementById('email').value = user.email;
                document.getElementById('is_paid').checked = data.is_paid;
                document.getElementById('password').required = false;

                const modal = new bootstrap.Modal(document.getElementById('userModal'));
                modal.show();
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert('Failed to load user data');
            });
    }

    function confirmDelete() {
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        deleteModal.show();
    }

    function deleteUser() {
        const userId = document.getElementById('userId').value;

        fetch(`/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Failed to delete user');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting the user');
        });
    }
</script>
@endsection