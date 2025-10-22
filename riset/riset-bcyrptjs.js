import bcrypt from 'bcryptjs';

// Fungsi untuk mengenkripsi password
const enkripsiPassword = async (password) => {
  try {
    // Tentukan "salt rounds". Angka 10 adalah standar yang baik.
    const salt = await bcrypt.genSalt(14);

    // Lakukan hashing pada password
    const hash = await bcrypt.hash(password, salt);

    console.log('Password Asli:', password);
    console.log('Hasil Hash:', hash);
    return hash; // Kembalikan hash untuk digunakan nanti
  } catch (error) {
    console.error('Terjadi error saat hashing:', error);
  }
};

// Panggil fungsi dengan password contoh
enkripsiPassword('password123');
