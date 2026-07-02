<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #1a1a1a;">

    <h2 style="margin-bottom: 4px;">Halo, {{ $employee->name }}!</h2>
    <p style="color: #555; margin-top: 0;">
        Kamu telah diundang untuk bergabung ke
        <strong>{{ $companyProfile?->name ?? 'POSave' }}</strong>
        sebagai <strong>{{ $employee->role }}</strong>.
    </p>

    <p>Berikut informasi login kamu:</p>

    <div style="background: #f0f4ff; border: 1px solid #c7d7fd; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <p style="margin: 4px 0"><strong>Email:</strong> {{ $employee->email }}</p>
        <p style="margin: 4px 0"><strong>Password:</strong> {{ $temporaryPassword }}</p>
    </div>

    <p style="color: #555; font-size: 14px;">
        Silakan login dan ubah password kamu setelah masuk pertama kali.
    </p>

    <a href="{{ url('/login') }}"
       style="display: inline-block; background: #22303f; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 8px;">
        Login ke POSave
    </a>

    <p style="color: #aaa; font-size: 12px; margin-top: 32px;">
        Jika kamu tidak merasa diundang, abaikan email ini.
    </p>

</body>
</html>