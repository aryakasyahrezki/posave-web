<?php

namespace App\Mail;

use App\Models\Auth\CompanyProfile;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmployeeInvitation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $employee,
        public string $temporaryPassword,
        public ?CompanyProfile $companyProfile,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Undangan bergabung ke ' . ($this->companyProfile?->name ?? 'POSave'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.employee-invitation',
        );
    }
}
