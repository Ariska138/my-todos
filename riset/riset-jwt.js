// riset-jwt.js
import jwt from 'jsonwebtoken';

// Kunci simetris rahasia yang digunakan untuk algoritma HMAC-SHA256.
// Kerahasiaan kunci ini bersifat imperatif untuk keamanan sistem.
const SYMMETRIC_SECRET_KEY = 'a5d8b3c7e2f1a9g4h6j8k3l2m1n0o9p7q';

// Definsi payload yang berisi klaim-klaim mengenai subjek.
const payload = {
  sub: 'user-001', // Registered Claim: Subject Identifier
  username: 'budi_susanto', // Private Claim
  role: 'admin', // Private Claim
};

// --- PROSES PENANDATANGANAN (SIGNING) ---
console.log('Memulai proses penandatanganan...');
console.log('Payload:', payload);

// Fungsi sign() mengaplikasikan algoritma HS256 (default) pada payload
// dan header, menggunakan kunci rahasia untuk menghasilkan signature.
// Opsi `expiresIn` menetapkan klaim `exp`.
const token = jwt.sign(payload, SYMMETRIC_SECRET_KEY, { expiresIn: '1h' });

console.log('Hasil JWT (JWS Compact Serialization):', token, '\n');

// --- PROSES VERIFIKASI (VERIFICATION) ---
console.log('Memulai proses verifikasi...');
console.log('Menerima Token:', token);

try {
  // Fungsi verify() melakukan dekonstruksi token, meregenerasi signature
  // dari header dan payload menggunakan kunci rahasia yang sama,
  // dan membandingkannya dengan signature yang ada pada token.
  // Fungsi ini juga secara otomatis memvalidasi klaim `exp` dan `nbf`.
  const decodedPayload = jwt.verify(token, SYMMETRIC_SECRET_KEY);

  console.log('Verifikasi Berhasil. Integritas data terjamin. ✅');
  console.log('Payload yang Didekode:', decodedPayload);
} catch (error) {
  // Exception akan terjadi jika verifikasi signature gagal atau klaim
  // waktu (seperti `exp`) tidak valid.
  console.error('Verifikasi Gagal. Token tidak valid atau kedaluwarsa. ❌');
  console.error('Detail Error:', error.message);
}
